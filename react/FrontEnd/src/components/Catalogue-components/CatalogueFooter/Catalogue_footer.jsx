import "./_Catalogue_footer.scss";
import { Link } from "react-router-dom";
import FacebookLogo from "../../../assets/Facebook-logo.png";
import InstagramLogo from "../../../assets/Instagram-logo.webp";

function CatalogueFooter() {
  return (
    <footer>
      <div className="footer-cat">
        <div className="footer-content-cat">
          <div className="footerCat-b1">
            <div className="who-we-are">
              <h2>
                <Link to="/"> Qui sommes-nous ? </Link>
              </h2>
            </div>

            <div className="Contact-cat">
              <h2>
                <Link to="*"> Contact </Link>
              </h2>
            </div>

            <div className="mode-livraison-cat">
              <h2>
                <Link to="*"> Modes de livraison </Link>
              </h2>
            </div>

            <div className="payin-mode-cat">
              <h2>
                <Link to="*"> Modes de paiements </Link>
              </h2>
            </div>
          </div>

          <div className="footerCat-b2">
            <div className="mention-legales-cat">
              <h2>
                <Link to="*">Mention légales </Link>
              </h2>
            </div>

            <div className="CGV-cat">
              <h2>
                <Link to="*">Conditions générales de vente </Link>
              </h2>
            </div>

            <div className="politique-cat">
              <h2>
                <Link to="*">Politique de confidentialité </Link>
              </h2>
            </div>

            <div className="retour-cat">
              <h2>
                <Link to="*">Retour</Link>
              </h2>
            </div>
          </div>

          <div className="footerCat-b3">
            <div className="adress-content-cat">
              <h2> Adresse </h2>
              <h3> 119 av Général de Gaulle </h3>
              <h4> 54700, Chauroux </h4>
            </div>

            <div className="phone-content-cat">
              <h2> Téléphone </h2>
              <h3> 07 54 11 58 96 </h3>
            </div>

            <div className="mail-content-cat">
              <h2> Adresse-mail </h2>
              <a href="mailto:VwAutoParts@gmail.com"> VwAutoParts@gmail.com </a>
            </div>
          </div>
        </div>

        <div className="follow-cat">
          <div className="image-footer-container">
            <img
              className="facebook-logo-cat"
              src={FacebookLogo}
              alt="Logo Facebook"
            />
            <img
              className="instagram-logo-cat"
              src={InstagramLogo}
              alt="Logo Instagram"
            />
          </div>
        </div>
        <div className="copyright-cat">
          <p>&copy; 2024 SKG AUTOPARTS - Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
export default CatalogueFooter;
