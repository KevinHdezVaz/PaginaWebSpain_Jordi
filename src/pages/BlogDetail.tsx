import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type BlogPost = {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string | null;
    date: string;
    category: string;
};

export default function BlogDetail() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch("https://spainweb.picklebracket.pro/api/blog-posts");
                if (!response.ok) throw new Error("Error al cargar el blog");

                const posts = await response.json();
                const foundPost = posts.find((p: any) => p.id === parseInt(id!));

                if (!foundPost) {
                    setError("Entrada no encontrada");
                    setLoading(false);
                    return;
                }

                // Formatear fecha bonita (si viene como string Y-m-d)
                if (foundPost.date && typeof foundPost.date === 'string') {
                    const dateObj = new Date(foundPost.date);
                    foundPost.date = dateObj.toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    });
                }

                setPost(foundPost);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("No se pudo cargar la entrada");
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-earth-light flex items-center justify-center">
                <p className="text-xl text-earth-dark">Cargando entrada...</p>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-earth-light flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl text-red-600 mb-4">{error || "Entrada no encontrada"}</p>
                    <Link to="/blog" className="text-earth-brown hover:text-earth-green font-medium text-lg">
                        ← Volver al blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-earth-light">
            {/* Hero imagen */}
            <div className="relative h-96 md:h-screen max-h-96 overflow-hidden">
                {post.image ? (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-earth-beige flex items-center justify-center">
                        <p className="text-4xl text-earth-dark opacity-50">Gravel Empordà 360º</p>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-5xl mx-auto">
                        <span className="inline-block bg-earth-green px-5 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
                            {post.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                            {post.title}
                        </h1>
                        <p className="text-xl opacity-90">
                            {post.date}
                        </p>
                    </div>
                </div>
            </div>

            {/* Contenido */}
            <article className="max-w-5xl mx-auto px-6 py-16">
                <div className="prose prose-lg max-w-none mx-auto text-gray-800">
                    <p className="text-xl leading-relaxed mb-12 text-gray-700">
                        {post.excerpt}
                    </p>

                    <div
                        className="leading-8 text-justify prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: (post.content || '').replace(/\n/g, '<br>')
                        }}
                    />
                </div>

                <div className="mt-20 pt-12 border-t-2 border-earth-beige/50 text-center">
                    <Link
                        to="/blog"
                        className="inline-flex items-center text-earth-brown hover:text-earth-green font-bold text-lg transition-colors"
                    >
                        ← Volver al blog
                    </Link>
                </div>
            </article>
        </div>
    );
}