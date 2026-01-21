import { Link } from "react-router-dom";

type Package = {
    id: number;
    name: string;
    days: number;
    nights: number;
    price: string;
    image: string | null;
    routesIncluded?: number;
    highlights: string[];
    description: string | null;
    pdf?: string | null;
    isPopular?: boolean;
};

export default function PackageCard({ pkg }: { pkg: Package }) {
    // RUTAS CORRECTAS PARA ARCHIVOS ESTÁTICOS (Laravel estándar con storage público)
    const imageSrc = pkg.image ? `/storage/${pkg.image}` : "/placeholder.jpg";

    // PDF: usamos el que viene del API o fallback al que existe en la DB para el paquete popular
    const rawPdfPath = pkg.pdf || (pkg.isPopular ? "packages/pdfs/VoQxTmG2omlxRny4LILWJz5a76zSzIAJQiuXZznI.pdf" : null);
    const pdfSrc = rawPdfPath ? `/storage/${rawPdfPath}` : null;

    // Highlights: manejamos casos donde viene como array con strings que tienen saltos de línea o unicode escapado
    const allHighlights = pkg.highlights
        .flatMap((item) =>
            // Reemplazamos unicode escapado común (ej: \u00f3 → ó) y dividimos por saltos de línea
            item
                .replace(/\\u00f3/g, "ó")
                .replace(/\\u00e1/g, "á")
                .replace(/\\u00e9/g, "é")
                .replace(/\\u00ed/g, "í")
                .replace(/\\u00fa/g, "ú")
                .split(/\\r\\n|\\r|\\n|\r\n|\n|\r/)
        )
        .map((line) => line.trim())
        .filter((line) => line !== "");

    return (
        <div className="group relative bg-earth-beige/30 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full border-2 border-earth-beige/50">
            {/* Popular Badge */}
            {pkg.isPopular && (
                <div className="absolute top-6 left-6 z-20 bg-gradient-to-r from-earth-green to-green-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Más Popular
                </div>
            )}

            {/* Image Section */}
            <div className="h-72 overflow-hidden relative">
                <img
                    src={imageSrc}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                        // Fallback visual si la imagen falla (placeholder)
                        e.currentTarget.src = "/placeholder.jpg";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-dark/70 via-earth-dark/30 to-transparent"></div>

                {/* Price Badge */}
                <div className="absolute bottom-6 right-6 bg-earth-beige/95 backdrop-blur-sm text-earth-dark px-6 py-4 rounded-2xl shadow-2xl border border-earth-brown/20">
                    <div className="text-sm text-gray-600 font-medium">Desde</div>
                    <div className="text-3xl font-bold text-earth-brown">{pkg.price}</div>
                    <div className="text-xs text-gray-500">por persona</div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-3xl font-bold text-earth-dark mb-4 group-hover:text-earth-brown transition-colors">
                    {pkg.name}
                </h3>

                {/* Duration */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-earth-brown/20">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-earth-green/20 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-earth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-earth-dark">{pkg.days}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Días</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-earth-brown/20 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-earth-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-earth-dark">{pkg.nights}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Noches</div>
                        </div>
                    </div>
                </div>

                <p className="text-gray-700 mb-6 flex-1 leading-relaxed">
                    {pkg.description || "Experiencia gravel todo incluido en el corazón del Empordà."}
                </p>

                {/* Highlights */}
                <div className="mb-8">
                    <p className="font-bold text-earth-dark mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-earth-green" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Incluye:
                    </p>
                    <ul className="space-y-3">
                        {allHighlights.length > 0 ? (
                            allHighlights.map((item, index) => (
                                <li key={index} className="flex items-start text-gray-700">
                                    <svg className="w-5 h-5 text-earth-green mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm">{item}</span>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500 italic text-sm">Detalles próximamente</li>
                        )}
                    </ul>
                </div>

                {/* Botones */}
                <div className="flex flex-col gap-3 mt-auto">
                    <Link
                        to="/contact"
                        className="w-full text-center bg-[rgb(139,111,71)] hover:bg-[rgb(120,95,60)] text-white font-black text-lg py-5 rounded-2xl transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 duration-300 flex items-center justify-center gap-3"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        Reservar Ahora
                    </Link>

                    {pdfSrc ? (
                        <a
                            href={pdfSrc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center bg-earth-beige/60 hover:bg-earth-beige text-earth-dark font-bold py-3 rounded-xl transition-all border-2 border-earth-brown/30 hover:border-earth-brown flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Ver / Descargar PDF
                        </a>
                    ) : (
                        <div className="w-full text-center bg-earth-beige/40 text-gray-600 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 border-2 border-earth-beige/60">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            PDF Próximamente
                        </div>
                    )}
                </div>
            </div>

            <div className="absolute inset-0 border-4 border-transparent group-hover:border-earth-green rounded-3xl transition-all duration-500 pointer-events-none"></div>
        </div>
    );
}