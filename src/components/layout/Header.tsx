import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import logo from "../../assets/icons/logo1.jpeg";

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
            <div className="max-w-7xl mx-auto px-6 py-5 bg-[#F5F0E6]">
                <div className="flex justify-between items-center">
                    {/* Logo + Nombre */}
                    <Link to="/" className="flex items-center space-x-3">
                        <img src={logo} alt="Gravel Empordà Logo" className="h-12 w-auto rounded-xl" />
                        <span className="text-2xl font-black tracking-tight hidden sm:block">
                            Gravel Empordà <span className="text-earth-brown">360º</span>
                        </span>
                        <span className="text-2xl font-black tracking-tight sm:hidden">
                            GE 360º
                        </span>
                    </Link>

                    {/* Menú Desktop */}
                    <nav className="hidden lg:flex items-center space-x-6">
                        {navItems.map((item) => {
                            const isActive = item.path === "/"
                                ? location.pathname === "/"
                                : location.pathname.startsWith(item.path);

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`relative px-5 py-2.5 text-sm font-black transition-all duration-300 rounded-2xl group ${isActive
                                        ? "text-earth-brown bg-earth-beige shadow-[0_4px_12px_rgba(139,111,71,0.15)] scale-105"
                                        : "text-earth-dark hover:text-earth-brown hover:bg-earth-brown/5"
                                        }`}
                                >
                                    <span className="relative z-10">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Selector de idioma + Menú móvil */}
                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher />

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`lg:hidden w-11 h-11 flex flex-col items-center justify-center rounded-2xl transition-all duration-300 shadow-lg relative ${isMobileMenuOpen ? "bg-[#4A3F35]" : "bg-[#8B6F47]"
                                }`}
                            aria-label="Toggle menu"
                        >
                            <div className="relative w-6 h-5 flex flex-col justify-between">
                                <span
                                    className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2.25" : ""
                                        }`}
                                ></span>
                                <span
                                    className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
                                        }`}
                                ></span>
                                <span
                                    className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2.25" : ""
                                        }`}
                                ></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Menú móvil */}
                {isMobileMenuOpen && (
                    <nav className="lg:hidden mt-6 pb-4 border-t-2 border-earth-brown/10 animate-fade-in">
                        <div className="flex flex-col space-y-3 mt-6">
                            {navItems.map((item) => {
                                const isActive = item.path === "/"
                                    ? location.pathname === "/"
                                    : location.pathname.startsWith(item.path);

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center px-6 py-4 rounded-2xl text-lg font-black transition-all duration-300 ${isActive
                                            ? "bg-earth-beige text-earth-brown shadow-lg scale-[1.02] translate-x-2"
                                            : "text-earth-dark hover:bg-earth-brown/5"
                                            }`}
                                    >
                                        {isActive && (
                                            <span className="w-2 h-2 bg-earth-brown rounded-full mr-3 animate-pulse"></span>
                                        )}
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