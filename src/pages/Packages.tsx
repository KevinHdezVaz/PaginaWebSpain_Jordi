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
                    <div className="spinner-border text-earth-brown" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-4 text-xl text-earth-dark">Cargando paquetes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-earth-light flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl text-red-600 mb-4">{error}</p>
                    <button onClick={() => window.location.reload()} className="btn bg-earth-brown text-white px-6 py-3 rounded-lg">
                        Recargar página
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-earth-light py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-earth-dark mb-6">
                        Nuestros Paquetes Cicloturistas
                    </h1>
                    <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                        Paquetes todo incluido diseñados para grupos de 4 a 10 personas.
                        Solo trae tu bicicleta y ganas de disfrutar – nosotros nos ocupamos del resto.
                    </p>
                </div>

                {packages.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl text-gray-600">No hay paquetes disponibles en este momento.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-12">
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
                                }}
                            />
                        ))}
                    </div>
                )}

                <div className="text-center mt-20 bg-earth-beige/50 py-12 rounded-2xl">
                    <p className="text-2xl font-semibold text-earth-dark mb-4">
                        ¿Quieres un paquete a medida?
                    </p>
                    <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                        Próximamente podrás personalizar tu experiencia en la sección Configuración:
                        añadir días, cambiar hoteles, incluir actividades extras...
                    </p>
                    <a
                        href="/configurator"
                        className="inline-block bg-earth-brown hover:bg-earth-green text-white font-bold py-4 px-10 rounded-lg text-xl transition-all shadow-lg"
                    >
                        Ver Configurador (próximamente)
                    </a>
                </div>
            </div>
        </div>
    );
}