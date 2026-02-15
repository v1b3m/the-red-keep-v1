function initAnimations() {
  // Hero Animations
  gsap.to("#heroSubtitle", { opacity: 1, y: 0, duration: 1, delay: 0.2 });
  gsap.to("#heroTitle", { opacity: 1, duration: 1.5, delay: 0.5 });
  gsap.to("#heroDesc", { opacity: 1, y: 0, duration: 1, delay: 0.8 });

  // Hero Parallax
  gsap.to("#heroImage", {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    y: 100,
    scale: 1.1,
  });

  // Text Reveals
  gsap.utils.toArray(".reveal-text").forEach((text) => {
    gsap.from(text, {
      scrollTrigger: {
        trigger: text,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  });

  // Scroll Progress
  gsap.to("#scrollProgress", {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
    },
    scaleX: 1,
    ease: "none",
  });
}

// Menu Category Switching
const menuTabs = document.querySelectorAll(".menu-tab");
const menuSections = document.querySelectorAll(".menu-section");

menuTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const category = tab.dataset.category;

    // Update active tab
    menuTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    // Switch sections with animation
    menuSections.forEach((section) => {
      if (section.id === category) {
        section.style.display = "block";
        setTimeout(() => {
          section.classList.add("active");
        }, 50);
      } else {
        section.classList.remove("active");
        setTimeout(() => {
          if (!section.classList.contains("active")) {
            section.style.display = "none";
          }
        }, 600);
      }
    });

    // Scroll to menu content on mobile
    if (window.innerWidth < 768) {
      document
        .querySelector(".sticky-nav")
        .scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (menuOpen) toggleMobileMenu();
    }
  });
});

// Price Hover Effect Enhancement
document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const price = item.querySelector(".item-price");
    if (price) price.classList.add("price-highlight");
  });
  item.addEventListener("mouseleave", () => {
    const price = item.querySelector(".item-price");
    if (price) price.classList.remove("price-highlight");
  });
});

// Setup cursor hover targets
setupCursorHover("a, button, .menu-item, .cocktail-card");
