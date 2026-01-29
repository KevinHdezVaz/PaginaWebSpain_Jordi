import { useNavigate } from 'react-router-dom';

export default function About() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/contact');
    };

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
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg bg-white/10 backdrop-blur-md inline-block px-4 py-2 rounded text-white">
                        Sobre Gravel Empordà 360º
                    </h1>
                    <p className="text-xl md:text-3xl font-light drop-shadow-md">
                        Una pasión convertida en experiencias inolvidables
                    </p>
                </div>
            </section>

            {/* Introducción - Quiénes somos */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="inline-block px-4 py-1 rounded-full bg-earth-brown/10 text-earth-brown font-bold text-sm uppercase tracking-widest mb-6">
                            Nuestra Esencia
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-earth-dark mb-8 leading-tight">
                            Este apartado formará parte de nuestro <span className="text-earth-brown underline decoration-earth-beige decoration-8 underline-offset-4">pasado</span> y de nuestro <span className="text-earth-brown underline decoration-earth-beige decoration-8 underline-offset-4">futuro</span>.
                        </h2>
                        <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium italic border-l-4 border-earth-brown pl-6">
                            Gravel Empordà 360º no es solo una empresa de rutas; es la culminación de un sueño nacido de la necesidad de compartir el porqué hemos creado este proyecto.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Nuestra intención va más allá de mostrar paisajes; queremos dar a conocer la historia, el esfuerzo y la pasión que late en cada camino del Empordà. Cada ruta es un capítulo de un relato que nos conecta con nuestras raíces y nos proyecta hacia nuevas metas.
                        </p>
                    </div>

                    <div className="order-1 lg:order-2 relative group">
                        <div className="absolute -inset-4 bg-earth-beige/20 rounded-[3rem] blur-2xl group-hover:bg-earth-beige/40 transition-all duration-700" />
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-700 border-8 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1541625602330-2277a1cd43a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200"
                                alt="El origen de Gravel Empordà"
                                className="w-full aspect-[4/5] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección del Catálogo PDF */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-earth-beige/5 skew-x-12 transform translate-x-1/2" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="bg-earth-dark rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden shadow-2xl">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Catálogo de Experiencias <span className="text-earth-beige italic">Premium</span>
                            </h2>
                            <p className="text-earth-light/80 text-xl mb-10 max-w-xl">
                                Descubre nuestra selección exclusiva de rutas, gastronomía y cultura en formato digital. Todo lo que necesitas para tu próxima aventura.
                            </p>
                            <button
                                onClick={handleButtonClick}
                                className="w-full lg:w-auto text-center bg-gradient-to-r from-earth-brown to-earth-green hover:from-earth-dark hover:to-earth-brown text-white font-black text-lg py-5 px-10 rounded-2xl transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 duration-300 flex items-center justify-center gap-3 mt-auto"
                            >
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                Ver PDF
                            </button>
                        </div>
                        <div className="hidden md:block w-72 h-96 relative perspective-1000">
                            <div className="w-full h-full bg-white rounded-lg shadow-2xl transform rotate-y-12 border-4 border-earth-beige/20 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600"
                                    alt="Catálogo Preview"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-earth-dark/80 to-transparent flex items-end p-6">
                                    <span className="text-white font-black leading-none text-4xl">EXPERIENCIAS PREMIUN</span>
                                </div>
                            </div>
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
                    <p className="text-xl mb-10 text-black max-w-2xl mx-auto">
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