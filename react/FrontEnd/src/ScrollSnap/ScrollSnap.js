export const initScrollSnap = () => {
  const sections = document.querySelectorAll("section");
  const viewportHeight = window.innerHeight;
  let isScrolling = false; // Empêche les multiples scrolls simultanés
  let lastScrollTime = Date.now();

  // Lazy-loading
  document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll("img[loading='lazy']");
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
    });
  });

  // Préchargement des images suivantes
  const preloadImages = () => {
    sections.forEach((section) => {
      const imgs = section.querySelectorAll("img[data-src]");
      imgs.forEach((img) => {
        const image = new Image();
        image.src = img.dataset.src;
        img.src = image.src;
      });
    });
  };

  // Gestion du défilement
  const handleScroll = (event) => {
    const now = Date.now();

    requestAnimationFrame(() => {
      const threshold = 10;
      if (Math.abs(event.deltaY) < threshold) return;

    isScrolling = true;

    // Détecte la direction du défilement
    const direction = event.deltaY > 0 ? 1 : -1;

    // Position actuelle du scroll
    const currentScroll = window.scrollY;

    // Calcule la position cible
    const targetScroll = currentScroll + direction * viewportHeight;

    // Défilement fluide vers la position cible
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });

    // Met à jour l'heure du dernier scroll et relâche le blocage
    lastScrollTime = now;
    setTimeout(() => {
      isScrolling = false;
    }, 1); // Délai pour éviter les scrolls successifs
  });
  }

  // Ajoute l'événement de détection du scroll
  document.addEventListener("wheel", handleScroll, { passive: false });
};

export default initScrollSnap;
