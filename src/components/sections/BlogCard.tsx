import { Link } from "react-router-dom";

type BlogPost = {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    author?: string;
    image: string;
    category: string;
};

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <div className="group relative bg-earth-beige/30 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4 flex flex-col h-full border-2 border-earth-brown/20">
            {/* Imagen */}
            <div className="h-72 overflow-hidden relative">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-1000 ease-out"
                />
                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-earth-dark/60 via-transparent to-transparent opacity-70"></div>

                {/* Categoría - Fondo café sólido */}
                <div className="absolute top-6 left-6 bg-[rgb(139,111,71)] text-white px-6 py-3 rounded-full text-sm font-black shadow-xl flex items-center gap-2">
                    {post.category}
                </div>
            </div>

            {/* Contenido */}
            <div className="p-10 flex-1 flex flex-col">
                {/* Fecha y autor */}
                <div className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                    <span className="font-medium">{post.date}</span>
                    <span>•</span>
                    <span>por {post.author || "Gravel Empordà"}</span>
                </div>

                {/* Título */}
                <h3 className="text-3xl font-black text-earth-dark mb-6 group-hover:text-earth-brown transition-colors leading-tight line-clamp-2">
                    {post.title}
                </h3>

                {/* Extracto */}
                <p className="text-base text-gray-700 mb-8 flex-1 leading-relaxed line-clamp-4">
                    {post.excerpt}
                </p>

                {/* Leer más - Color café sólido */}
                <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-3 text-[rgb(139,111,71)] hover:text-earth-green font-black text-lg transition-all duration-300 group/link"
                >
                    Leer más
                    <svg className="w-6 h-6 group-hover/link:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            {/* Hover Border */}
            <div className="absolute inset-0 border-4 border-transparent group-hover:border-earth-green rounded-3xl transition-all duration-700 pointer-events-none"></div>
        </div>
    );
}