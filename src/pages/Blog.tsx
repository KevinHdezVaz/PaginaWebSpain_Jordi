import { useEffect, useState } from "react";
import BlogCard from "../components/sections/BlogCard";
import SubmitStory from "./SubmitStory";

type BlogPost = {
    id: number;
    title: string;
    excerpt: string;
    image: string | null;
    date: string;
    category: string;
    slug?: string;
};



export default function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("Todas");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Estado para controlar el modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await fetch("https://spainweb.picklebracket.pro/api/blog-posts");
                if (!response.ok) throw new Error("Error al cargar el blog");
                const data: BlogPost[] = await response.json();
                const sorted = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setPosts(sorted);
                setFilteredPosts(sorted);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("No pudimos cargar las historias. Intenta de nuevo en unos minutos.");
                setLoading(false);
            }
        };
        fetchBlogPosts();
    }, []);

    useEffect(() => {
        if (selectedCategory === "Todas") {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(posts.filter((p) => p.category === selectedCategory));
        }
    }, [selectedCategory, posts]);

    const featuredPost = posts[0];
    const recentPosts = posts.slice(1, 4);

    if (loading) {
        return (
            <div className="min-h-screen bg-earth-light flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-earth-brown mx-auto mb-6"></div>
                    <p className="text-2xl font-bold text-earth-dark">Cargando historias del gravel...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-earth-light flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                    <p className="text-3xl font-black text-earth-dark mb-4">¡Vaya!</p>
                    <p className="text-xl text-red-700 mb-8">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-earth-brown hover:bg-earth-green text-white font-bold px-8 py-4 rounded-xl text-lg transition shadow-lg hover:shadow-xl"
                    >
                        Intentar de nuevo
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-earth-light">
            {/* Hero */}
            <div className="relative">
                <div
                    className="h-[60vh] md:h-[80vh] bg-cover bg-center relative"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1502086223501-08a3f19f3e62?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-light via-earth-light/80 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="max-w-7xl mx-auto px-6 w-full">
                            <span className="inline-block bg-[rgb(139,111,71)] text-white px-5 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
                                Comunidad Gravel Empordà 360º
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 text-earth-dark drop-shadow-sm">
                                Historias, rutas y <span className="text-[rgb(139,111,71)]">gente real</span>
                            </h1>
                            <p className="text-xl md:text-2xl max-w-3xl font-medium text-earth-dark/90 text-shadow-sm">
                                Relatos auténticos de gravel, recomendaciones de proveedores locales, tracks, guías y todo lo que hacemos juntos en el Empordà.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contenido principal */}
                    <div className="lg:col-span-2">
                        {/* Filtros */}

                        {filteredPosts.length === 0 ? (
                            <div className="text-center py-24 bg-earth-beige/40 rounded-3xl border border-earth-brown/20">
                                <p className="text-3xl font-black text-earth-dark mb-4">
                                    Aún no hay {selectedCategory === "Todas" ? "historias" : `historias en ${selectedCategory}`}
                                </p>
                                <p className="text-lg text-gray-700 max-w-xl mx-auto mb-8">
                                    La comunidad está creciendo. Pronto llegarán relatos, tracks y recomendaciones de ciclistas y proveedores locales.
                                </p>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="inline-block bg-earth-green text-white font-bold px-8 py-4 rounded-xl hover:bg-earth-brown transition"
                                >
                                    Contribuir ahora →
                                </button>
                            </div>
                        ) : (
                            <>
                                {featuredPost && selectedCategory === "Todas" && (
                                    <div className="mb-16">
                                        <BlogCard post={featuredPost} featured={true} />
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
                                    {(selectedCategory === "Todas" ? posts.slice(1) : filteredPosts).map((post) => (
                                        <BlogCard key={post.id} post={post} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-10">
                        {/* Contribuir (abre modal) */}
                        <div className="bg-brown/70 rounded-2xl p-8 border border-earth-brown/20">
                            <h3 className="text-xl font-bold text-earth-dark mb-4">
                                ¿Quieres aparecer aquí?
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Comparte tu ruta, fotos, track GPX, recomendación de proveedor o cualquier historia gravel.
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="block w-full text-center bg-earth-brown text-white font-medium py-3 px-6 rounded-xl hover:bg-earth-dark transition shadow-lg"
                            >
                                Enviar mi historia ahora
                            </button>
                        </div>

                        {/* Posts recientes */}
                        {recentPosts.length > 0 && (
                            <div>
                                <h3 className="text-xl font-bold text-earth-dark mb-6 border-b border-earth-brown/30 pb-3">
                                    Recientes
                                </h3>
                                <div className="space-y-6">
                                    {recentPosts.map((post) => (
                                        <div key={post.id} className="group">
                                            <p className="font-medium group-hover:text-earth-green transition line-clamp-2">
                                                {post.title}
                                            </p>
                                            <p className="text-sm text-gray-500">{post.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </div>

            {/* MODAL con SubmitStory */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
                    <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Botón cerrar */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-earth-dark hover:text-red-600 text-4xl font-bold z-20 transition-colors"
                            aria-label="Cerrar"
                        >
                            ×
                        </button>

                        <SubmitStory onSuccess={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}