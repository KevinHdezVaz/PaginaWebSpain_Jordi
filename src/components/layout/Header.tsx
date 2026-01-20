import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { path: "/", label: "Inicio" },
        { path: "/routes", label: "Rutas" },
        { path: "/packages", label: "Paquetes" },
        { path: "/blog", label: "Blog" },
        { path: "/about", label: "Sobre Nosotros" },
        { path: "/contact", label: "Contacto" },
        { path: "/configurator", label: "Configuración" },
    ];

    const location = useLocation();

    return (
        <header className="bg-[#F5F0E6] text-earth-dark shadow-2xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-5 bg-[#F5F0E6]">  {/* Fondo sólido repetido por seguridad */}
                <div className="flex justify-between items-center">
                    {/* Logo + Nombre */}
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-earth-brown rounded-full flex items-center justify-center text-white text-xl font-bold">
                            GE
                        </div>
                        <span className="text-2xl font-bold tracking-tight hidden sm:block">
                            Gravel Empordà 360º
                        </span>
                        <span className="text-2xl font-bold tracking-tight sm:hidden">
                            GE 360º
                        </span>
                    </Link>

                    {/* Menú Desktop */}
                    <nav className="hidden lg:flex space-x-10">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`font-medium transition-colors duration-300 relative group py-2 ${isActive ? "text-earth-brown font-bold" : "text-earth-dark hover:text-earth-green"
                                        }`}
                                >
                                    {item.label}
                                    <span
                                        className={`absolute left-0 right-0 bottom-0 h-0.5 bg-earth-brown transition-transform duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 bg-earth-green"
                                            }`}
                                    ></span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Selector de idioma + Menú móvil */}
                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher />

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden text-earth-dark focus:outline-none"
                            aria-label="Abrir menú"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Menú móvil - también 100% sólido */}
                {isMobileMenuOpen && (
                    <nav className="lg:hidden mt-6 pb-4 border-t border-earth-brown/40 bg-[#F5F0E6]">
                        <div className="flex flex-col space-y-4 mt-4">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`text-lg font-medium transition-colors py-2 ${isActive ? "text-earth-brown font-bold pl-2 border-l-4 border-earth-brown" : "text-earth-dark hover:text-earth-green"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}