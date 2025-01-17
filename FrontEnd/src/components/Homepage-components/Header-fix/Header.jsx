import "./_Header.scss";

const Header = () => {
  const handleNavigation = (e, sectionId) => {
    e.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // Défilement fluide
    }
  };

  return (
    <header className="fixed-header">
      <div className="headerfix-container">
        <ul>
          <li>
            <a
              href="#section-1"
              onClick={(e) => handleNavigation(e, "#section-1")}
            >
              Section 1
            </a>
          </li>
          <li>
            <a
              href="#section-2"
              onClick={(e) => handleNavigation(e, "#section-2")}
            >
              Section 2
            </a>
          </li>
          <li>
            <a
              href="#section-3"
              onClick={(e) => handleNavigation(e, "#section-3")}
            >
              Section 3
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
