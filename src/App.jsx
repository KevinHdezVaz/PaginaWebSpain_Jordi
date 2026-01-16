import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import RoutesPage from "./pages/Routes";
import Packages from "./pages/Packages";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Configurator from "./pages/Configurator";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">  {/* ← Solo quitamos bg-earth-light */}
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
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;