import { useEffect, useState } from "react";
import BlogCard from "../components/sections/BlogCard";

type BlogPost = {
    id: number;
    title: string;
    excerpt: string;
    image: string | null;
    date: string; // viene como "15 Enero 2026" desde la API
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
                    <div className="spinner-border text-earth-brown" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-4 text-xl text-earth-dark">Cargando el blog...</p>
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
                        Blog & Experiencias
                    </h1>
                    <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                        Noticias, relatos de clientes, recomendaciones gastronómicas, novedades en rutas
                        y todo lo que acontece en Gravel Empordà 360º.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl text-gray-600">No hay entradas en el blog todavía.</p>
                        <p className="text-lg text-gray-500 mt-4">Jordi pronto publicará las primeras experiencias.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
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