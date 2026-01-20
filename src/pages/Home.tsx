// Imagen real del Empordà: ciclistas en rutas gravel (fuente: biketours.com)
const heroImage = "https://cdn.biketours.com/assets/files/4268/catalonia_emporda_spain_gravel_bike_tour_to3.jpg.webp";

export default function Home() {
    return (
        <>
            {/* Hero principal */}
            <section
                className="relative h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                {/* Overlay oscuro para que el texto se lea bien */}
                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-10 text-white px-6 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg bg-white/10 backdrop-blur-md inline-block px-4 py-2 rounded text-white">
                        Gravel Empordà 360º
                    </h1>
                    <p className="text-xl md:text-3xl mb-10 font-light drop-shadow-md">
                        Rutas cicloturistas únicas combinando deporte, cultura y gastronomía en el corazón del Empordà
                    </p>
                    <div className="space-x-6">
                        <a
                            href="/routes"
                            className="inline-block bg-earth-brown hover:bg-earth-green text-white font-bold py-4 px-10 rounded-lg text-xl transition-all transform hover:scale-105 shadow-xl"
                        >
                            Explorar Rutas
                        </a>
                        <a
                            href="/packages"
                            className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-4 px-10 rounded-lg text-xl border-2 border-white transition-all"
                        >
                            Ver Paquetes
                        </a>
                    </div>
                </div>

                {/* Flecha hacia abajo para scroll */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Sección de introducción rápida */}
            <section className="py-20 bg-earth-light">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-earth-dark mb-8">
                        Vive el Empordà sobre dos ruedas
                    </h2>
                    <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                        Te ofrecemos paquetes completos de cicloturismo gravel: rutas cuidadosamente diseñadas,
                        alojamiento con encanto, gastronomía local excepcional y experiencias culturales auténticas.
                        Todo organizado para que solo tengas que disfrutar pedaleando.
                    </p>
                </div>
            </section>

            {/* Llamada final */}
            <section className="py-16 bg-earth-brown text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">
                        ¿Listo para tu próxima aventura?
                    </h3>
                    <a
                        href="/contact"
                        className="inline-block bg-white text-earth-brown hover:bg-earth-beige font-bold py-4 px-12 rounded-lg text-xl transition-all shadow-lg"
                    >
                        Reserva tu experiencia
                    </a>
                </div>
            </section>
        </>
    );
}