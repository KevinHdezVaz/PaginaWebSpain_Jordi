import ContactForm from "../components/forms/ContactForm";

export default function Contact() {
    return (
        <div className="min-h-screen bg-earth-light py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-earth-dark mb-6">
                        Contacto & Reservas
                    </h1>
                    <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                        ¿Listo para tu aventura gravel en el Empordà? Escribe tu consulta y Jordi te responderá personalmente en menos de 24h.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Formulario */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-10 md:p-12">
                        <ContactForm />
                    </div>

                    {/* Datos de contacto alternativos */}
                    <div className="space-y-8">
                        <div className="bg-earth-beige/30 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-earth-dark mb-6">
                                También puedes contactar por:
                            </h3>
                            <ul className="space-y-6">
                                <li className="flex items-center">
                                    <svg className="w-8 h-8 text-earth-brown mr-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold">Teléfono / WhatsApp</p>
                                        <a href="tel:+34600123456" className="text-earth-brown hover:text-earth-green text-lg">
                                            +34 600 123 456
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-8 h-8 text-earth-brown mr-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold">Email</p>
                                        <a href="mailto:info@gravelemporda360.com" className="text-earth-brown hover:text-earth-green text-lg">
                                            info@gravelemporda360.com
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-8 h-8 text-earth-brown mr-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold">Ubicación</p>
                                        <p className="text-gray-700">Baix Empordà<br />Girona, Catalunya</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-earth-brown text-white rounded-2xl p-8 text-center">
                            <p className="text-lg font-semibold mb-4">
                                Mínimo 4 personas · Máximo 10
                            </p>
                            <p>Grupos privados y fechas flexibles todo el año</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}   