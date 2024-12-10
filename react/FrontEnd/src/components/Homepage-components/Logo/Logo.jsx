import "../Logo/_Logo.scss";
import "../../../ScrollSnap/_ScrollSnap.scss";
import ST1PIC from "../../../assets/ST1-PIC.jpg";

function Logo() {

  return (
    <header>
      <section id="section-1" className="ST1">
      <img src={ST1PIC} alt="Garage Automobile Néon" loading="lazy"></img>
      <div className="header-logo">
        <h1>SKG AUTOPARTS</h1>
      </div>
      </section>
    </header>
  );
}

export default Logo;
