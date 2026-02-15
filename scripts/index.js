function initAnimations() {
  // Hero Animations
  gsap.to("#heroSubtitle", { opacity: 1, y: 0, duration: 1, delay: 0.2 });
  gsap.to("#heroTitle", { opacity: 1, duration: 1.5, delay: 0.5 });
  gsap.to("#heroDesc", { opacity: 1, y: 0, duration: 1, delay: 0.8 });
  gsap.to("#heroCTA", { opacity: 1, y: 0, duration: 1, delay: 1.1 });
  gsap.to("#scrollIndicator", { opacity: 1, duration: 1, delay: 1.4 });

  // Hero Parallax
  gsap.to("#heroImage", {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    y: 200,
    scale: 1.2,
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

  // Stats Counter Animation
  gsap.utils.toArray(".reveal-stat").forEach((stat, i) => {
    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.2,
    });
  });

  // Image Reveals
  gsap.utils.toArray(".img-reveal").forEach((img) => {
    ScrollTrigger.create({
      trigger: img,
      start: "top 80%",
      onEnter: () => img.classList.add("revealed"),
    });
  });

  // Room Cards Stagger
  gsap.from(".room-card", {
    scrollTrigger: {
      trigger: "#rooms",
      start: "top 70%",
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  });

  // Experience Cards
  gsap.from(".experience-card", {
    scrollTrigger: {
      trigger: "#experience",
      start: "top 70%",
    },
    y: 80,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
  });
}

// Smooth Scroll to Booking
function scrollToBooking() {
  document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
}

// Gallery Slider
const track = document.querySelector(".gallery-track");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
let currentSlide = 0;
const totalSlides = 4;

function updateSlider() {
  const slideWidth =
    window.innerWidth >= 1024 ? 33.333 : window.innerWidth >= 768 ? 50 : 100;
  track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
}

nextBtn.addEventListener("click", () => {
  currentSlide =
    (currentSlide + 1) %
    (totalSlides -
      (window.innerWidth >= 1024 ? 2 : window.innerWidth >= 768 ? 1 : 0));
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  currentSlide = currentSlide > 0 ? currentSlide - 1 : 0;
  updateSlider();
});

// Booking Form - WhatsApp redirect
document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll("input[type='date']");
  const selects = form.querySelectorAll("select");
  const textarea = form.querySelector("textarea");

  const checkIn = inputs[0]?.value || "Not specified";
  const checkOut = inputs[1]?.value || "Not specified";
  const guests = selects[0]?.value || "Not specified";
  const roomType = selects[1]?.value || "Not specified";
  const specialRequests = textarea?.value?.trim();

  let message = "Hello! I'd like to check availability at The Red Keep.\n\n";
  message += `*Room:* ${roomType}\n`;
  message += `*Check-in:* ${checkIn}\n`;
  message += `*Check-out:* ${checkOut}\n`;
  message += `*Guests:* ${guests}\n`;
  if (specialRequests) {
    message += `\n*Special Requests:*\n${specialRequests}\n`;
  }
  message += "\nLooking forward to your response!";

  const phone = "256703755919";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});

// Magnetic Button Effect
document.querySelectorAll(".magnetic-btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
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

// Setup cursor hover targets
setupCursorHover("a, button, .room-card, .experience-card");
