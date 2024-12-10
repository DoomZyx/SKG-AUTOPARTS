import Logo from "../../components/Homepage-components/Logo/Logo.jsx";
import Header from "../../components/Homepage-components/Header-fix/Header.jsx";
import Nav from "../../components/Homepage-components/Nav/Nav.jsx";
import Footer from "../../components/Homepage-components/Footer/Footer.jsx";

function HomePage() {
  return (
    <body className="homepage">
      <Header />
      <main>
        <Logo />
        <Nav />
      </main>
      <Footer />
    </body>
  );
}

export default HomePage;
