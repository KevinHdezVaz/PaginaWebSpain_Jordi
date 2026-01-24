import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";

// Importamos las páginas (las crearemos en un momento)
import Home from "./pages/Home";
import RoutesPage from "./pages/Routes";
import Packages from "./pages/Packages";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Configurator from "./pages/Configurator";
import BlogDetail from "./pages/BlogDetail";
import RouteDetail from "./pages/RouteDetail";

// Páginas Legales
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsConditions from "./pages/legal/TermsConditions";
import RefundPolicy from "./pages/legal/RefundPolicy";

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/routes" element={<RoutesPage />} />
                        <Route path="/packages" element={<Packages />} />

                        <Route path="/blog" element={<Blog />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/configurator" element={<Configurator />} />
                        <Route path="/blog/:id" element={<BlogDetail />} />
                        <Route path="/routes/:id" element={<RouteDetail />} />

                        {/* Rutas Legales */}
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<TermsConditions />} />
                        <Route path="/refund" element={<RefundPolicy />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;