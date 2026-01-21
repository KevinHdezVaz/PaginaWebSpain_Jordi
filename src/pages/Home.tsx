import { Link } from "react-router-dom";

// Imagen real del Empordà: ciclistas en rutas gravel (fuente: biketours.com)
const heroImage = "https://cdn.biketours.com/assets/files/4268/catalonia_emporda_spain_gravel_bike_tour_to3.jpg.webp";

export default function Home() {
    const menuItems = [
        {
            path: "/routes",
            label: "Rutas",
            description: "Explora nuestras rutas",
            color: "from-earth-brown to-earth-green",
        },
        {
            path: "/packages",
            label: "Paquetes",
            description: "Experiencias completas",
            color: "from-earth-green to-green-600",
        },
        {
            path: "/blog",
            label: "Blog",
            description: "Historias y consejos",
            color: "from-earth-brown to-red-700",
        },
        {
            path: "/about",
            label: "Sobre Nosotros",
            description: "Nuestra historia",
            color: "from-green-600 to-earth-green",
        },
        {
            path: "/contact",
            label: "Contacto",
            description: "Hablemos",
            color: "from-earth-green to-earth-brown",
        },
        {
            path: "/configurator",
            label: "Configuración",
            description: "Personaliza tu viaje",
            color: "from-red-700 to-earth-brown",
        },
    ];

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
                        Rutas cicloturistas únicas combinando deporte, cultura y gastronomía
                        en el corazón del Empordà
                    </p>

                    <div className="space-x-6">
                        <Link
                            to="/routes"
                            className="inline-block bg-earth-brown hover:bg-earth-green text-white font-bold py-4 px-10 rounded-lg text-xl transition-all transform hover:scale-105 shadow-xl"
                        >
                            Explorar Rutas
                        </Link>

                        <Link
                            to="/packages"
                            className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-4 px-10 rounded-lg text-xl border-2 border-white transition-all"
                        >
                            Ver Paquetes
                        </Link>
                    </div>
                </div>

                {/* Flecha hacia abajo para scroll */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </section>

            {/* Sección de introducción rápida */}
            <section className="py-20 bg-gradient-to-b from-earth-light to-white">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Texto de introducción */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-earth-dark mb-8">
                            Vive el Empordà sobre dos ruedas
                        </h2>
                        <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                            Te ofrecemos paquetes completos de cicloturismo gravel: rutas
                            cuidadosamente diseñadas, alojamiento con encanto, gastronomía
                            local excepcional y experiencias culturales auténticas. Todo
                            organizado para que solo tengas que disfrutar pedaleando.
                        </p>
                    </div>

                    {/* Menú creativo de navegación */}
                    <div className="mt-20">
                        <h3 className="text-3xl font-black text-earth-dark text-center mb-12">
                            ¿Qué quieres descubrir?
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {menuItems.map((item, index) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border-2 border-earth-beige hover:border-earth-brown"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Gradiente de fondo en hover */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                                    />

                                    {/* Contenido de la card - Ajustado para móvil */}
                                    <div className="relative p-6 md:p-8 flex flex-col items-center text-center">
                                        {/* Icono más pequeño en móvil */}


                                        {/* Título más pequeño en móvil */}
                                        <h4 className="text-xl md:text-2xl font-black text-earth-dark mb-2 group-hover:text-earth-brown transition-colors">
                                            {item.label}
                                        </h4>

                                        {/* Descripción más compacta en móvil */}
                                        <p className="text-xs md:text-sm text-gray-600 font-medium mb-4 px-4">
                                            {item.description}
                                        </p>

                                        {/* Flecha */}
                                        <div className="flex items-center gap-2 text-earth-brown font-bold group-hover:gap-4 transition-all text-sm md:text-base">
                                            <span>Explorar</span>
                                            <svg
                                                className="w-5 h-5 transform group-hover:translate-x-2 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2.5}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Borde animado en hover */}
                                    <div className="absolute inset-0 border-4 border-transparent group-hover:border-earth-green rounded-2xl transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-100" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Llamada final */}
            <section className="py-16 bg-earth-brown text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">
                        ¿Listo para tu próxima aventura?
                    </h3>

                    <Link
                        to="/contact"
                        className="inline-block bg-white text-earth-brown hover:bg-earth-beige font-bold py-4 px-12 rounded-lg text-xl transition-all shadow-lg"
                    >
                        Reserva tu experiencia
                    </Link>
                </div>
            </section>

            {/* CSS para animaciones */}
            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </>
    );
}