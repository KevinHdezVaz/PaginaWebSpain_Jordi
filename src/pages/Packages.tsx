import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PackageCard from "../components/sections/PackageCard";

// Claves (¡cámbialas por las reales!)
const stripePromise = loadStripe("pk_test_tu_clave_publica_stripe_aquí");
const PAYPAL_CLIENT_ID = "tu_client_id_paypal_sandbox_o_live_aquí";

type Package = {
    id: number;
    name: string;
    days: number;
    nights: number;
    base_price: number;
    extra_day_price?: number;
    image: string | null;
    description: string | null;
    highlights: string[];
    pdf?: string | null;
    bike_basic_pdf?: string | null;
    bike_premium_pdf?: string | null;
    helmet_pdf?: string | null;
    isPopular?: boolean | number | string;
    is_popular?: boolean | number | string;
};

const SUPPLEMENTS = {
    bikeBasic: 250,
    bikePremium: 450,
    helmet: 20,
};

function CheckoutForm({ pkg, onClose }: { pkg: Package; onClose: () => void }) {
    const stripe = useStripe();
    const elements = useElements();

    const [people, setPeople] = useState(4);
    const [extraNights, setExtraNights] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [bikeRental, setBikeRental] = useState<"none" | "basic" | "premium">("none");
    const [bikeSize, setBikeSize] = useState("");
    const [helmet, setHelmet] = useState(false);
    const [helmetSize, setHelmetSize] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("");
    const [healthConditions, setHealthConditions] = useState("");
    const [allergies, setAllergies] = useState("");
    const [formError, setFormError] = useState<string | null>(null);
    const [paymentLoading, setPaymentLoading] = useState(false);

    const [showMethodModal, setShowMethodModal] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<"stripe" | "paypal" | null>(null);

    const calculateTotal = () => {
        const base = pkg.base_price || 0;
        const extraDay = pkg.extra_day_price || 0;

        let total = base * people;
        total += extraDay * extraNights * people;

        if (bikeRental === "basic") total += SUPPLEMENTS.bikeBasic * people;
        if (bikeRental === "premium") total += SUPPLEMENTS.bikePremium * people;
        if (helmet) total += SUPPLEMENTS.helmet * people;

        return total;
    };

    const totalPrice = calculateTotal();
    const deposit = totalPrice * 0.2;

    const validateForm = () => {
        if (people < 2) return false;
        if (!startDate || !endDate) return false;
        if (bikeRental !== "none" && !bikeSize) return false;
        if (helmet && !helmetSize) return false;
        if (!experienceLevel) return false;
        return true;
    };

    const isFormValid = validateForm();

    const handleProceedToPay = () => {
        if (!isFormValid) {
            setFormError("Por favor, completa todos los campos obligatorios marcados con *");
            return;
        }
        setFormError(null);
        setShowMethodModal(true);
    };

    // Stripe Payment
    const handleStripePayment = async () => {
        if (!stripe || !elements) {
            setFormError("Stripe no está cargado correctamente");
            return;
        }
        setPaymentLoading(true);
        try {
            const res = await fetch("/api/reservations/create-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: Math.round(deposit * 100),
                    currency: "eur",
                    metadata: { packageId: pkg.id, people, method: "stripe" },
                }),
            });
            if (!res.ok) throw new Error("No se pudo crear el PaymentIntent");
            const { clientSecret } = await res.json();

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                    billing_details: { name: "Cliente Reserva" },
                },
            });

            if (error) {
                setFormError(error.message || "Error al procesar el pago con tarjeta");
            } else if (paymentIntent?.status === "succeeded") {
                await saveReservation("partial", deposit, "stripe");
                alert("¡Pago del depósito exitoso con tarjeta! Te enviaremos confirmación y contrato.");
                onClose();
            }
        } catch (err: any) {
            setFormError("Error al procesar el pago: " + (err.message || "Intenta nuevamente"));
        } finally {
            setPaymentLoading(false);
        }
    };

    // PayPal Approval
    const handlePayPalApprove = async (data: any) => {
        try {
            const res = await fetch("/api/reservations/capture-paypal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderID: data.orderID,
                    packageId: pkg.id,
                    people,
                    amount: deposit,
                    start_date: startDate,
                    end_date: endDate,
                    extra_nights: extraNights,
                    bike_rental: bikeRental,
                    bike_size: bikeSize,
                    helmet,
                    helmet_size: helmetSize,
                    experience_level: experienceLevel,
                    health_conditions: healthConditions,
                    allergies,
                }),
            });
            const result = await res.json();
            if (result.success) {
                await saveReservation("partial", deposit, "paypal");
                alert("¡Pago del depósito exitoso con PayPal! Te enviaremos confirmación y contrato.");
                onClose();
            } else {
                setFormError(result.error || "No se pudo capturar el pago PayPal");
            }
        } catch (err: any) {
            setFormError("Error en PayPal: " + err.message);
        }
    };

    const saveReservation = async (status: string, amount: number, method: string) => {
        await fetch("/api/reservations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                package_id: pkg.id,
                people,
                start_date: startDate,
                end_date: endDate,
                extra_nights: extraNights,
                bike_rental: bikeRental,
                bike_size: bikeSize,
                helmet,
                helmet_size: helmetSize,
                experience_level: experienceLevel,
                health_conditions: healthConditions,
                allergies,
                payment_amount: amount,
                payment_status: status,
                payment_method: method,
            }),
        });
    };

    return (
        <>
            {/* Modal principal de configuración */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-earth-brown/20 animate-fade-in relative">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-earth-dark mb-2">
                            Configura tu paquete
                        </h3>
                        {pkg.pdf && (
                            <a
                                href={pkg.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#8B6F47] text-white hover:bg-[#4A3F35] px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg mt-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Descargar Detalles del Paquete (PDF)
                            </a>
                        )}
                    </div>
                    <button onClick={onClose} className="text-4xl text-white hover:text-gray-700">
                        ×
                    </button>
                </div>

                <div className="mb-8">
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-left max-w-4xl mx-auto">
                        {pkg.highlights
                            .flatMap((item) =>
                                item
                                    .replace(/\\r\\n/g, '\n')
                                    .replace(/\\r/g, '\n')
                                    .split('\n')
                                    .map((line) => line.trim())
                                    .filter((line) => line !== "")
                            )
                            .map((line, index) => (
                                <li key={index} className="flex items-center text-gray-700 bg-earth-beige/20 px-3 py-2 rounded-lg">
                                    <svg className="w-4 h-4 text-earth-green mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium">{line}</span>
                                </li>
                            ))}
                    </ul>
                </div>

                {formError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl mb-6 text-center">
                        {formError}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Lado izquierdo: Opciones */}
                    <div className="space-y-6">
                        {/* Número de personas */}
                        <div>
                            <label className="block font-bold text-earth-dark mb-2">
                                Número de personas (Mín. 2) <span className="text-red-600">*</span>
                            </label>
                            <select
                                value={people}
                                onChange={(e) => setPeople(Number(e.target.value))}
                                className="w-full px-4 py-3 rounded-xl border-2 border-earth-brown/20 focus:border-earth-green"
                            >
                                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                    <option key={n} value={n}>
                                        {n} personas
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Días extra */}
                        <div>
                            <label className="block font-bold text-earth-dark mb-2">
                                Días adicionales (opcional)
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={extraNights === 0 ? "" : extraNights}
                                onChange={(e) => setExtraNights(e.target.value === "" ? 0 : Number(e.target.value))}
                                className="w-full px-4 py-3 rounded-xl border-2 border-earth-brown/20 focus:border-earth-green"
                                placeholder="0"
                            />
                            {pkg.extra_day_price && (
                                <small className="text-gray-600 block mt-1">
                                    +{Number(pkg.extra_day_price).toFixed(2)} € / persona / día
                                </small>
                            )}
                        </div>

                        {/* Fechas */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-bold text-earth-dark mb-2">
                                    Fecha inicio <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    min={new Date().toISOString().split("T")[0]}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-earth-brown/20 focus:border-earth-green"
                                />
                            </div>
                            <div>
                                <label className="block font-bold text-earth-dark mb-2">
                                    Fecha fin <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate || new Date().toISOString().split("T")[0]}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-earth-brown/20 focus:border-earth-green"
                                />
                            </div>
                        </div>

                        {/* Alquiler de bicicleta */}
                        <div className="space-y-3">
                            <label className="block font-bold text-earth-dark mb-2">Alquiler de bicicleta</label>
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            checked={bikeRental === "none"}
                                            onChange={() => setBikeRental("none")}
                                            className="w-5 h-5 text-earth-green"
                                        />
                                        <span>Sin alquiler</span>
                                    </div>
                                </label>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            checked={bikeRental === "basic"}
                                            onChange={() => setBikeRental("basic")}
                                            className="w-5 h-5 text-earth-green"
                                        />
                                        <span>Básica (+{SUPPLEMENTS.bikeBasic} €/pers.)</span>
                                    </div>
                                    {pkg.bike_basic_pdf && (
                                        <a href={pkg.bike_basic_pdf} target="_blank" className="text-earth-green hover:underline text-sm">
                                            Ver info
                                        </a>
                                    )}
                                </label>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            checked={bikeRental === "premium"}
                                            onChange={() => setBikeRental("premium")}
                                            className="w-5 h-5 text-earth-green"
                                        />
                                        <span>Alta gama (+{SUPPLEMENTS.bikePremium} €/pers.)</span>
                                    </div>
                                    {pkg.bike_premium_pdf && (
                                        <a href={pkg.bike_premium_pdf} target="_blank" className="text-earth-green hover:underline text-sm">
                                            Ver info
                                        </a>
                                    )}
                                </label>
                            </div>
                            {bikeRental !== "none" && (
                                <select
                                    value={bikeSize}
                                    onChange={(e) => setBikeSize(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-earth-brown/20 focus:border-earth-green"
                                >
                                    <option value="">Selecciona talla *</option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                            )}
                        </div>

                        {/* Casco */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 font-bold text-earth-dark cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={helmet}
                                    onChange={(e) => setHelmet(e.target.checked)}
                                    className="w-5 h-5 text-earth-green rounded"
                                />
                                Casco (+{SUPPLEMENTS.helmet} €/pers.)
                            </label>
                            {helmet && (
                                <div className="flex items-center justify-between">
                                    <select
                                        value={helmetSize}
                                        onChange={(e) => setHelmetSize(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-earth-brown/20 focus:border-earth-green"
                                    >
                                        <option value="">Talla del casco *</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                                    {pkg.helmet_pdf && (
                                        <a href={pkg.helmet_pdf} target="_blank" className="text-earth-green hover:underline text-sm ml-3">
                                            Ver info
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Nivel y comentarios */}
                        <div className="pt-4 border-t border-earth-brown/10">
                            <label className="block font-bold text-earth-dark mb-2">
                                Nivel de experiencia gravel <span className="text-red-600">*</span>
                            </label>
                            <select
                                value={experienceLevel}
                                onChange={(e) => setExperienceLevel(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-earth-brown/20 focus:border-earth-green mb-4"
                            >
                                <option value="">Seleccionar... *</option>
                                <option value="principiante">Principiante</option>
                                <option value="intermedio">Intermedio</option>
                                <option value="avanzado">Avanzado</option>
                            </select>
                            <textarea
                                value={healthConditions}
                                onChange={(e) => setHealthConditions(e.target.value)}
                                placeholder="Condiciones de salud, alergias, comentarios adicionales..."
                                className="w-full px-4 py-3 rounded-xl border-2 border-earth-brown/20 focus:border-earth-green h-20"
                            />
                        </div>

                        {/* Política de Cancelación y Garantías */}
                        <div className="pt-6 border-t border-earth-brown/10">
                            <h4 className="flex items-center gap-2 font-bold text-earth-dark mb-4 text-lg">
                                <svg className="w-5 h-5 text-earth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Política de Cancelación y Garantías
                            </h4>

                            <div className="bg-earth-beige/20 rounded-xl p-5 text-sm space-y-4">
                                <div>
                                    <p className="font-bold text-earth-dark mb-1 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-earth-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Contrato Digital Seguro
                                    </p>
                                    <p className="text-gray-600 pl-6 leading-relaxed">
                                        Al confirmar, generaremos un contrato de viaje que firmaremos digitalmente para tu seguridad y respaldo legal.
                                    </p>
                                </div>

                                <div className="space-y-2 pl-2 border-l-2 border-earth-green/30 ml-1">
                                    <p className="font-bold text-earth-dark text-xs uppercase tracking-wide mb-2 pl-3">
                                        Condiciones de Reembolso
                                    </p>
                                    <div className="flex justify-between items-center pl-3">
                                        <span className="text-gray-700">+30 días antelación</span>
                                        <span className="font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded text-xs">100% Reembolso*</span>
                                    </div>
                                    <div className="flex justify-between items-center pl-3">
                                        <span className="text-gray-700">15 - 30 días</span>
                                        <span className="font-bold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded text-xs">50% Reembolso</span>
                                    </div>
                                    <div className="flex justify-between items-center pl-3">
                                        <span className="text-gray-700 opacity-75 text-xs">-15 días</span>
                                        <span className="font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded text-xs">Sin reembolso</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 pl-3 mt-1 italic">
                                        * Menos gastos de gestión
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lado derecho: Resumen - MODO COTIZADOR LLAMATIVO */}
                    <div className="space-y-6 sticky top-6 lg:top-10 z-20 
                lg:scale-[1.04] lg:-mr-4 transition-transform duration-300">

                        {/* Tarjeta del cotizador - muy llamativa */}
                        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 
                  text-white rounded-3xl p-8 shadow-2xl ring-4 ring-emerald-400/40 ring-offset-2 ring-offset-white/10
                  relative overflow-hidden animate-pulse-slow">

                            {/* Efecto de brillo que se mueve */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent 
                    -translate-x-full animate-shine pointer-events-none"></div>

                            {/* Badge superior flotante */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">

                            </div>

                            <div className="relative pt-6">
                                <h4 className="text-3xl md:text-4xl text-earth-brown text-center mb-6 drop-shadow-lg">
                                    Cotización
                                </h4>

                                <div className="space-y-4 text-base md:text-lg">
                                    <div className="flex justify-between items-center font-semibold">
                                        <span>Paquete base ({people} personas)</span>
                                        <span className="font-black">{(pkg.base_price * people).toFixed(2)} €</span>
                                    </div>

                                    {extraNights > 0 && (
                                        <div className="flex justify-between text-cyan-100">
                                            <span>Noches extra ({extraNights} × {people})</span>
                                            <span className="font-bold">+{(pkg.extra_day_price || 0) * extraNights * people} €</span>
                                        </div>
                                    )}

                                    {bikeRental === "basic" && (
                                        <div className="flex justify-between text-cyan-100">
                                            <span>Alquiler bici básica</span>
                                            <span className="font-bold">+{SUPPLEMENTS.bikeBasic * people} €</span>
                                        </div>
                                    )}

                                    {bikeRental === "premium" && (
                                        <div className="flex justify-between text-cyan-100">
                                            <span>Alquiler bici premium</span>
                                            <span className="font-bold">+{SUPPLEMENTS.bikePremium * people} €</span>
                                        </div>
                                    )}

                                    {helmet && (
                                        <div className="flex justify-between text-cyan-100">
                                            <span>Cascos</span>
                                            <span className="font-bold">+{SUPPLEMENTS.helmet * people} €</span>
                                        </div>
                                    )}

                                    <div className="border-t-2 border-white/30 pt-5 mt-5">
                                        <div className="flex justify-between items-baseline text-3xl md:text-4xl font-black">
                                            <span className="text-white">TOTAL</span>
                                            <span className="text-yellow-300">{totalPrice.toFixed(2)} €</span>
                                        </div>

                                        <div className="mt-6 p-6 bg-black/30 backdrop-blur-sm rounded-2xl text-center border border-white/20 shadow-inner">
                                            <p className="text-2xl md:text-3xl  text-yellow-300 mb-2">
                                                Depósito ahora (20%): {deposit.toFixed(2)} €
                                            </p>
                                            <p className="text-base text-white/90">
                                                Resto a pagar 30 días antes del viaje
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botón ORIGINAL tal como lo tenías */}
                        <button
                            disabled={!isFormValid || paymentLoading}
                            onClick={handleProceedToPay}
                            className="w-full bg-gradient-to-r from-earth-brown to-earth-green hover:from-earth-dark hover:to-earth-brown disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-xl py-4 rounded-xl shadow-xl transition-all transform hover:scale-[1.02]"
                        >
                            {paymentLoading ? "Procesando..." : `Pagar Depósito: ${deposit.toFixed(2)} €`}
                        </button>

                        {/* Mensaje de error ORIGINAL tal como lo tenías */}
                        {!isFormValid && (
                            <p className="text-red-500 text-center text-sm font-bold">
                                * Completa los campos obligatorios para continuar
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de selección de método de pago */}
            {showMethodModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 backdrop-blur-md px-4 transition-all duration-500">
                    <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 sm:p-10 md:p-14 max-w-2xl w-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={() => setShowMethodModal(false)}
                            className="absolute top-4 right-4 sm:top-6 sm:right-8 w-11 h-11 flex items-center justify-center bg-[#8B6F47] text-white rounded-xl text-2xl hover:bg-[#4A3F35] transition-all shadow-lg hover:rotate-90 z-10"
                        >
                            ×
                        </button>
                        <div className="text-center mb-6 sm:mb-12 pt-4 sm:pt-0">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-earth-dark mb-3 tracking-tight px-2">
                                ¿Cómo quieres pagar?
                            </h3>
                            <p className="text-gray-500 text-sm sm:text-lg max-w-md mx-auto px-4">
                                Selecciona tu método de pago para confirmar
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                            <button
                                onClick={() => {
                                    setSelectedMethod("stripe");
                                    setShowMethodModal(false);
                                }}
                                className="group flex flex-col items-center text-center p-3 sm:p-8 border-2 border-earth-brown/10 rounded-2xl sm:rounded-3xl hover:border-earth-green hover:bg-earth-green/5 transition-all duration-300 shadow-sm hover:shadow-xl sm:transform hover:-translate-y-2"
                            >
                                <div className="w-10 h-10 sm:w-20 sm:h-20 mb-2 sm:mb-6 rounded-xl bg-earth-brown/5 flex items-center justify-center group-hover:bg-earth-green/20 transition-colors duration-300">
                                    <svg className="w-6 h-6 sm:w-12 sm:h-12 text-earth-brown group-hover:text-earth-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <span className="font-black text-lg sm:text-2xl text-earth-dark mb-1">Tarjeta</span>
                                <span className="text-[10px] sm:text-sm text-gray-500 leading-relaxed">
                                    Seguro con crédito/débito
                                </span>
                            </button>

                            <button
                                onClick={() => {
                                    setSelectedMethod("paypal");
                                    setShowMethodModal(false);
                                }}
                                className="group flex flex-col items-center text-center p-3 sm:p-8 border-2 border-earth-brown/10 rounded-2xl sm:rounded-3xl hover:border-earth-green hover:bg-earth-green/5 transition-all duration-300 shadow-sm hover:shadow-xl sm:transform hover:-translate-y-2"
                            >
                                <div className="w-10 h-10 sm:w-20 sm:h-20 mb-2 sm:mb-6 rounded-xl bg-earth-brown/5 flex items-center justify-center group-hover:bg-earth-green/20 transition-colors duration-300">
                                    <svg className="w-6 h-6 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.067 8.178c-.652-3.132-2.903-4.212-5.717-4.212H8.354A1.05 1.05 0 0 0 7.3 5.016L4.544 22.14c-.066.425.263.804.693.804H9.79l.564-3.535l.08-.501h3.351c3.553 0 6.345-1.444 7.159-5.594c.333-1.693.184-3.2-.877-5.136zm-2.83 5.25c-.538 2.756-2.583 2.756-4.665 2.756H10.19l.794-4.96h2.382c2.146 0 2.972.103 3.394 1.1c.264.63.153 1.104.477-1.104z" />
                                    </svg>
                                </div>
                                <span className="font-black text-lg sm:text-2xl text-earth-dark mb-1">PayPal</span>
                                <span className="text-[10px] sm:text-sm text-gray-500 leading-relaxed px-1">
                                    Paga con tu cuenta
                                </span>
                            </button>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-400 text-[10px] sm:text-sm font-medium">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Pago Seguro Encriptado
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Stripe */}
            {selectedMethod === "stripe" && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4">
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
                        <button
                            onClick={() => setSelectedMethod(null)}
                            className="absolute top-3 right-3 sm:top-4 sm:right-5 w-10 h-10 flex items-center justify-center bg-[#8B6F47] text-white rounded-xl text-2xl hover:bg-[#4A3F35] transition-all shadow-lg"
                        >
                            ×
                        </button>
                        <h3 className="text-xl sm:text-2xl font-bold text-earth-dark mb-6 text-center">
                            Pago con Tarjeta
                        </h3>
                        <div className="p-4 sm:p-5 border-2 border-earth-brown/20 rounded-xl bg-gray-50 mb-6">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: "16px",
                                            color: "#333",
                                            "::placeholder": { color: "#aab7c4" },
                                        },
                                    },
                                }}
                            />
                        </div>
                        <button
                            onClick={handleStripePayment}
                            disabled={paymentLoading}
                            className="w-full bg-earth-green hover:bg-earth-dark text-white font-black py-4 rounded-xl transition-all disabled:opacity-50 text-lg"
                        >
                            {paymentLoading ? "Procesando..." : `Pagar ${deposit.toFixed(2)} € ahora`}
                        </button>
                        {formError && <p className="mt-4 text-red-600 text-center text-sm">{formError}</p>}
                    </div>
                </div>
            )}

            {/* Modal PayPal */}
            {selectedMethod === "paypal" && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4">
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
                        <button
                            onClick={() => setSelectedMethod(null)}
                            className="absolute top-3 right-3 sm:top-4 sm:right-5 w-10 h-10 flex items-center justify-center bg-[#8B6F47] text-white rounded-xl text-2xl hover:bg-[#4A3F35] transition-all shadow-lg"
                        >
                            ×
                        </button>
                        <h3 className="text-xl sm:text-2xl font-bold text-earth-dark mb-6 text-center">
                            Pago con PayPal
                        </h3>
                        <div className="min-h-[200px] flex items-center justify-center">
                            <PayPalScriptProvider
                                options={{
                                    clientId: PAYPAL_CLIENT_ID,
                                    currency: "EUR",
                                    intent: "capture",
                                }}
                            >
                                <PayPalButtons
                                    style={{
                                        layout: "vertical",
                                        color: "gold",
                                        shape: "rect",
                                        label: "paypal",
                                        height: 48,
                                    }}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            intent: "CAPTURE",
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: deposit.toFixed(2),
                                                        currency_code: "EUR",
                                                    },
                                                    description: `Depósito reserva ${pkg.name} - ${people} personas`,
                                                },
                                            ],
                                            application_context: {
                                                shipping_preference: "NO_SHIPPING",
                                                brand_name: "Gravel Empordà Tours",
                                                locale: "es_ES",
                                            },
                                        });
                                    }}
                                    onApprove={handlePayPalApprove}
                                    onError={(err) => {
                                        console.error("PayPal Error:", err);
                                        setFormError("Hubo un error con PayPal. Por favor intenta de nuevo.");
                                    }}
                                />
                            </PayPalScriptProvider>
                        </div>
                        {formError && <p className="mt-4 text-red-600 text-center text-sm">{formError}</p>}
                    </div>
                </div>
            )}
        </>
    );
}

export default function Packages() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch("https://spainweb.picklebracket.pro/api/packages");
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                setPackages(data);
            } catch (err: any) {
                setError(err.message || "Error al cargar los paquetes");
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    const handleSelectPackage = (pkg: Package) => {
        setSelectedPackage(pkg);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPackage(null);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando paquetes...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">{error}</div>;

    return (
        <div className="min-h-screen bg-earth-light">
            {/* Hero */}
            <div
                className="relative bg-cover bg-center text-white py-32 md:py-48"
                style={{
                    backgroundImage: "url('https://cdn.biketours.com/assets/files/4268/catalonia_emporda_spain_gravel_bike_tour_to3.jpg.webp')",
                }}
            >
                <div className="absolute inset-0 bg-earth-dark/75"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-lg bg-white/10 backdrop-blur-md inline-block px-4 py-2 rounded text-white">
                        Experiencias Gravel Premium
                    </h1>
                    <p className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto font-light">
                        Paquetes todo incluido para grupos de 2 a 10 personas en el Empordà
                    </p>
                </div>
            </div>

            {/* Paquetes */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <h2 className="text-4xl md:text-5xl font-black text-center text-earth-dark mb-16">
                    Nuestros Paquetes Gravel
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            onClick={() => handleSelectPackage(pkg)}
                            className="transition-transform hover:scale-[1.02] cursor-pointer"
                        >
                            <PackageCard pkg={pkg} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal de Reserva */}
            {showModal && selectedPackage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm pkg={selectedPackage} onClose={handleCloseModal} />
                    </Elements>
                </div>
            )}
        </div>
    );
}