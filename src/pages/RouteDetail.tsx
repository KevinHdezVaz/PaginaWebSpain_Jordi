import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type Route = {
    id: number;
    name: string;
    image: string | null;
    distance: string | null;
    elevation: string | null;
    duration: string | null;
    difficulty: "Fácil" | "Media" | "Difícil";
    description: string | null;
};

export default function RouteDetail() {
    const { id } = useParams<{ id: string }>();
    const [route, setRoute] = useState<Route | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'description' | 'highlights' | 'tips'>('description');
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const response = await fetch("https://spainweb.picklebracket.pro/api/routes");
                if (!response.ok) {
                    throw new Error("Error al cargar la ruta");
                }
                const data = await response.json();
                const routesData = Array.isArray(data) ? data : data.data;
                if (!routesData) {
                    throw new Error("Formato de datos incorrecto");
                }
                const foundRoute = routesData.find((r: any) => r.id === parseInt(id!));
                if (!foundRoute) {
                    setError("Ruta no encontrada");
                    setLoading(false);
                    return;
                }
                setRoute(foundRoute);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("No se pudo cargar la información de la ruta");
                setLoading(false);
            }
        };
        fetchRoute();
    }, [id]);

    const difficultyConfig = route ? {
        Fácil: {
            bg: "bg-earth-green",
            text: "text-[rgb(139,111,71)]",
            icon: "🟢",
            description: "Apta para principiantes"
        },
        Media: {
            bg: "bg-earth-brown",
            text: "text-[rgb(139,111,71)]",
            icon: "🟡",
            description: "Requiere experiencia moderada"
        },
        Difícil: {
            bg: "bg-red-700",
            text: "text-white",
            icon: "🔴",
            description: "Solo para ciclistas experimentados"
        }
    }[route.difficulty] : { bg: "", text: "", icon: "", description: "" };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-earth-beige via-earth-light to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="relative inline-block">
                        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-earth-brown mx-auto mb-6"></div>
                        <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-4 border-earth-brown opacity-20"></div>
                    </div>
                    <p className="text-2xl font-bold text-earth-dark animate-pulse">Cargando aventura...</p>
                    <p className="text-sm text-gray-600 mt-2">Preparando los detalles de tu ruta</p>
                </div>
            </div>
        );
    }

    if (error || !route) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-earth-beige via-earth-light to-white flex items-center justify-center p-6">
                <div className="text-center bg-white p-10 rounded-2xl shadow-2xl max-w-md">
                    <div className="text-7xl mb-6">😞</div>
                    <h2 className="text-3xl font-black text-earth-dark mb-3">¡Vaya!</h2>
                    <p className="text-xl text-gray-600 mb-2">{error || "Ruta no encontrada"}</p>
                    <p className="text-sm text-gray-500 mb-8">Esta ruta no está disponible en este momento</p>
                    <Link
                        to="/routes"
                        className="inline-block bg-earth-brown text-white px-8 py-4 rounded-xl font-bold transition-all hover:bg-earth-green hover:shadow-xl transform hover:-translate-y-1"
                    >
                        ← Explorar Todas las Rutas
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-earth-beige via-earth-light to-white">
            {/* Hero Section */}
            <div className="relative h-[65vh] min-h-[550px] overflow-hidden">
                <div className={`absolute inset-0 transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <img
                        src={route.image || "/placeholder.jpg"}
                        alt={route.name}
                        className="w-full h-full object-cover"
                        onLoad={() => setImageLoaded(true)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-earth-dark/70 via-earth-dark/50 to-earth-dark/30"></div>
                </div>
                {/* Breadcrumb */}
                <div className="absolute top-6 left-6 z-20">
                    <Link
                        to="/routes"
                        className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-earth-dark px-5 py-3 rounded-full hover:bg-earth-beige transition-all shadow-lg font-semibold"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        Volver
                    </Link>
                </div>
                {/* Hero Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
                    <div className="max-w-5xl">
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                            <span className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-xl font-black shadow-2xl ${difficultyConfig.bg} ${difficultyConfig.text}`}>
                                <span className="text-3xl">{difficultyConfig.icon}</span>
                                {route.difficulty}
                            </span>
                            <span className="px-6 py-3 bg-white/90 backdrop-blur-sm text-earth-dark rounded-full font-bold shadow-lg">
                                {difficultyConfig.description}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 drop-shadow-2xl leading-tight">
                            {route.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto">
                            Una experiencia única en gravel por el corazón del Empordà
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content - SIN borde exterior en el card grande */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Tabs */}
                    <div className="bg-gradient-to-r from-earth-beige/50 to-earth-light/50">
                        <div className="flex flex-wrap justify-center gap-4 p-6">
                            {[
                                { id: 'description', label: 'Descripción', icon: '📋' },
                                { id: 'highlights', label: 'Highlights', icon: '⭐' },
                                { id: 'tips', label: 'Consejos', icon: '💡' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-4 px-10 py-6 rounded-2xl font-bold text-lg transition-all duration-300 border ${activeTab === tab.id
                                        ? 'bg-earth-brown text-white border-earth-brown/60 shadow-xl scale-105'
                                        : 'bg-white text-black border-earth-beige/30 hover:bg-earth-beige hover:shadow-lg'
                                        }`}
                                >
                                    <span className="text-3xl">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 md:p-16">
                        <div className="grid lg:grid-cols-3 gap-12 xl:gap-20">
                            {/* Main Content (2/3) */}
                            <div className="lg:col-span-2 space-y-16">
                                {/* Descripción */}
                                {activeTab === 'description' && (
                                    <div className="animate-fade-in space-y-12">
                                        <div>
                                            <h2 className="text-4xl font-black text-earth-dark mb-8 flex items-center gap-4">
                                                <span className="text-5xl">📖</span> Sobre esta ruta
                                            </h2>
                                            <div className="bg-earth-beige/20 rounded-3xl p-10 border border-earth-beige/30">
                                                <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">
                                                    {route.description || "Esta ruta ofrece una experiencia inmersiva en el corazón del Empordà, combinando caminos de gravel con paisajes naturales impresionantes. Diseñada por expertos en cicloturismo, garantiza un equilibrio perfecto entre desafío físico y disfrute escénico."}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="bg-earth-green/10 rounded-2xl p-8 border border-earth-green/20">
                                                <h3 className="text-2xl font-black text-earth-dark mb-4 flex items-center gap-3">
                                                    <span className="text-4xl">🎯</span> Nivel recomendado
                                                </h3>
                                                <p className="text-gray-700">
                                                    Diseñada para ciclistas con nivel {route.difficulty.toLowerCase()}.
                                                    {route.difficulty === 'Fácil' && ' Perfecta para iniciarse en el gravel.'}
                                                    {route.difficulty === 'Media' && ' Requiere cierta experiencia previa.'}
                                                    {route.difficulty === 'Difícil' && ' Solo para ciclistas experimentados.'}
                                                </p>
                                            </div>
                                            <div className="bg-earth-brown/10 rounded-2xl p-8 border border-earth-brown/20">
                                                <h3 className="text-2xl font-black text-earth-dark mb-4 flex items-center gap-3">
                                                    <span className="text-4xl">🌍</span> Zona geográfica
                                                </h3>
                                                <p className="text-gray-700">
                                                    Región del Empordà, Catalunya. Superficie mixta con predominio de caminos de tierra y gravel seleccionados.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Highlights */}
                                {activeTab === 'highlights' && (
                                    <div className="animate-fade-in space-y-10">
                                        <h2 className="text-4xl font-black text-earth-dark mb-8 flex items-center gap-4">
                                            <span className="text-5xl">✨</span> Puntos destacados
                                        </h2>
                                        {[
                                            { icon: "🏔️", title: "Vistas Panorámicas del Empordà", desc: "Paisajes espectaculares que combinan campos ondulantes, viñedos centenarios y vistas a la costa mediterránea." },
                                            { icon: "🛤️", title: "Caminos Auténticos de Gravel", desc: "Rutas cuidadosamente seleccionadas que priorizan la seguridad sin sacrificar la aventura." },
                                            { icon: "🏰", title: "Patrimonio Medieval y Cultural", desc: "Paradas estratégicas en pueblos históricos con arquitectura medieval preservada." },
                                            { icon: "🍷", title: "Gastronomía y Enoturismo", desc: "Oportunidades para degustar productos locales y visitar bodegas familiares." }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-6 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-earth-beige/30">
                                                <span className="text-6xl flex-shrink-0">{item.icon}</span>
                                                <div>
                                                    <h3 className="text-2xl font-black text-earth-dark mb-3">{item.title}</h3>
                                                    <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Consejos */}
                                {activeTab === 'tips' && (
                                    <div className="animate-fade-in space-y-10">
                                        <h2 className="text-4xl font-black text-earth-dark mb-8 flex items-center gap-4">
                                            <span className="text-5xl">💡</span> Consejos prácticos
                                        </h2>
                                        {[
                                            { icon: "✅", title: "Equipamiento Esencial", content: "Lleva suficiente agua (mínimo 2 litros), herramientas básicas, casco, gafas y protección solar.", bg: "bg-earth-green/10", border: "border-earth-green/30" },
                                            { icon: "⚠️", title: "Planificación y Clima", content: "Consulta el pronóstico 24h antes. Mejores épocas: primavera y otoño. Evita horas centrales en verano.", bg: "bg-yellow-50", border: "border-yellow-400/40" },
                                            { icon: "📱", title: "Navegación", content: "Descarga el track GPX antes. Lleva batería externa. Algunas zonas tienen cobertura limitada.", bg: "bg-blue-50", border: "border-blue-400/40" },
                                            { icon: "🌱", title: "Sostenibilidad", content: "Respeta el entorno, no dejes residuos, cierra portones y sé respetuoso con otros usuarios.", bg: "bg-earth-green/10", border: "border-earth-green/30" }
                                        ].map((tip, i) => (
                                            <div key={i} className={`rounded-2xl p-8 ${tip.bg} shadow-lg border ${tip.border}`}>
                                                <div className="flex items-start gap-5">
                                                    <span className="text-5xl flex-shrink-0">{tip.icon}</span>
                                                    <div>
                                                        <h3 className="text-2xl font-black text-earth-dark mb-3">{tip.title}</h3>
                                                        <p className="text-gray-800 leading-relaxed">{tip.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Sidebar (1/3) - Bordes más suaves */}
                            <div className="space-y-10">
                                {/* Pack de descarga */}
                                <div className="bg-gradient-to-br from-earth-brown to-earth-green rounded-3xl p-10 text-[rgb(139,111,71)] shadow-2xl border border-earth-brown/20">
                                    <div className="text-center mb-8">
                                        <div className="text-7xl mb-4">📦</div>
                                        <h3 className="text-3xl font-black mb-2">Pack Completo</h3>
                                        <p className="opacity-90">Todo lo necesario para tu ruta</p>
                                    </div>
                                    <ul className="space-y-4 mb-10">
                                        {["Track GPX verificado", "Guía PDF con altimetría", "Puntos de interés", "Recomendaciones gastronómicas", "Sugerencias de alojamiento"].map((item, i) => (
                                            <li key={i} className="flex items-center gap-4">
                                                <span className="text-2xl">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="w-full bg-brown text-earth-brown font-black py-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-lg">
                                        Descargar Todo
                                    </button>
                                    <p className="text-center text-sm mt-4 opacity-80">
                                        Compatible con Garmin, Wahoo y Strava
                                    </p>
                                </div>

                                {/* Info rápida */}
                                <div className="bg-earth-beige/30 rounded-3xl p-8 border border-earth-beige/40">
                                    <h4 className="text-2xl font-black text-earth-dark mb-6 flex items-center gap-3">
                                        <span className="text-3xl">ℹ️</span> Información rápida
                                    </h4>
                                    <div className="space-y-5">
                                        {[
                                            { icon: "🚵", label: "Tipo", value: "Gravel / MTB" },
                                            { icon: "📍", label: "Región", value: "Empordà, Catalunya" },
                                            { icon: "🛤️", label: "Superficie", value: "70% tierra / 30% asfalto" },
                                            { icon: "🌤️", label: "Época ideal", value: "Primavera - Otoño" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-earth-beige/30">
                                                <span className="flex items-center gap-3 font-semibold text-gray-700">
                                                    <span className="text-2xl">{item.icon}</span>
                                                    {item.label}
                                                </span>
                                                <span className="font-black text-earth-dark">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de Descargas Técnicas */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-earth-brown/10">
                    <h3 className="text-3xl font-black text-earth-dark mb-8 flex items-center gap-4">
                        <svg className="w-8 h-8 text-earth-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Documentación Técnica
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Guía PDF */}
                        <div className="flex items-center justify-between p-6 bg-earth-beige/20 rounded-2xl border border-earth-brown/10 hover:border-earth-brown/30 transition-all cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-earth-dark group-hover:text-earth-brown transition-colors">Guía Detallada (PDF)</p>
                                    <p className="text-sm text-gray-500">Incluye track, puntos de interés y recomendaciones.</p>
                                </div>
                            </div>
                            <span className="text-earth-brown font-black">Descargar</span>
                        </div>

                        {/* Tracks GPS */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between p-6 bg-orange-50 rounded-2xl border border-orange-200 hover:border-orange-400 transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <p className="font-bold text-earth-dark">Track Strava / Wikiloc</p>
                                </div>
                                <span className="text-orange-600 font-black">Ver Track</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center text-gray-600 italic">
                    * Recuerda que nuestras rutas son cuidadosamente diseñadas para ofrecer la mejor experiencia Gravel en el Empordà.
                </div>
            </div>

            <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
      `}</style>
        </div>
    );
}