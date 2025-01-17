let handleScroll; // Gestionnaire d'événement global

export const initScrollSnap = () => {
  const sections = document.querySelectorAll("section");
  const viewportHeight = window.innerHeight;
  let isScrolling = false;

  handleScroll = (event) => {
    if (isScrolling) return;

    isScrolling = true;
    const direction = event.deltaY > 0 ? 1 : -1;
    const currentScroll = window.scrollY;
    const targetScroll = currentScroll + direction * viewportHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrolling = false;
    }, 500);
  };

  // Ajoute l'événement de scroll
  document.addEventListener("wheel", handleScroll, { passive: false });
};

export const removeScrollSnap = () => {
  // Supprime le gestionnaire de défilement
  if (handleScroll) {
    document.removeEventListener("wheel", handleScroll);
  }
};

export default initScrollSnap;