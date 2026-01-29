import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type GalleryItem = {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string | null;
};

type Highlight = {
    icon: string;
    title: string;
    desc: string;
};

type Tip = {
    icon: string;
    title: string;
    content: string;
    bg?: string;
    border?: string;
};

type QuickInfo = {
    icon: string;
    label: string;
    value: string;
};

type Route = {
    id: number;
    name: string;
    image: string | null;
    distance: string | null;
    elevation: string | null;
    duration: string | null;
    difficulty: "Fácil" | "Media" | "Difícil";
    description: string | null;
    tagline?: string | null;
    highlights?: Highlight[];
    tips?: Tip[];
    quick_info?: QuickInfo[];
    download_pack_features?: string[];
    gallery?: GalleryItem[];
};

export default function RouteDetail() {
    const { id } = useParams<{ id: string }>();
    const [route, setRoute] = useState<Route | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'description' | 'highlights' | 'tips' | 'gallery'>('description');
    const [imageLoaded, setImageLoaded] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
    const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const response = await fetch(`https://spainweb.picklebracket.pro/api/routes/${id}`);
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const routeData = await response.json();
                if (!routeData || !routeData.id) {
                    throw new Error("Ruta no encontrada o sin ID");
                }
                setRoute(routeData);
                setLoading(false);
            } catch (err) {
                console.error("Error completo:", err);
                setError("No se pudo cargar la información de la ruta");
                setLoading(false);
            }
        };

        if (id) {
            fetchRoute();
        } else {
            console.error("No hay ID en la URL");
        }
    }, [id]);

    const difficultyConfig = route
        ? {
            Fácil: {
                bg: "bg-earth-green",
                text: "text-[rgb(139,111,71)]",
                icon: "🟢",
                description: "Apta para principiantes",
            },
            Media: {
                bg: "bg-earth-brown",
                text: "text-[rgb(139,111,71)]",
                icon: "🟡",
                description: "Requiere experiencia moderada",
            },
            Difícil: {
                bg: "bg-red-700",
                text: "text-white",
                icon: "🔴",
                description: "Solo para ciclistas experimentados",
            },
        }[route.difficulty]
        : { bg: "", text: "", icon: "", description: "" };

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

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 drop-shadow-2xl leading-tight bg-white/10 backdrop-blur-md inline-block px-8 py-4 rounded-3xl border border-white/10">
                            {route.name}
                        </h1>

                        <div className="mt-4">
                            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-4xl mx-auto bg-white/10 backdrop-blur-md inline-block px-6 py-3 rounded-2xl border border-white/10 shadow-xl">
                                {route.tagline || "Una experiencia única en gravel por el corazón del Empordà"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Tabs */}
                    <div className="bg-gradient-to-r from-earth-beige/50 to-earth-light/50">
                        <div className="flex flex-wrap justify-center gap-4 p-6">
                            {[
                                { id: 'description', label: 'Descripción', icon: '📋' },
                                { id: 'highlights', label: 'Highlights', icon: '⭐' },
                                { id: 'gallery', label: 'Galería', icon: '📸' },
                                { id: 'tips', label: 'Consejos', icon: '💡' },
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
                                                    {route.description || "No hay descripción disponible."}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Datos clave de la ruta */}
                                        <div className="grid md:grid-cols-3 gap-6">
                                            <div className="bg-earth-brown/5 rounded-2xl p-6 border border-earth-brown/20 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="text-4xl">📏</span>
                                                    <h4 className="text-xl font-bold text-earth-dark">Distancia</h4>
                                                </div>
                                                <p className="text-2xl font-black text-earth-brown">
                                                    {route.distance ? `${route.distance} km` : "—"}
                                                </p>
                                            </div>

                                            <div className="bg-earth-brown/5 rounded-2xl p-6 border border-earth-brown/20 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="text-4xl">📈</span>
                                                    <h4 className="text-xl font-bold text-earth-dark">Desnivel</h4>
                                                </div>
                                                <p className="text-2xl font-black text-earth-brown">
                                                    {route.elevation ? `${route.elevation} m` : "—"}
                                                </p>
                                            </div>

                                            <div className="bg-earth-brown/5 rounded-2xl p-6 border border-earth-brown/20 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="text-4xl">⏱️</span>
                                                    <h4 className="text-xl font-bold text-earth-dark">Duración</h4>
                                                </div>
                                                <p className="text-2xl font-black text-earth-brown">
                                                    {route.duration || "—"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Nivel recomendado */}
                                        <div className="bg-earth-green/10 rounded-2xl p-8 border border-earth-green/20">
                                            <h3 className="text-2xl font-black text-earth-dark mb-4 flex items-center gap-3">
                                                <span className="text-4xl">🎯</span> Nivel recomendado
                                            </h3>
                                            <p className="text-lg text-gray-700">
                                                Diseñada para ciclistas con nivel <strong>{route.difficulty.toLowerCase()}</strong>.
                                                {route.difficulty === 'Fácil' && ' Perfecta para iniciarse en el gravel.'}
                                                {route.difficulty === 'Media' && ' Requiere cierta experiencia previa.'}
                                                {route.difficulty === 'Difícil' && ' Solo para ciclistas experimentados.'}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Highlights */}
                                {activeTab === 'highlights' && (
                                    <div className="animate-fade-in space-y-10">
                                        <h2 className="text-4xl font-black text-earth-dark mb-8 flex items-center gap-4">
                                            <span className="text-5xl">✨</span> Puntos destacados
                                        </h2>
                                        {route.highlights && route.highlights.length > 0 ? (
                                            route.highlights.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-start gap-6 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-earth-beige/30"
                                                >
                                                    <span className="text-6xl flex-shrink-0">{item.icon}</span>
                                                    <div>
                                                        <h3 className="text-2xl font-black text-earth-dark mb-3">{item.title}</h3>
                                                        <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 italic">No hay puntos destacados configurados para esta ruta.</p>
                                        )}
                                    </div>
                                )}

                                {/* Tips */}
                                {activeTab === 'tips' && (
                                    <div className="animate-fade-in space-y-10">
                                        <h2 className="text-4xl font-black text-earth-dark mb-8 flex items-center gap-4">
                                            <span className="text-5xl">💡</span> Consejos prácticos
                                        </h2>
                                        {route.tips && route.tips.length > 0 ? (
                                            route.tips.map((tip, i) => (
                                                <div
                                                    key={i}
                                                    className={`rounded-2xl p-8 ${tip.bg || 'bg-earth-green/10'} shadow-lg border ${tip.border || 'border-earth-green/30'}`}
                                                >
                                                    <div className="flex items-start gap-5">
                                                        <span className="text-5xl flex-shrink-0">{tip.icon}</span>
                                                        <div>
                                                            <h3 className="text-2xl font-black text-earth-dark mb-3">{tip.title}</h3>
                                                            <p className="text-gray-800 leading-relaxed">{tip.content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 italic">No hay consejos configurados para esta ruta.</p>
                                        )}
                                    </div>
                                )}

                                {/* Galería */}
                                {activeTab === 'gallery' && (
                                    <div className="animate-fade-in space-y-12">
                                        <div>
                                            <h2 className="text-4xl font-black text-earth-dark mb-8 flex items-center gap-4">
                                                <span className="text-5xl">📸</span> Galería Visual
                                            </h2>
                                            <p className="text-lg text-gray-700 mb-10">
                                                Explora la belleza de esta ruta a través de los ojos de nuestra comunidad y equipo.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {route.gallery && route.gallery.length > 0 ? (
                                                route.gallery.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="group relative aspect-video overflow-hidden rounded-3xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-earth-beige/20"
                                                        onClick={() => {
                                                            const mediaUrl = item.type === 'video' ? item.url : item.url;
                                                            if (mediaUrl && !brokenImages.has(index)) {
                                                                setSelectedMedia(mediaUrl);
                                                            }
                                                        }}
                                                    >
                                                        {(!item.url && item.type === 'image') ||
                                                            (item.type === 'video' && !item.thumbnail && !item.url) ||
                                                            brokenImages.has(index) ? (
                                                            <div className="w-full h-full flex flex-col items-center justify-center bg-earth-beige/30 text-earth-dark/40">
                                                                <svg className="w-16 h-16 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={1}
                                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                    />
                                                                </svg>
                                                                <span className="text-xs font-bold uppercase tracking-widest">Sin imagen</span>
                                                            </div>
                                                        ) : (
                                                            <img
                                                                src={item.type === 'image' ? item.url : item.thumbnail || "/placeholder.jpg"}
                                                                alt={route.name}
                                                                className="w-full h-full object-cover"
                                                                onError={() => setBrokenImages(prev => new Set([...prev, index]))}
                                                            />
                                                        )}

                                                        <div className="absolute inset-0 bg-earth-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                            {!brokenImages.has(index) &&
                                                                (item.type === 'video' ? (
                                                                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                                                                        <svg className="w-8 h-8 text-earth-brown ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path d="M4.5 3.5a.5.5 0 00-.5.5v12a.5.5 0 00.724.447l11-6a.5.5 0 000-.894l-11-6a.5.5 0 00-.224-.053z" />
                                                                        </svg>
                                                                    </div>
                                                                ) : (
                                                                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                                                        />
                                                                    </svg>
                                                                ))}
                                                        </div>

                                                        {item.type === 'video' && (
                                                            <span className="absolute bottom-4 right-4 bg-earth-brown text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                                                                Video
                                                            </span>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-500 italic col-span-full text-center">No hay galería disponible para esta ruta.</p>
                                            )}
                                        </div>

                                        <div className="bg-earth-beige/20 rounded-3xl p-10 border border-earth-beige/30 text-center">
                                            <p className="text-earth-dark font-medium italic">
                                                "Cada pedalada en esta ruta es una postal inolvidable. El gravel en su estado más puro."
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar (1/3) */}
                            <div className="space-y-10">
                                {/* Pack de descarga */}
                                <div className="bg-gradient-to-br from-earth-brown to-earth-green rounded-3xl p-10 text-[rgb(139,111,71)] shadow-2xl border border-earth-brown/20">
                                    <div className="text-center mb-8">
                                        <div className="text-7xl mb-4">📦</div>
                                        <h3 className="text-3xl font-black mb-2">Pack Completo</h3>
                                        <p className="opacity-90">Todo lo necesario para tu ruta</p>
                                    </div>
                                    <ul className="space-y-4 mb-10">
                                        {Array.isArray(route.download_pack_features) && route.download_pack_features.length > 0 ? (
                                            route.download_pack_features.map((item, i) => (
                                                <li key={i} className="flex items-center gap-4">
                                                    <span className="text-2xl">✓</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-center text-gray-600 italic">No hay elementos en el pack configurado aún.</li>
                                        )}
                                    </ul>
                                    <button className="w-full bg-brown text-earth-brown font-black py-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-lg">
                                        Descargar Todo
                                    </button>
                                    <p className="text-center text-sm mt-4 opacity-80">
                                        Compatible con Garmin, Wahoo y Strava
                                    </p>
                                </div>

                                {/* Info rápida */}
                                <div className="bg-earth-beige/30 rounded-3xl p-6 border border-earth-beige/40">
                                    <h4 className="text-lg font-black text-earth-dark mb-4 flex items-center gap-2">
                                        <span className="text-2xl">ℹ️</span> Información rápida
                                    </h4>
                                    <div className="space-y-3">
                                        {Array.isArray(route.quick_info) && route.quick_info.length > 0 ? (
                                            route.quick_info.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-earth-beige/30"
                                                >
                                                    <span className="flex items-center gap-2 font-medium text-gray-700 text-sm">
                                                        <span className="text-lg">{item.icon}</span>
                                                        {item.label}
                                                    </span>
                                                    <span className="font-bold text-earth-dark text-sm">{item.value}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 italic text-center text-sm">
                                                No hay información rápida configurada para esta ruta.
                                            </p>
                                        )}
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

            {/* Lightbox / Media Modal */}
            {selectedMedia && (
                <div
                    className="fixed inset-0 z-[100] bg-earth-dark/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-fade-in"
                    onClick={() => setSelectedMedia(null)}
                >
                    <button
                        className="absolute top-10 right-10 text-white hover:text-earth-beige transition-colors p-2"
                        onClick={() => setSelectedMedia(null)}
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div
                        className="max-w-6xl w-full max-h-[85vh] flex items-center justify-center relative shadow-2xl rounded-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedMedia.includes('youtube') ? (
                            <iframe
                                src={`${selectedMedia}?autoplay=1`}
                                className="w-full aspect-video rounded-2xl"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={selectedMedia} alt="Expanded view" className="max-w-full max-h-full object-contain rounded-2xl" />
                        )}
                    </div>
                </div>
            )}

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