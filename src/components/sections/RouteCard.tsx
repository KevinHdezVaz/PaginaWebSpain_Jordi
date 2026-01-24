import { Link } from "react-router-dom";

type Route = {
    id: number;
    name: string;
    image: string; // URL de la foto
    distance: string; // ej: "65 km"
    elevation: string; // ej: "+1.200 m"
    duration: string; // ej: "5-7 horas"
    difficulty: "Fácil" | "Media" | "Difícil";
    description: string;
};

export default function RouteCard({ route }: { route: Route }) {
    const difficultyColor = {
        Fácil: "text-earth-green",
        Media: "text-earth-brown",
        Difícil: "text-red-700",
    }[route.difficulty];

    // Consideramos imagen válida solo si existe y no está vacía
    const hasImage = !!route?.image?.trim();

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            {/* Sección de imagen / placeholder */}
            <div className="h-64 overflow-hidden bg-gray-50 relative">
                {hasImage && (
                    <img
                        src={route.image}
                        alt={route.name}
                        className="w-full h-full object-cover"
                        // Si la imagen falla al cargar → ocultamos y mostramos placeholder
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                            const placeholder = (e.target as HTMLImageElement).nextElementSibling;
                            if (placeholder) placeholder.removeAttribute("hidden");
                        }}
                    />
                )}

                <div
                    className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50"
                    hidden={hasImage}
                >
                    <svg
                        className="w-20 h-20 mb-3 opacity-60"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.4}
                            d="M3 15l4-4 4 4 8-8M3 21h18"
                        />
                        <circle cx="16" cy="8" r="2" />
                    </svg>
                    <span className="text-sm font-medium tracking-wide">Sin fotografía</span>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-8">
                <h3 className="text-2xl font-bold text-earth-dark mb-3">
                    {route.name}
                </h3>

                <div className="flex flex-wrap gap-4 text-sm mb-4">
                    <span className="font-medium">{route.distance}</span>
                    <span className="font-medium">{route.elevation}</span>
                    <span className="font-medium">{route.duration}</span>
                    <span className={`font-bold ${difficultyColor}`}>
                        {route.difficulty}
                    </span>
                </div>

                <p className="text-gray-700 mb-6 line-clamp-3">
                    {route.description}
                </p>

                <Link
                    to={`/routes/${route.id}`}
                    className="inline-block bg-[rgb(139,111,71)] hover:bg-[rgb(107,142,35)] text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                    Ver detalles y PDF
                </Link>
            </div>
        </div>
    );
}