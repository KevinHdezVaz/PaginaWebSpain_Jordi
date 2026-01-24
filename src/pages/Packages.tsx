import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PackageCard from "../components/sections/PackageCard";

// ¡Reemplaza con tus claves reales!
const stripePromise = loadStripe("pk_test_tu_clave_publica_stripe_aquí");
const PAYPAL_CLIENT_ID = "tu_client_id_paypal_sandbox_o_live_aquí";

type Package = {
    id: number;
    name: string;
    days: number;
    nights: number;
    price: string;
    image: string | null;
    description: string | null;
    highlights: string[];
    pdf?: string | null;
    isPopular?: boolean;
};

const SUPPLEMENTS = {
    bikeRental: 300,
    helmet: 20,
    pedals: 15,
};

function CheckoutForm({ pkg, onClose }: { pkg: Package; onClose: () => void }) {
    const stripe = useStripe();
    const elements = useElements();

    const [people, setPeople] = useState(4);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [bikeRental, setBikeRental] = useState(false);
    const [bikeSize, setBikeSize] = useState("");
    const [helmet, setHelmet] = useState(false);
    const [pedals, setPedals] = useState(false);
    const [experienceLevel, setExperienceLevel] = useState("");
    const [healthConditions, setHealthConditions] = useState("");
    const [allergies, setAllergies] = useState("");
    const [formError, setFormError] = useState<string | null>(null);
    const [paymentLoading, setPaymentLoading] = useState(false);

    // Estados para el flujo de pago
    const [showMethodModal, setShowMethodModal] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<"stripe" | "paypal" | null>(null);

    const calculateTotal = () => {
        const base = parseFloat(pkg.price.replace(/[^0-9.]/g, "")) || 0;
        let total = base * people;
        if (bikeRental) total += SUPPLEMENTS.bikeRental * people;
        if (helmet) total += SUPPLEMENTS.helmet * people;
        if (pedals) total += SUPPLEMENTS.pedals * people;
        return total;
    };

    const totalPrice = calculateTotal();
    const deposit = totalPrice * 0.2;

    const validateForm = () => {
        if (people < 2) return false;
        if (!startDate || !endDate) return false;
        if (bikeRental && !bikeSize) return false;
        if (!experienceLevel) return false;
        return true;
    };

    const isFormValid = validateForm();

    const handleProceedToPay = () => {
        if (!validateForm()) {
            setFormError("Por favor, completa todos los campos obligatorios marcados con *");
            return;
        }
        setFormError(null);
        setShowMethodModal(true);
    };

    // ── Stripe Payment ────────────────────────────────────────────────
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

    // ── PayPal Approval ───────────────────────────────────────────────
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
                    bike_rental: bikeRental,
                    bike_size: bikeSize,
                    helmet,
                    pedals,
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
                bike_rental: bikeRental,
                bike_size: bikeSize,
                helmet,
                pedals,
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
            {/* Modal principal de configuración de reserva */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-earth-brown/20 animate-fade-in relative">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-earth-dark mb-2">
                            Configura tu reserva
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
                                Descargar Detalles (PDF)
                            </a>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-4xl text-white-500 hover:text-earth-white transition-colors leading-none"
                    >
                        ×
                    </button>
                </div>

                <p className="text-gray-700 mb-8 text-center text-lg">
                    Personaliza <span className="font-bold text-earth-green">{pkg.name}</span> y ve el precio al instante
                </p>

                {formError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl mb-6 text-center">
                        {formError}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Lado izquierdo: Opciones y formulario */}
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

                        {/* Fechas */}
                        <div className="grid grid-cols-2 gap-4">
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

                        {/* Suplementos */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-3 font-bold text-earth-dark cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={bikeRental}
                                    onChange={(e) => setBikeRental(e.target.checked)}
                                    className="w-5 h-5 text-earth-green rounded"
                                />
                                Alquiler bicicleta (+{SUPPLEMENTS.bikeRental}€/pers)
                            </label>

                            {bikeRental && (
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

                            <label className="flex items-center gap-3 font-bold text-earth-dark cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={helmet}
                                    onChange={(e) => setHelmet(e.target.checked)}
                                    className="w-5 h-5 text-earth-green rounded"
                                />
                                Casco (+{SUPPLEMENTS.helmet}€/pers)
                            </label>

                            <label className="flex items-center gap-3 font-bold text-earth-dark cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={pedals}
                                    onChange={(e) => setPedals(e.target.checked)}
                                    className="w-5 h-5 text-earth-green rounded"
                                />
                                Pedales (+{SUPPLEMENTS.pedals}€/pers)
                            </label>
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
                    </div>

                    {/* Lado derecho: Resumen + Botón pagar */}
                    <div className="space-y-6">
                        <div className="bg-earth-light/50 rounded-2xl p-6 border-2 border-earth-brown/10">
                            <h4 className="text-xl font-black text-earth-dark mb-4">Resumen de cotización</h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span>Paquete ({people} pers.)</span>
                                    <span className="font-bold">{totalPrice.toFixed(2)} €</span>
                                </div>
                                {bikeRental && (
                                    <div className="flex justify-between text-earth-green">
                                        Alquiler bicis: +{(SUPPLEMENTS.bikeRental * people).toFixed(2)} €
                                    </div>
                                )}
                                {helmet && (
                                    <div className="flex justify-between text-earth-green">
                                        Cascos: +{(SUPPLEMENTS.helmet * people).toFixed(2)} €
                                    </div>
                                )}
                                {pedals && (
                                    <div className="flex justify-between text-earth-green">
                                        Pedales: +{(SUPPLEMENTS.pedals * people).toFixed(2)} €
                                    </div>
                                )}
                                <div className="border-t border-earth-brown/20 pt-3 mt-3">
                                    <div className="flex justify-between text-xl font-black text-earth-dark">
                                        <span>Total</span>
                                        <span>{totalPrice.toFixed(2)} €</span>
                                    </div>
                                    <div className="mt-4 p-4 bg-earth-green/10 rounded-xl text-center">
                                        <p className="text-lg font-bold text-earth-green">
                                            Pago Depósito (20%): {deposit.toFixed(2)} €
                                        </p>
                                        <p className="text-xs text-earth-green/80">
                                            El resto se paga 30 días antes del viaje
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={!isFormValid || paymentLoading}
                            onClick={handleProceedToPay}
                            className="w-full bg-gradient-to-r from-earth-brown to-earth-green hover:from-earth-dark hover:to-earth-brown disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-xl py-4 rounded-xl shadow-xl transition-all transform hover:scale-[1.02]"
                        >
                            {paymentLoading ? "Procesando..." : `Pagar Depósito: ${deposit.toFixed(2)} €`}
                        </button>

                        {!isFormValid && (
                            <p className="text-red-500 text-center text-sm font-bold">
                                * Completa los campos obligatorios para continuar
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Modal Selección de Método de Pago ──────────────────────────────── */}
            {showMethodModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 backdrop-blur-md px-4 transition-all duration-500">
                    <div className="bg-white rounded-[2.5rem] p-10 md:p-14 max-w-2xl w-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={() => setShowMethodModal(false)}
                            className="absolute top-6 right-8 text-4xl text-gray-400 hover:text-earth-dark transition-all hover:rotate-90"
                        >
                            ×
                        </button>

                        <div className="text-center mb-12">
                            <h3 className="text-3xl md:text-4xl font-black text-earth-dark mb-4 tracking-tight">
                                ¿Cómo quieres pagar el depósito?
                            </h3>
                            <p className="text-gray-500 text-lg max-w-md mx-auto">
                                Selecciona tu método de pago preferido para confirmar tu reserva de forma segura
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <button
                                onClick={() => {
                                    setSelectedMethod("stripe");
                                    setShowMethodModal(false);
                                }}
                                className="group flex flex-col items-center text-center p-8 border-2 border-earth-brown/10 rounded-3xl hover:border-earth-green hover:bg-earth-green/5 transition-all duration-300 shadow-sm hover:shadow-xl transform hover:-translate-y-2"
                            >
                                <div className="w-20 h-20 mb-6 rounded-2xl bg-earth-brown/5 flex items-center justify-center group-hover:bg-earth-green/20 transition-colors duration-300">
                                    <svg className="w-12 h-12 text-earth-brown group-hover:text-earth-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <span className="font-black text-2xl text-earth-dark mb-2">Tarjeta</span>
                                <span className="text-sm text-white-500 leading-relaxed">
                                    Pago seguro con crédito o débito</span>
                            </button>

                            <button
                                onClick={() => {
                                    setSelectedMethod("paypal");
                                    setShowMethodModal(false);
                                }}
                                className="group flex flex-col items-center text-center p-8 border-2 border-earth-brown/10 rounded-3xl hover:border-earth-green hover:bg-earth-green/5 transition-all duration-300 shadow-sm hover:shadow-xl transform hover:-translate-y-2"
                            >
                                <div className="w-20 h-20 mb-6 rounded-2xl bg-earth-brown/5 flex items-center justify-center group-hover:bg-earth-green/20 transition-colors duration-300">
                                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.067 8.178c-.652-3.132-2.903-4.212-5.717-4.212H8.354A1.05 1.05 0 0 0 7.3 5.016L4.544 22.14c-.066.425.263.804.693.804H9.79l.564-3.535l.08-.501h3.351c3.553 0 6.345-1.444 7.159-5.594c.333-1.693.184-3.2-.877-5.136zm-2.83 5.25c-.538 2.756-2.583 2.756-4.665 2.756H10.19l.794-4.96h2.382c2.146 0 2.972.103 3.394 1.1c.264.63.153 1.104.477-1.104z" stroke="currentColor" strokeWidth="0.5" className="text-earth-brown group-hover:text-blue-600 transition-colors" />
                                    </svg>
                                </div>
                                <span className="font-black text-2xl text-earth-dark mb-2">PayPal</span>
                                <span className="text-sm text-white-500 leading-relaxed">
                                    Accede a tu cuenta de <span className="font-bold text-[#003087]">PayPal</span> para pagar de forma rápida y segura
                                </span>
                            </button>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-400 text-sm font-medium">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Conexión Segura Encriptada de 256 bits
                        </div>
                    </div>
                </div>
            )}

            {/* ── Modal Stripe (tarjeta) ──────────────────────────────────────── */}
            {selectedMethod === "stripe" && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
                        <h3 className="text-2xl font-bold text-earth-dark mb-6 text-center">
                            Pago con Tarjeta
                        </h3>
                        <div className="p-5 border-2 border-earth-brown/20 rounded-xl bg-gray-50 mb-6">
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
                            className="w-full bg-earth-green hover:bg-earth-dark text-white font-black py-4 rounded-xl transition-all disabled:opacity-50"
                        >
                            {paymentLoading ? "Procesando..." : `Pagar ${deposit.toFixed(2)} € ahora`}
                        </button>

                        <button
                            onClick={() => setSelectedMethod(null)}
                            className="mt-4 text-white-600 underline w-full text-center block"
                        >
                            Volver a métodos de pago
                        </button>

                        {formError && <p className="mt-4 text-red-600 text-center">{formError}</p>}
                    </div>
                </div>
            )}

            {/* ── Modal PayPal ────────────────────────────────────────────────── */}
            {selectedMethod === "paypal" && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
                        <h3 className="text-2xl font-bold text-earth-dark mb-6 text-center">
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
                                            intent: "CAPTURE",  // Obligatorio para que TypeScript no se queje
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: deposit.toFixed(2),
                                                        currency_code: "EUR",
                                                    },
                                                    description: `Depósito reserva ${pkg.name} - ${people} personas`,
                                                    // Opcional pero útil: referencia interna
                                                    reference_id: `reserva-${pkg.id}-${Date.now()}`,
                                                },
                                            ],
                                            // Opcional: application_context para mejor UX
                                            application_context: {
                                                shipping_preference: "NO_SHIPPING", // ya que es un servicio, no producto físico
                                                brand_name: "Tu Empresa Gravel Tours",
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

                        <button
                            onClick={() => setSelectedMethod(null)}
                            className="mt-6 text-white-600 underline w-full text-center block"
                        >
                            Volver a métodos de pago
                        </button>

                        {formError && <p className="mt-4 text-red-600 text-center">{formError}</p>}
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
                    backgroundImage:
                        "url('https://cdn.biketours.com/assets/files/4268/catalonia_emporda_spain_gravel_bike_tour_to3.jpg.webp')",
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