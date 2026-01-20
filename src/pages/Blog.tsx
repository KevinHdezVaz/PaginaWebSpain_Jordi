import { useEffect, useState } from "react";
import BlogCard from "../components/sections/BlogCard";

type BlogPost = {
    id: number;
    title: string;
    excerpt: string;
    image: string | null;
    date: string;
    category: string;
};

export default function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await fetch("https://spainweb.picklebracket.pro/api/blog-posts");
                if (!response.ok) {
                    throw new Error("Error al cargar el blog");
                }
                const data = await response.json();
                setPosts(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar las entradas del blog. Intenta recargar la página.");
                setLoading(false);
            }
        };
        fetchBlogPosts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-earth-light flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-24 w-24 border-t-8 border-b-8 border-earth-brown mb-8"></div>
                    <p className="text-3xl font-black text-earth-dark">Cargando experiencias...</p>
                    <p className="text-lg text-gray-600 mt-4">Preparando las últimas historias del Empordà</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-earth-light flex items-center justify-center p-6">
                <div className="text-center bg-earth-beige/50 rounded-3xl shadow-2xl p-12 max-w-lg border-2 border-earth-brown/20">
                    <p className="text-3xl font-black text-earth-dark mb-6">¡Ups!</p>
                    <p className="text-xl text-red-600 mb-8">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-earth-brown hover:bg-earth-green text-white font-black px-10 py-5 rounded-2xl text-xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        Recargar página
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-earth-light">
            {/* Hero Section */}
            <div
                className="relative h-96 md:h-[70vh] bg-cover bg-center text-white flex items-center justify-center overflow-hidden"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1502086223501-08a3f19f3e62?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-earth-dark/70"></div>

                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                        Blog & Experiencias
                    </h1>
                    {/* Texto descriptivo con color de letras en el café rgb(139,111,71) */}
                    <p className="text-xl md:text-3xl font-medium opacity-95 max-w-4xl mx-auto text-[rgb(139,111,71)]">
                        Noticias, relatos de clientes, recomendaciones gastronómicas, novedades en rutas
                        y todo lo que acontece en Gravel Empordà 360º.
                    </p>
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                {posts.length === 0 ? (
                    <div className="text-center py-32 bg-earth-beige/30 rounded-3xl shadow-2xl border-2 border-earth-brown/20">
                        <p className="text-4xl font-black text-earth-dark mb-6">No hay entradas todavía</p>
                        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                            Jordi está preparando las primeras historias auténticas. ¡Volveremos pronto con relatos inolvidables!
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                        {posts.map((post) => (
                            <BlogCard
                                key={post.id}
                                post={{
                                    id: post.id,
                                    title: post.title,
                                    excerpt: post.excerpt,
                                    image: post.image || "/placeholder.jpg",
                                    date: post.date,
                                    category: post.category,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Mensaje final */}
                <div className="mt-24 text-center bg-earth-beige/30 rounded-3xl p-12 shadow-xl border-2 border-earth-brown/20">
                    <p className="text-2xl font-bold text-earth-dark mb-4">
                        ¡Comparte tu aventura con nosotros!
                    </p>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Pronto podrás subir tus propias fotos y experiencias tras la ruta.
                        Queremos que el mundo conozca tu historia en el Empordà.
                    </p>
                </div>
            </div>
        </div>
    );
}