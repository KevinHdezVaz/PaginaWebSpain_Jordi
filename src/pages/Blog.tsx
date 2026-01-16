import BlogCard from "../components/sections/BlogCard";

// Datos mock de ejemplo. Jordi podrá añadir más fácilmente (o conectar a CMS después)
const mockPosts = [
    {
        id: 1,
        title: "Una semana inolvidable con el paquete de 7 días",
        excerpt: "Un grupo de amigos de Bélgica vivió la experiencia completa: rutas variadas, hoteles con encanto y cenas gourmet en restaurantes locales. Aquí su relato y fotos.",
        date: "10 Enero 2026",
        author: "Jordi Alòs",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        category: "Experiencias",
    },
    {
        id: 2,
        title: "Los mejores restaurantes de ruta en el Baix Empordà",
        excerpt: "Recomendaciones de paradas obligatorias: desde arroces en Pals hasta pescado fresco en Palamós. Incluimos menús especiales para ciclistas.",
        date: "5 Enero 2026",
        author: "Equipo Gravel Empordà",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        category: "Gastronomía",
    },
    {
        id: 3,
        title: "Consejos para preparar tu gravel en el Empordà",
        excerpt: "Neumáticos ideales, ropa según temporada, qué llevar en la bolsa... Todo lo que necesitas saber antes de venir.",
        date: "20 Diciembre 2025",
        author: "Jordi Alòs",
        image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        category: "Consejos",
    },
    {
        id: 4,
        title: "Nueva ruta: Los viñedos del Alt Empordà",
        excerpt: "Acabamos de añadir una ruta espectacular pasando por bodegas familiares y paisajes de viñedos infinitos. Ya incluida en el paquete de 7 días.",
        date: "15 Diciembre 2025",
        author: "Equipo Gravel Empordà",
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        category: "Novedades",
    },
];

export default function Blog() {
    return (
        <div className="min-h-screen bg-earth-light py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-earth-dark mb-6">
                        Blog & Experiencias
                    </h1>
                    <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                        Noticias, relatos de clientes, recomendaciones gastronómicas, novedades en rutas
                        y todo lo que acontece en Gravel Empordà 360º.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {mockPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                <div className="text-center mt-16">
                    <p className="text-lg text-gray-600 italic">
                        Pronto podrás subir tus propias fotos y experiencias tras la ruta.
                        ¡Queremos compartir tu aventura!
                    </p>
                </div>
            </div>
        </div>
    );
}