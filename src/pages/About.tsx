export default function About() {
    return (
        <div className="min-h-screen bg-earth-light">
            {/* Hero con imagen de fondo - equipo o paisaje emotivo */}
            <section
                className="relative h-96 md:h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-earth-dark/60" />
                <div className="relative z-10 text-white px-6 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                        Sobre Gravel Empordà 360º
                    </h1>
                    <p className="text-xl md:text-3xl font-light drop-shadow-md">
                        Una pasión convertida en experiencias inolvidables
                    </p>
                </div>
            </section>

            {/* Introducción - Quiénes somos */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-earth-dark mb-8">
                            Nuestra historia
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Gravel Empordà 360º nace de la pasión por el ciclismo gravel y el amor profundo por esta tierra mágica: el Empordà.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Somos un equipo de ciclistas locales, guías apasionados y amantes de la buena mesa que decidimos compartir lo mejor de nuestra región: rutas secretas por caminos rurales, pueblos medievales con encanto, gastronomía auténtica y alojamientos seleccionados con cariño.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Creemos que las mejores vacaciones son aquellas que combinan deporte, descubrimiento cultural y placer gastronómico, siempre en grupos reducidos y con atención personalizada.
                        </p>
                    </div>

                    <div className="rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1530549388143-43cec8e9f64f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
                            alt="Equipo Gravel Empordà"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Filosofía / Valores */}
            <section className="py-20 bg-earth-beige/30">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-earth-dark mb-12">
                        Nuestra filosofía
                    </h2>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="bg-white p-10 rounded-2xl shadow-xl">
                            <div className="w-20 h-20 bg-earth-brown rounded-full mx-auto mb-6 flex items-center justify-center">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-earth-dark mb-4">Autenticidad</h3>
                            <p className="text-gray-700">
                                Rutas diseñadas por locales, lejos de las multitudes. Solo los mejores caminos y experiencias genuinas.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-2xl shadow-xl">
                            <div className="w-20 h-20 bg-earth-green rounded-full mx-auto mb-6 flex items-center justify-center">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-earth-dark mb-4">Pasión</h3>
                            <p className="text-gray-700">
                                Pedaleamos porque amamos hacerlo. Esa energía se transmite en cada ruta y cada detalle.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-2xl shadow-xl">
                            <div className="w-20 h-20 bg-earth-brown rounded-full mx-auto mb-6 flex items-center justify-center">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-earth-dark mb-4">Atención personal</h3>
                            <p className="text-gray-700">
                                Grupos reducidos (máx. 10 personas), guías dedicados y todo organizado para que solo disfrutes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Llamada a acción final */}
            <section className="py-20 bg-earth-brown text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">
                        ¿Te unes a la próxima aventura?
                    </h2>
                    <p className="text-xl mb-10 max-w-2xl mx-auto">
                        Ven a descubrir el Empordà de una forma única, auténtica y llena de vida.
                    </p>
                    <div className="space-x-6">
                        <a
                            href="/packages"
                            className="inline-block bg-white text-earth-brown hover:bg-earth-beige font-bold py-4 px-10 rounded-lg text-xl transition-all shadow-xl"
                        >
                            Ver paquetes disponibles
                        </a>
                        <a
                            href="/contact"
                            className="inline-block bg-transparent border-2 border-white hover:bg-white/20 font-bold py-4 px-10 rounded-lg text-xl transition-all"
                        >
                            Contactar con nosotros
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}