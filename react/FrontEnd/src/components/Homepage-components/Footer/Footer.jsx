import "./_Footer.scss";
import { Link } from "react-router-dom";
import Footerimg from "../../../assets/footer-pic.jpg";
import { useEffect } from "react";
import initScrollSnap from "../../../ScrollSnap/ScrollSnap";
import FacebookLogo from "../../../assets/Facebook-logo.png";
import InstagramLogo from "../../../assets/Instagram-logo.webp";

function Footer() {
  useEffect(() => {
    initScrollSnap(); // Initialise les animations au montage
  }, []);

  return (
    <footer>
      <section id="section-3" className="ST3">
        <img src={Footerimg} alt="Mécanique" loading="lazy"></img>

        <div className="footer-content">
          <h1 className="logo"> SKG AUTOPARTS</h1>

          <div className="footer-b1">
            <div className="who-we-are">
              <h2>
                <Link to="/"> Qui sommes-nous ? </Link>
              </h2>
            </div>

            <div className="Contact">
              <h2>
                <Link to="*"> Contact </Link>
              </h2>
            </div>

            <div className="mode-livraison">
              <h2>
                <Link to="*"> Modes de livraison </Link>
              </h2>
            </div>

            <div className="payin-mode">
              <h2>
                <Link to="*"> Modes de paiements </Link>
              </h2>
            </div>
          </div>

          <div className="footer-b2">
            <div className="mention-legales">
              <h2>
                <Link to="*">Mention légales </Link>
              </h2>
            </div>

            <div className="CGV">
              <h2>
                <Link to="*">Conditions générales de vente </Link>
              </h2>
            </div>

            <div className="politique-c">
              <h2>
                <Link to="*">Politique de confidentialité </Link>
              </h2>
            </div>

            <div className="retour">
              <h2>
                <Link to="*">Retour</Link>
              </h2>
            </div>
          </div>

          <div className="footer-b3">
            <div className="adress-content">
              <h2> Adresse </h2>
              <h3> 119 av Général de Gaulle </h3>
              <h4> 54700, Chauroux </h4>
            </div>

            <div className="phone-content">
              <h2> Téléphone </h2>
              <h3> 07 54 11 58 96 </h3>
            </div>

            <div className="mail-content">
              <h2> Adresse-mail </h2>
              <a href="mailto:VwAutoParts@gmail.com"> VwAutoParts@gmail.com </a>
            </div>
          </div>

          <div className="follow">
            <div className="image-footer-container">
              <img
                className="facebook-logo"
                src={FacebookLogo}
                alt="Logo Facebook"
              />
              <img
                className="instagram-logo"
                src={InstagramLogo}
                alt="Logo Instagram"
              />
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2024 SKG AUTOPARTS - Tous droits réservés.</p>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
