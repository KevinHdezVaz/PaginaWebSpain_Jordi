import RouteCard from "../components/sections/RouteCard";

// Imágenes de ejemplo (Unsplash - cicloturismo/gravel). Cámbialas luego por las reales
const mockRoutes = [
    {
        id: 1,
        name: "Ruta de los Pueblos Medievales",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        distance: "68 km",
        elevation: "+1.450 m",
        duration: "6-8 horas",
        difficulty: "Media" as const,
        description: "Recorre encantadores pueblos medievales del Baix Empordà, castillos, campos de olivos y viñedos con vistas al mar.",
    },
    {
        id: 2,
        name: "Costa Brava Gravel",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        distance: "55 km",
        elevation: "+900 m",
        duration: "4-6 horas",
        difficulty: "Fácil" as const,
        description: "Combina caminos interiores con tramos cercanos a calas escondidas y acantilados de la Costa Brava.",
    },
    {
        id: 3,
        name: "Volcanes del Garrotxa",
        image: "https://images.unsplash.com/photo-1540979384512-1161c1cf9c8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        distance: "82 km",
        elevation: "+1.800 m",
        duration: "7-9 horas",
        difficulty: "Difícil" as const,
        description: "Atravesarás la zona volcánica de la Garrotxa con paisajes únicos, bosques frondosos y cráteres extinguidos.",
    },
    // Puedes añadir hasta 10 aquí fácilmente
];

export default function RoutesPage() {
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {mockRoutes.map((route) => (
                        <RouteCard key={route.id} route={route} />
                    ))}
                </div>

                <div className="text-center mt-16">
                    <p className="text-lg text-gray-600">
                        Cada ruta incluye PDF detallado con track GPS (Strava + Wikiloc), altimetría, puntos de interés y recomendaciones.
                    </p>
                </div>
            </div>
        </div>
    );
}