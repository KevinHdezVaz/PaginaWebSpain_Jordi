import { Link } from "react-router-dom";

type BlogPost = {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    author?: string;
    image: string | null;
    category: string;
    slug?: string; // opcional, para URLs limpias en el futuro
};

interface BlogCardProps {
    post: BlogPost;
    featured?: boolean; // para el post destacado (más grande)
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
    const cardClasses = featured
        ? "md:col-span-2 lg:col-span-1 group relative bg-earth-beige/40 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 flex flex-col h-full border-2 border-earth-brown/30"
        : "group relative bg-earth-beige/30 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full border border-earth-brown/20";

    const imageHeight = featured ? "h-80 md:h-96" : "h-64 md:h-72";

    return (
        <div className={cardClasses}>
            {/* Imagen con overlay */}
            <div className={`relative overflow-hidden ${imageHeight}`}>
                <img
                    src={post.image || "/placeholder-gravel.jpg"} // fallback importante
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-dark/70 via-transparent to-transparent opacity-80" />

                {/* Categoría badge */}
                <div className="absolute top-5 left-5 bg-[rgb(139,111,71)] text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 z-10">
                    {post.category}
                </div>
            </div>

            {/* Contenido */}
            <div className="p-8 md:p-10 flex-1 flex flex-col">
                {/* Meta info */}
                <div className="text-sm text-gray-600 mb-5 flex items-center gap-3 flex-wrap">
                    <time dateTime={post.date}>{post.date}</time>
                    <span>•</span>
                    <span className="font-medium">{post.author || "Gravel Empordà Team"}</span>
                </div>

                {/* Título */}
                <h3
                    className={`${featured ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
                        } font-black text-earth-dark mb-5 group-hover:text-[rgb(139,111,71)] transition-colors leading-tight line-clamp-3`}
                >
                    {post.title}
                </h3>

                {/* Extracto */}
                <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed line-clamp-4 flex-1">
                    {post.excerpt}
                </p>

                {/* Leer más */}
                <Link
                    to={`/blog/${post.id}`}   // ← siempre usa id numérico
                    className="inline-flex items-center gap-3 text-[rgb(139,111,71)] hover:text-earth-green font-black text-lg mt-auto transition-all duration-300 group/link"
                    aria-label={`Leer más sobre ${post.title}`}
                >
                    Leer más
                    <svg
                        className="w-6 h-6 group-hover/link:translate-x-3 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            {/* Hover effect border */}
            <div className="absolute inset-0 border-4 border-transparent group-hover:border-earth-green/60 rounded-3xl transition-all duration-700 pointer-events-none" />
        </div>
    );
}