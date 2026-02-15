// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Loading Screen
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  gsap.to(loader, {
    opacity: 0,
    duration: 1,
    delay: 0.5,
    onComplete: () => {
      loader.style.display = "none";
      if (typeof initAnimations === "function") {
        initAnimations();
      }
    },
  });
});

// Navigation Scroll Effect
let lastScroll = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.remove("nav-hidden");
    navbar.classList.add("nav-visible");
  } else {
    navbar.classList.add("nav-hidden");
    navbar.classList.remove("nav-visible");
  }

  lastScroll = currentScroll;
});

// Custom Cursor
const cursor = document.getElementById("cursor");
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

if (!isTouchDevice && cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}

function setupCursorHover(selectors) {
  if (!isTouchDevice && cursor) {
    document.querySelectorAll(selectors).forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
  }
}

// Mobile Menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
let menuOpen = false;

function toggleMobileMenu() {
  menuOpen = !menuOpen;
  if (menuOpen) {
    mobileMenu.classList.add("active");
    menuBtn.children[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    menuBtn.children[1].style.transform = "rotate(-45deg) translate(0px, 0px)";
  } else {
    mobileMenu.classList.remove("active");
    menuBtn.children[0].style.transform = "none";
    menuBtn.children[1].style.transform = "none";
  }
}

menuBtn.addEventListener("click", toggleMobileMenu);
