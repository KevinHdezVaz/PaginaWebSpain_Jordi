import { useEffect, useState } from "react";
import RouteCard from "../components/sections/RouteCard";

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

export default function RoutesPage() {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | "Fácil" | "Media" | "Difícil">("all");

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await fetch("https://spainweb.picklebracket.pro/api/routes"); // ← Cambia por tu dominio real o localhost
                if (!response.ok) {
                    throw new Error("Error al cargar las rutas");
                }
                const data = await response.json();
                // Laravel devuelve {data: [...]}, pero si usas Route::all() devuelve array directo
                const routesData = Array.isArray(data) ? data : data.data;
                setRoutes(routesData);
                setFilteredRoutes(routesData);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar las rutas. Intenta recargar la página.");
                setLoading(false);
            }
        };
        fetchRoutes();
    }, []);

    useEffect(() => {
        let updatedRoutes = routes;

        // Filtrar por dificultad
        if (selectedDifficulty !== "all") {
            updatedRoutes = updatedRoutes.filter((route) => route.difficulty === selectedDifficulty);
        }

        // Filtrar por búsqueda
        if (searchQuery) {
            updatedRoutes = updatedRoutes.filter((route) =>
                route.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredRoutes(updatedRoutes);
    }, [searchQuery, selectedDifficulty, routes]);

    if (loading) {
        return (
            <div className="min-h-screen bg-earth-light flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-earth-brown border-opacity-50 mx-auto"></div>
                    <p className="mt-4 text-xl text-earth-dark">Cargando rutas...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-earth-light flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-xl max-w-md">
                    <p className="text-2xl text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-earth-brown text-white px-6 py-3 rounded-lg font-medium transition-all hover:bg-earth-green hover:shadow-md"
                    >
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
                        Nuestras Rutas Gravel
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Hasta 10 rutas cuidadosamente diseñadas para descubrir el Empordà de la forma más auténtica: sobre tu bicicleta.
                    </p>
                </div>

                {/* Controles de filtro y búsqueda */}
                <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="Buscar rutas por nombre..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-earth-brown transition-all"
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setSelectedDifficulty("all")}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedDifficulty === "all" ? "bg-earth-brown text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                        >
                            Todas
                        </button>
                        <button
                            onClick={() => setSelectedDifficulty("Fácil")}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedDifficulty === "Fácil" ? "bg-earth-brown text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                        >
                            Fácil
                        </button>
                        <button
                            onClick={() => setSelectedDifficulty("Media")}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedDifficulty === "Media" ? "bg-earth-brown text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                        >
                            Media
                        </button>
                        <button
                            onClick={() => setSelectedDifficulty("Difícil")}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedDifficulty === "Difícil" ? "bg-earth-brown text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                        >
                            Difícil
                        </button>
                    </div>
                </div>

                {filteredRoutes.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl text-gray-600">No hay rutas disponibles que coincidan con los criterios.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {filteredRoutes.map((route) => (
                            <RouteCard
                                key={route.id}
                                route={{
                                    id: route.id,
                                    name: route.name,
                                    image: route.image || "/placeholder.jpg", // fallback si no hay imagen
                                    distance: route.distance || "N/A",
                                    elevation: route.elevation || "N/A",
                                    duration: route.duration || "N/A",
                                    difficulty: route.difficulty,
                                    description: route.description || "Sin descripción disponible.",
                                }}
                            />
                        ))}
                    </div>
                )}

                <div className="text-center mt-16">
                    <p className="text-lg text-gray-600">
                        Cada ruta incluye PDF detallado con track GPS (Strava + Wikiloc), altimetría, puntos de interés y recomendaciones.
                    </p>
                </div>
            </div>
        </div>
    );
}