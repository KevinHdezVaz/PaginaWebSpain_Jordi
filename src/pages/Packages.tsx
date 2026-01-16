import PackageCard from "../components/sections/PackageCard";

// Imágenes de ejemplo (hoteles, ciclistas, gastronomía). Cambia por las reales cuando las tengas
const mockPackages = [
    {
        id: 1,
        name: "Fin de semana gravel",
        days: 3,
        nights: 2,
        price: "Desde 750€",
        image: "https://images.unsplash.com/photo-1520250497591-112f7266f6da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        routesIncluded: 2,
        description: "Ideal para una escapada corta. Dos rutas espectaculares, hoteles con encanto y gastronomía local de primer nivel.",
        highlights: [
            "2 rutas gravel guiadas",
            "2 noches en hotel boutique",
            "Desayunos y 2 cenas incluidos",
            "Asistencia mecánica básica",
            "Experiencia cultural local",
        ],
    },
    {
        id: 2,
        name: "Experiencia Empordà",
        days: 5,
        nights: 4,
        price: "Desde 1.350€",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        routesIncluded: 4,
        description: "La opción más popular. Cinco días para conocer a fondo el Baix y Alt Empordà combinando deporte y placer.",
        highlights: [
            "4 rutas gravel exclusivas",
            "4 noches en hoteles seleccionados",
            "Todas las comidas incluidas",
            "Visita guiada cultural",
            "Asistencia completa en ruta",
            "Seguro de viaje básico",
        ],
    },
    {
        id: 3,
        name: "Inmersión total",
        days: 7,
        nights: 6,
        price: "Desde 1.950€",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        routesIncluded: 6,
        description: "Una semana completa para vivir el Empordà como un local. Máxima variedad de rutas y experiencias premium.",
        highlights: [
            "6 rutas gravel variadas",
            "6 noches en alojamientos premium",
            "Pensión completa gourmet",
            "Experiencias exclusivas (bodega, cocina local)",
            "Traslados y logística completa",
            "Grupo reducido (máx 10 personas)",
        ],
    },
];

export default function Packages() {
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

                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-12">
                    {mockPackages.map((pkg) => (
                        <PackageCard key={pkg.id} pkg={pkg} />
                    ))}
                </div>

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