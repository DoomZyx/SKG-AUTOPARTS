import { Link } from "react-router-dom";
import "./_Nav.scss";
import navImg from "../../../assets/Nav_photo.jpg";
import "../../../ScrollSnap/_ScrollSnap.scss";

function Nav() {

  return (
    <section id="section-2" className="ST2">
      <img src={navImg} alt="Nissan GTR" loading="lazy" />
      <div className="About-links">
        <Link to="About">A propos</Link>
      </div>
      <div className="Parts-links">
        <Link to="/Catalogue">Catalogue</Link>
      </div>
    </section>
  );
}

export default Nav;
