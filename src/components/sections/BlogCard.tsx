import { Link } from "react-router-dom";

type BlogPost = {
    id: number;
    title: string;
    excerpt: string;
    date: string;          // ej: "15 Enero 2026"
    author: string;
    image: string;
    category: string;      // ej: "Experiencias", "Gastronomía", "Consejos"
};

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
            <div className="h-64 overflow-hidden relative">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                {/* Etiqueta de categoría */}
                <div className="absolute top-4 left-4 bg-earth-brown text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {post.category}
                </div>
            </div>

            <div className="p-8">
                <div className="text-sm text-gray-500 mb-3">
                    <span>{post.date}</span> • <span>por {post.author}</span>
                </div>

                <h3 className="text-2xl font-bold text-earth-dark mb-4 line-clamp-2">
                    {post.title}
                </h3>

                <p className="text-gray-700 mb-6 line-clamp-3">
                    {post.excerpt}
                </p>

                <Link
                    to={`/blog/${post.id}`}  // Futura página de post individual
                    className="inline-block text-earth-brown hover:text-earth-green font-bold transition-colors duration-200"
                >
                    Leer más →
                </Link>
            </div>
        </div>
    );
}