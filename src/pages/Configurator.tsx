export default function Configurator() {
    return (
        <div className="min-h-screen bg-earth-light">
            {/* Hero con fondo sutil */}
            <section
                className="relative h-96 md:h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-earth-dark/70" />
                <div className="relative z-10 text-white px-6 max-w-5xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 drop-shadow-2xl">
                        Configurador de Paquetes
                    </h1>
                    <p className="text-2xl md:text-4xl font-light drop-shadow-lg">
                        Personaliza tu experiencia gravel a la medida
                    </p>
                </div>
            </section>

            {/* Teaser principal */}
            <section className="py-20 bg-earth-beige/20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-20 max-w-4xl mx-auto">
                        <div className="w-32 h-32 bg-earth-brown/20 rounded-full mx-auto mb-10 flex items-center justify-center">
                            <svg className="w-20 h-20 text-earth-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-earth-dark mb-8">
                            ¡Próximamente disponible!
                        </h2>

                        <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed">
                            Estamos trabajando en una herramienta revolucionaria para que diseñes tu aventura perfecta:
                            elige el paquete base y luego añade opciones a tu gusto.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            <div className="bg-earth-beige/40 rounded-2xl p-8">
                                <div className="w-16 h-16 bg-earth-brown rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-earth-dark mb-3">Más días</h3>
                                <p className="text-gray-700">Extiende tu estancia añadiendo noches extra</p>
                            </div>

                            <div className="bg-earth-beige/40 rounded-2xl p-8">
                                <div className="w-16 h-16 bg-earth-green rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-earth-dark mb-3">Experiencias post-ruta</h3>
                                <p className="text-gray-700">Catamarán, bodegas premium, masajes, cocina local...</p>
                            </div>

                            <div className="bg-earth-beige/40 rounded-2xl p-8">
                                <div className="w-16 h-16 bg-earth-brown rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-earth-dark mb-3">Hoteles y restaurantes premium</h3>
                                <p className="text-gray-700">Mejora tu alojamiento o cena en sitios exclusivos</p>
                            </div>
                        </div>

                        <p className="text-xl text-gray-700 mb-10">
                            El precio se actualizará automáticamente y recibirás un albarán personalizado con todo detallado.
                        </p>

                        <div className="bg-earth-brown/10 border-2 border-dashed border-earth-brown rounded-2xl p-12">
                            <p className="text-3xl font-bold text-earth-brown">
                                Lanzamiento previsto: 2027
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Llamada a acción alternativa */}
            <section className="py-20 bg-earth-brown text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">
                        Mientras tanto, reserva tu paquete clásico
                    </h2>
                    <p className="text-xl mb-10">
                        Nuestros paquetes de 3, 5 y 7 días ya incluyen lo esencial para una experiencia inolvidable.
                    </p>
                    <a
                        href="/packages"
                        className="inline-block bg-white text-earth-brown hover:bg-earth-beige font-bold py-5 px-12 rounded-lg text-xl transition-all shadow-2xl"
                    >
                        Ver paquetes disponibles
                    </a>
                </div>
            </section>
        </div>
    );
}