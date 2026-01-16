import { Link } from "react-router-dom";

type Package = {
    id: number;
    name: string;
    days: number;
    nights: number;
    price: string;         // ej: "Desde 750€"
    image: string;
    routesIncluded?: number;  // ← El ? lo hace opcional
    highlights: string[]; // lista de lo que incluye
    description: string;
};

export default function PackageCard({ pkg }: { pkg: Package }) {
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 flex flex-col h-full">
            <div className="h-80 overflow-hidden">
                <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                />
                {/* Etiqueta de precio en esquina */}
                <div className="absolute top-6 right-6 bg-earth-brown text-white px-6 py-3 rounded-full text-2xl font-bold shadow-lg">
                    {pkg.price}
                </div>
            </div>

            <div className="p-10 flex-1 flex flex-col">
                <h3 className="text-3xl font-bold text-earth-dark mb-4">
                    {pkg.name}
                </h3>
                <p className="text-5xl font-bold text-earth-green mb-6">
                    {pkg.days} días <span className="text-3xl font-normal text-gray-600">/ {pkg.nights} noches</span>
                </p>

                <p className="text-gray-700 mb-8 flex-1">
                    {pkg.description}
                </p>

                <div className="mb-8">
                    <p className="font-semibold text-earth-dark mb-3">Incluye:</p>
                    <ul className="space-y-2">
                        {pkg.highlights.map((item, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                                <svg className="w-5 h-5 text-earth-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex gap-4 mt-auto">
                    <a
                        href={`/packages/pdf-${pkg.id}.pdf`} // Futuro PDF real
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-earth-dark hover:bg-earth-brown text-white font-bold py-4 rounded-lg transition-all shadow-md hover:shadow-lg"
                    >
                        Ver PDF completo
                    </a>
                    <Link
                        to="/contact" // Por ahora va a contacto, luego al formulario de reserva
                        className="flex-1 text-center bg-earth-brown hover:bg-earth-green text-white font-bold py-4 rounded-lg transition-all shadow-md hover:shadow-lg"
                    >
                        Reservar ahora
                    </Link>
                </div>
            </div>
        </div>
    );
}