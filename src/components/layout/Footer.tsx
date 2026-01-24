import { Link } from "react-router-dom";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { label: "Inicio", path: "/" },
        { label: "Rutas", path: "/routes" },
        { label: "Paquetes", path: "/packages" },
        { label: "Blog", path: "/blog" },
        { label: "Sobre Nosotros", path: "/about" },
        { label: "Contacto", path: "/contact" },
        { label: "Configuración", path: "/configurator" },
    ];

    return (
        <footer className="bg-[#5D4037] text-white mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-5 gap-12">
                    {/* Logo y descripción */}
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                                GE
                            </div>
                            <span className="text-2xl font-bold">Gravel Empordà 360º</span>
                        </div>
                        <p className="text-earth-light leading-relaxed opacity-90">
                            Rudtas cicloturistas premium en el corazón del Empordà. Experiencias únicas combinando gravel, cultura y gastronomía.
                        </p>
                    </div>

                    {/* Enlaces rápidos */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-white">Enlaces rápidos</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path} className="hover:text-earth-green transition-colors block opacity-90 hover:opacity-100">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-white">Contacto</h3>
                        <ul className="space-y-6 opacity-90">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span>+34 600 123 456</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <a href="mailto:info@gravelemporda360.com" className="hover:text-earth-green">
                                    info@gravelemporda360.com
                                </a>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span>Baix Empordà, Girona, Catalunya</span>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-white">Legal</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/privacy" className="hover:text-earth-green transition-colors block opacity-90 hover:opacity-100">
                                    Política de Privacidad
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="hover:text-earth-green transition-colors block opacity-90 hover:opacity-100">
                                    Términos y Condiciones
                                </Link>
                            </li>
                            <li>
                                <Link to="/refund" className="hover:text-earth-green transition-colors block opacity-90 hover:opacity-100">
                                    Política de Devolución
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Redes sociales */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-white">Síguenos</h3>
                        <div className="flex space-x-6">
                            <a href="#" className="hover:text-earth-green transition-colors opacity-90 hover:opacity-100">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.667.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.667-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947C23.728 2.69 21.31.272 16.952.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-earth-green transition-colors opacity-90 hover:opacity-100">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.25 4.25 0 00-7.26 3.88A12.08 12.08 0 013.48 4.8a4.25 4.25 0 001.32 5.69 4.24 4.24 0 01-1.93-.53v.05a4.25 4.25 0 003.41 4.17 4.36 4.36 0 01-1.92.07 4.25 4.25 0 003.98 2.95 8.53 8.53 0 01-6.31 1.77 12.02 12.02 0 006.52 1.91c7.83 0 12.12-6.49 12.12-12.12 0-.19-.01-.37-.02-.56A8.67 8.67 0 0024 5.58a8.38 8.38 0 01-2.54.7z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-earth-green transition-colors opacity-90 hover:opacity-100">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M15.387 2L24 18.5h-5.6l-2.8-7.1L12.8 18.5H7.2L15.387 2zM0 18.5l4.2-10.3L8.4 18.5H0z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/30 mt-12 pt-8 text-center text-earth-light">
                    <p>© {currentYear} Gravel Empordà 360º - Todos los derechos reservados</p>
                </div>
            </div>
        </footer>
    );
}