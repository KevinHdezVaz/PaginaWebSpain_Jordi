import { Link } from "react-router-dom";

type Package = {
    id: number;
    name: string;
    days: number;
    nights: number;
    price: string;
    image: string | null;
    description: string | null;
    highlights: string[];
    pdf?: string | null;
    isPopular?: boolean;
};

export default function PackageCard({ pkg, onSelect }: { pkg: Package; onSelect?: (pkg: Package) => void }) {
    // Imagen: ya viene completa desde la API
    const hasImage = !!pkg.image?.trim();
    const imageSrc = hasImage ? pkg.image! : "";

    // PDF: mismo caso
    const pdfSrc = pkg.pdf ? pkg.pdf : null;

    // Highlights: limpiamos y separamos por líneas
    const allHighlights = pkg.highlights
        .flatMap((item) =>
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

    const handleButtonClick = (e: React.MouseEvent) => {
        if (onSelect) {
            e.stopPropagation();
            onSelect(pkg);
        }
    };

    return (
        <div className="group relative bg-earth-beige/30 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full border-2 border-earth-beige/50 cursor-pointer">
            {/* Popular Badge */}
            {pkg.isPopular && (
                <div className="absolute top-6 left-6 z-20 bg-gradient-to-r from-earth-green to-green-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Más Popular
                </div>
            )}

            {/* Imagen o placeholder */}
            <div className="h-72 overflow-hidden relative">
                {hasImage ? (
                    <img
                        src={imageSrc}
                        alt={pkg.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const placeholder = e.currentTarget.nextElementSibling as HTMLElement | null;
                            if (placeholder) placeholder.style.display = "flex";
                        }}
                    />
                ) : null}

                <div
                    className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-earth-beige/40 to-earth-beige/70 text-earth-dark/70"
                    style={{ display: hasImage ? "none" : "flex" }}
                >
                    <svg
                        className="w-24 h-24 mb-4 opacity-80"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 15l4-4 4 4 8-8M3 21h18"
                        />
                        <circle cx="16" cy="8" r="2" />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 4v16"
                        />
                    </svg>
                    <span className="text-lg font-medium tracking-wide">Sin fotografía</span>
                    <span className="text-sm mt-1 opacity-80">{pkg.name}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-earth-dark/70 via-earth-dark/30 to-transparent pointer-events-none"></div>

                {/* Badge de precio */}
                <div className="absolute bottom-6 right-6 bg-earth-beige/95 backdrop-blur-sm text-earth-dark px-6 py-4 rounded-2xl shadow-2xl border border-earth-brown/20">
                    <div className="text-sm text-gray-600 font-medium">Desde</div>
                    <div className="text-3xl font-bold text-earth-brown">
                        {pkg.price.includes("€") ? pkg.price : `${pkg.price} €`}
                    </div>
                    <div className="text-xs text-gray-500">por persona</div>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-3xl font-bold text-earth-dark mb-4 group-hover:text-earth-brown transition-colors">
                    {pkg.name}
                </h3>

                {/* Duración */}
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

                {/* Botón único: Ver detalles y cotizar */}
                <button
                    onClick={handleButtonClick}
                    className="w-full text-center bg-gradient-to-r from-earth-brown to-earth-green hover:from-earth-dark hover:to-earth-brown text-white font-black text-lg py-5 rounded-2xl transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 duration-300 flex items-center justify-center gap-3 mt-auto"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    Ver detalles y cotizar
                </button>
            </div>

            <div className="absolute inset-0 border-4 border-transparent group-hover:border-earth-green rounded-3xl transition-all duration-500 pointer-events-none"></div>
        </div>
    );
}