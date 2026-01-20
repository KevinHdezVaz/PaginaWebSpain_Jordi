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

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="h-64 overflow-hidden">
                <img
                    src={route.image}
                    alt={route.name}
                    className="w-full h-full object-cover"
                />
            </div>
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
                    to={`/routes/${route.id}`} // Futura página de detalle
                    className="inline-block bg-[rgb(139,111,71)] hover:bg-[rgb(107,142,35)] text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                    Ver detalles y PDF
                </Link>
            </div>
        </div>
    );
}