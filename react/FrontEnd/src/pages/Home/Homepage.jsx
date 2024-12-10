import Logo from "../../components/Homepage-components/Logo/Logo.jsx";
import Header from "../../components/Homepage-components/Header-fix/Header.jsx";
import Nav from "../../components/Homepage-components/Nav/Nav.jsx";
import Footer from "../../components/Homepage-components/Footer/Footer.jsx";
import { useEffect } from "react";

function HomePage() {
  useEffect(() => {

    document.body.style.overflow = "hidden";

    return () => {

      document.body.style.overflow = "auto";
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
