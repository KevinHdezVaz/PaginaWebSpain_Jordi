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
                const res = await fetch("https://spainweb.picklebracket.pro/api/blog-posts");
                if (!res.ok) throw new Error();
                const posts: BlogPost[] = await res.json();
                const found = posts.find((p) => p.id === parseInt(id || "0"));
                if (!found) throw new Error("No encontrado");

                // Formato fecha bonito
                if (found.date) {
                    found.date = new Date(found.date).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    });
                }
                setPost(found);
            } catch {
                setError("No pudimos cargar esta historia.");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

    if (error || !post) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center p-8">
                <div>
                    <p className="text-3xl font-bold text-earth-dark mb-4">{error || "Historia no encontrada"}</p>
                    <Link to="/blog" className="text-earth-brown hover:text-earth-green font-medium">
                        ← Volver al blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-earth-light">
            {/* Hero post */}
            <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
                {post.image ? (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-earth-beige to-earth-brown/40 flex items-center justify-center">
                        <p className="text-6xl font-black text-white/40">Gravel Empordà</p>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
                    <div className="max-w-4xl mx-auto">
                        <span className="inline-block bg-earth-green/90 px-5 py-1.5 rounded-full text-sm font-bold mb-4 backdrop-blur-sm">
                            {post.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black leading-tight drop-shadow-2xl mb-4">
                            {post.title}
                        </h1>
                        <p className="text-lg md:text-xl opacity-90">{post.date}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
                <article className="prose prose-lg prose-headings:text-earth-dark prose-a:text-earth-brown hover:prose-a:text-earth-green prose-blockquote:border-earth-brown prose-img:rounded-2xl prose-img:shadow-lg max-w-none">
                    <p className="text-xl leading-relaxed mb-10 text-gray-700 font-medium border-l-4 border-earth-green pl-6">
                        {post.excerpt}
                    </p>

                    <div
                        dangerouslySetInnerHTML={{
                            __html: post.content.replace(/\n/g, "<br />"),
                        }}
                    />
                </article>

                {/* Comunidad y compartir */}
                <div className="mt-20 pt-12 border-t border-earth-beige/60 text-center">
                    <h2 className="text-3xl font-black text-earth-dark mb-6">
                        ¿Qué te ha parecido?
                    </h2>
                    <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                        Comparte tu experiencia similar, recomienda un proveedor o envíanos fotos / tracks para futuras publicaciones.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <a
                            href={`mailto:comunidad@gravel-emporda.com?subject=Comentario%20sobre:%20${encodeURIComponent(post.title)}`}
                            className="bg-earth-brown hover:bg-earth-brown text-black font-bold px-10 py-4 rounded-xl transition shadow-md hover:shadow-lg"
                        >
                            Enviar comentario o aportación
                        </a>
                        <Link
                            to="/blog"
                            className="border-2 border-earth-brown text-earth-dark hover:bg-earth-beige/50 font-bold px-10 py-4 rounded-xl transition"
                        >
                            ← Volver al blog
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}