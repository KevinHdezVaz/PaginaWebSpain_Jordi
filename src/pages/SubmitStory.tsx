// src/components/SubmitStory.tsx
import { useState } from 'react';

interface SubmitStoryProps {
    onSuccess?: () => void;  // Callback para cerrar el modal al éxito
}

export default function SubmitStory({ onSuccess }: SubmitStoryProps) {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Experiencias Gravel',
        author_name: '',
        author_email: '',
    });
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) data.append(key, value as string);
        });
        if (image) data.append('image', image);

        try {
            const response = await fetch('https://spainweb.picklebracket.pro/api/pending-stories', {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || 'Error al enviar la historia');
            }

            setSuccess(
                '¡Gracias! Tu historia ha sido enviada y será revisada por el equipo. Te avisaremos si se publica.'
            );

            // Resetear formulario
            setFormData({
                title: '',
                excerpt: '',
                content: '',
                category: 'Experiencias Gravel',
                author_name: '',
                author_email: '',
            });
            setImage(null);

            // Cerrar modal automáticamente después de 3 segundos (o inmediatamente si prefieres)
            if (onSuccess) {
                setTimeout(onSuccess, 3000); // da tiempo a leer el mensaje de éxito
            }
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error inesperado. Intenta de nuevo más tarde.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-white rounded-2xl p-6 md:p-10 border border-[rgb(139,111,71)]/30 shadow-xl relative">
            <h2 className="text-2xl md:text-3xl font-black text-earth-dark mb-5 text-center">
                Comparte tu aventura en el Empordà
            </h2>
            <p className="text-center text-gray-700 text-base mb-8 max-w-3xl mx-auto">
                Cuéntanos tu experiencia gravel, sube fotos, recomienda un proveedor o comparte un track útil.
                Revisaremos tu envío y, si encaja con la comunidad, lo publicaremos con tu crédito.
            </p>

            {success ? (
                <div className="space-y-6 text-center">
                    <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-xl text-green-800">
                        {success}
                    </div>
                    <button
                        onClick={onSuccess}
                        className="inline-block bg-earth-brown hover:bg-earth-green text-white font-bold px-8 py-3 rounded-xl transition"
                    >
                        Cerrar
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Título (opcional)</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg border border-earth-brown/40 focus:outline-none focus:border-[rgb(139,111,71)] focus:ring-1 focus:ring-[rgb(139,111,71)]/30"
                                placeholder="Ej: Mi ruta secreta por Cadaqués"
                            />
                        </div>


                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Extracto breve (opcional)</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-lg border border-earth-brown/40 focus:outline-none focus:border-[rgb(139,111,71)]"
                            placeholder="Un resumen de tu historia..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Tu historia completa <span className="text-red-600">*</span>
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows={8}
                            required
                            className="w-full px-4 py-2.5 rounded-lg border border-earth-brown/40 focus:outline-none focus:border-[rgb(139,111,71)]"
                            placeholder="Describe tu ruta, sensaciones, recomendaciones, fotos que quieras compartir..."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tu nombre (opcional)</label>
                            <input
                                type="text"
                                name="author_name"
                                value={formData.author_name}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg border border-earth-brown/40 focus:outline-none focus:border-[rgb(139,111,71)]"
                                placeholder="Cómo quieres que aparezca"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                            <input
                                type="email"
                                name="author_email"
                                value={formData.author_email}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg border border-earth-brown/40 focus:outline-none focus:border-[rgb(139,111,71)]"
                                placeholder="Para avisarte si publicamos tu historia"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Foto o imagen (opcional)</label>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border border-earth-brown/40 rounded-lg bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[rgb(139,111,71)] file:text-white hover:file:bg-earth-brown/90"
                        />
                        <p className="text-xs text-gray-500 mt-1.5">Máx. 10MB – JPG, PNG o WebP</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 px-8 rounded-xl text-lg font-black text-white transition-all shadow-md ${loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[rgb(139,111,71)] hover:bg-earth-brown hover:shadow-lg hover:scale-[1.02]'
                            }`}
                    >
                        {loading ? 'Enviando...' : 'Enviar mi historia →'}
                    </button>

                    {error && <p className="text-red-600 text-center mt-4 font-medium">{error}</p>}
                </form>
            )}
        </section>
    );
}