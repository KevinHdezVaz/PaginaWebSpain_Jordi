import { useEffect, useState } from "react";
import PackageCard from "../components/sections/PackageCard";

type Package = {
    id: number;
    name: string;
    days: number;
    nights: number;
    price: string;
    image: string | null;
    description: string | null;
    highlights: string[];
    isPopular?: boolean;
};

export default function Packages() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch("https://spainweb.picklebracket.pro/api/packages");
                if (!response.ok) {
                    throw new Error("Error al cargar los paquetes");
                }
                const data = await response.json();
                setPackages(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar los paquetes. Intenta recargar la página.");
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-earth-light flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-earth-brown"></div>
                    <p className="mt-6 text-2xl text-earth-dark font-medium">Cargando paquetes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-earth-light flex items-center justify-center">
                <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-lg">
                    <p className="text-2xl text-red-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-earth-brown hover:bg-earth-green text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg"
                    >
                        Recargar página
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-earth-light">
            {/* Premium Hero Section */}
            <div
                className="relative bg-cover bg-center text-white py-32 md:py-40 overflow-hidden"
                style={{
                    backgroundImage:
                        "url('https://cdn.biketours.com/assets/files/4268/catalonia_emporda_spain_gravel_bike_tour_to3.jpg.webp')",
                }}
            >
                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-earth-dark/70"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center">
                        {/* Trust Badge */}
                        <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-8 py-4 rounded-full mb-12 border border-white/30 shadow-xl">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-lg font-bold">Más de 500 ciclistas satisfechos</span>
                        </div>

                        {/* Título principal con fondo blur suave - solo el título, subtítulo vuelve a ámbar y fuera del blur */}
                        {/* Título principal con fondo blur suave - texto forzado a blanco puro */}
                        <div className="mb-8">
                            <div className="inline-block bg-white/20 backdrop-blur-xl px-12 py-10 rounded-3xl shadow-2xl">
                                <h1 className="text-5xl md:text-7xl font-black leading-tight text-white">
                                    Experiencias Gravel
                                </h1>
                            </div>
                            <div className="mt-6">
                                <span className="block text-amber-300 text-4xl md:text-6xl font-black">
                                    Todo Incluido
                                </span>
                            </div>
                        </div>

                        <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed opacity-95">
                            Paquetes premium diseñados para grupos de 4 a 10 personas.
                            <span className="block mt-4 text-amber-200 font-bold text-2xl">
                                Solo trae tu bicicleta y ganas de disfrutar – nosotros nos ocupamos del resto.
                            </span>
                        </p>

                        {/* Key Features */}
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xl font-semibold">Rutas Exclusivas</span>
                            </div>
                            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span className="text-xl font-semibold">Alojamiento Premium</span>
                            </div>
                            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xl font-semibold">Soporte 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Packages Grid */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                {packages.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-3xl shadow-xl">
                        <p className="text-3xl text-gray-600 font-medium">No hay paquetes disponibles en este momento.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                        {packages.map((pkg) => (
                            <PackageCard
                                key={pkg.id}
                                pkg={{
                                    id: pkg.id,
                                    name: pkg.name,
                                    days: pkg.days,
                                    nights: pkg.nights,
                                    price: pkg.price,
                                    image: pkg.image || "/placeholder.jpg",
                                    description: pkg.description || "",
                                    highlights: pkg.highlights || [],
                                    isPopular: pkg.id === 2,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Custom Package CTA */}
                <div
                    className="mt-32 relative rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center text-white p-16 md:p-24"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80')",
                    }}
                >
                    <div className="absolute inset-0 bg-earth-dark/75"></div>
                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <svg className="w-20 h-20 text-earth-green mx-auto mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <h2 className="text-5xl md:text-6xl font-black mb-8">
                            ¿Quieres un paquete a medida?
                        </h2>
                        <p className="text-2xl mb-12 leading-relaxed opacity-95">
                            Próximamente podrás personalizar tu experiencia en la sección Configuración:
                            <span className="block mt-6 text-amber-200 font-bold text-3xl">
                                Añadir días • Cambiar hoteles • Incluir actividades extras
                            </span>
                        </p>
                        <a
                            href="/configurator"
                            className="inline-flex items-center gap-4 bg-white text-earth-dark hover:bg-amber-100 font-black py-6 px-12 rounded-2xl text-2xl transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Ver Configurador
                            <span className="ml-4 text-sm bg-earth-brown text-white px-4 py-2 rounded-full font-bold">Próximamente</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}