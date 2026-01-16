import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        people: 4,
        package: "",
        dates: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch("https://spainweb.picklebracket.pro/api/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Error al enviar la reserva");
            }

            setSuccess(true);
            setFormData({
                name: "",
                email: "",
                phone: "",
                people: 4,
                package: "",
                dates: "",
                message: "",
            });
        } catch (err: any) {
            setError(err.message || "Error al enviar. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-earth-light py-16">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-earth-dark mb-6">
                        Reserva tu Experiencia Gravel
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Cuéntanos qué tienes en mente y Jordi te responderá personalmente en menos de 24h con todos los detalles.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16">
                    {success && (
                        <div className="mb-8 p-6 bg-green-100 border border-green-300 rounded-2xl text-center">
                            <p className="text-2xl font-bold text-green-800 mb-2">¡Reserva enviada con éxito!</p>
                            <p className="text-lg text-green-700">Jordi te contactará en breve para confirmar todos los detalles.</p>
                        </div>
                    )}

                    {error && (
                        <div className="mb-8 p-6 bg-red-100 border border-red-300 rounded-2xl text-center">
                            <p className="text-lg text-red-700">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <label className="block text-earth-dark font-bold mb-3 text-lg">Nombre completo *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-6 py-4 rounded-xl border-2 border-earth-beige focus:border-earth-brown focus:outline-none text-lg"
                                    placeholder="Tu nombre"
                                />
                            </div>

                            <div>
                                <label className="block text-earth-dark font-bold mb-3 text-lg">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-6 py-4 rounded-xl border-2 border-earth-beige focus:border-earth-brown focus:outline-none text-lg"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-earth-dark font-bold mb-3 text-lg">Teléfono *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-6 py-4 rounded-xl border-2 border-earth-beige focus:border-earth-brown focus:outline-none text-lg"
                                    placeholder="+34 600 000 000"
                                />
                            </div>

                            <div>
                                <label className="block text-earth-dark font-bold mb-3 text-lg">Número de personas *</label>
                                <select
                                    name="people"
                                    value={formData.people}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-6 py-4 rounded-xl border-2 border-earth-beige focus:border-earth-brown focus:outline-none text-lg"
                                >
                                    {[4, 5, 6, 7, 8, 9, 10].map((num) => (
                                        <option key={num} value={num}>
                                            {num} personas
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-earth-dark font-bold mb-3 text-lg">Paquete de interés</label>
                                <select
                                    name="package"
                                    value={formData.package}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 rounded-xl border-2 border-earth-beige focus:border-earth-brown focus:outline-none text-lg"
                                >
                                    <option value="">Cualquiera / Personalizado</option>
                                    <option value="Fin de semana gravel">Fin de semana gravel (3 días)</option>
                                    <option value="Experiencia Empordà">Experiencia Empordà (5 días)</option>
                                    <option value="Inmersión total">Inmersión total (7 días)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-earth-dark font-bold mb-3 text-lg">Fechas aproximadas</label>
                                <input
                                    type="text"
                                    name="dates"
                                    value={formData.dates}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 rounded-xl border-2 border-earth-beige focus:border-earth-brown focus:outline-none text-lg"
                                    placeholder="Ej: Junio 2026, o fechas flexibles"
                                />
                            </div>
                        </div>

                        <div className="mb-10">
                            <label className="block text-earth-dark font-bold mb-3 text-lg">Mensaje adicional</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={6}
                                className="w-full px-6 py-4 rounded-xl border-2 border-earth-beige focus:border-earth-brown focus:outline-none text-lg resize-none"
                                placeholder="Cuéntanos más: preferencias de alojamiento, nivel de ciclismo, intereses gastronómicos, si venís en familia..."
                            ></textarea>
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-earth-brown hover:bg-earth-green text-white font-bold py-5 px-16 rounded-2xl text-2xl transition-all shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Enviando..." : "Enviar Reserva"}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="text-center mt-16">
                    <p className="text-lg text-gray-600">
                        También puedes contactar directamente:
                    </p>
                    <p className="text-2xl font-bold text-earth-brown mt-4">
                        +34 600 123 456 • info@gravelemporda360.com
                    </p>
                </div>
            </div>
        </div>
    );
}