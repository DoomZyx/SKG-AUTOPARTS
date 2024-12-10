import Logo from "../../components/Homepage-components/Logo/Logo.jsx";
import Header from "../../components/Homepage-components/Header-fix/Header.jsx";
import Nav from "../../components/Homepage-components/Nav/Nav.jsx";
import Footer from "../../components/Homepage-components/Footer/Footer.jsx";
import { useEffect } from "react";
import initScrollSnap from "../../ScrollSnap/ScrollSnap.js";
import { removeScrollSnap } from "../../ScrollSnap/ScrollSnap.js";

function HomePage() {
  useEffect(() => {
    // Active ScrollSnap pour la Homepage
    initScrollSnap();

    // Supprime ScrollSnap lors du démontage (lorsqu’on quitte la page)
    return () => {
      removeScrollSnap(); // Supprime les écouteurs d'événements
      document.body.classList.remove("scroll-snap-active"); // Supprime la classe CSS
    };
  }, []);
  return (
    <div className="homepage-body">
      <Header />
      <main>
        <Logo />
        <Nav />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
