const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    category: "rooms",
    caption: "Hill View Suite",
  },
  {
    src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    category: "rooms",
    caption: "Garden Pavilion",
  },
  {
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    category: "rooms",
    caption: "Terracotta Loft",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    category: "dining",
    caption: "The Keep Restaurant",
  },
  {
    src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    category: "dining",
    caption: "Cocktail Bar",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    category: "dining",
    caption: "Farm Breakfast",
  },
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    category: "experiences",
    caption: "The Sanctuary Spa",
  },
  {
    src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
    category: "experiences",
    caption: "Rooftop Terrace",
  },
  {
    src: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=80",
    category: "experiences",
    caption: "Cultural Performance",
  },
  {
    src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
    category: "kampala",
    caption: "Kampala Skyline",
  },
  {
    src: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80",
    category: "kampala",
    caption: "Local Market",
  },
  {
    src: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80",
    category: "kampala",
    caption: "Ugandan Sunset",
  },
  {
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    category: "rooms",
    caption: "Bathroom Detail",
  },
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    category: "rooms",
    caption: "Room Service",
  },
  {
    src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
    category: "dining",
    caption: "Dessert Presentation",
  },
];

let currentImageIndex = 0;
let filteredImages = [...galleryImages];

function renderGallery(filter = "all") {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = "";

  filteredImages =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  filteredImages.forEach((img, idx) => {
    const div = document.createElement("div");
    div.className = "gallery-item rounded-sm";
    div.innerHTML = `
              <img src="${img.src}" alt="${img.caption}" loading="lazy">
              <div class="gallery-overlay">
                  <div class="text-center text-cream">
                      <p class="font-serif text-xl mb-2">${img.caption}</p>
                      <p class="text-xs tracking-widest uppercase">View</p>
                  </div>
              </div>
          `;
    div.onclick = () => openLightbox(idx);
    grid.appendChild(div);
  });

  gsap.from(".gallery-item", {
    opacity: 0,
    y: 50,
    duration: 0.6,
    stagger: 0.1,
  });
}

function openLightbox(index) {
  currentImageIndex = index;
  updateLightbox();
  document.getElementById("lightbox").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
  document.body.style.overflow = "";
}

function changeImage(dir) {
  currentImageIndex += dir;
  if (currentImageIndex < 0) currentImageIndex = filteredImages.length - 1;
  if (currentImageIndex >= filteredImages.length) currentImageIndex = 0;
  updateLightbox();
}

function updateLightbox() {
  const img = filteredImages[currentImageIndex];
  document.getElementById("lightboxImg").src = img.src;
  document.getElementById("lightboxCaption").textContent = img.caption;
  document.getElementById("lightboxCounter").textContent =
    `${currentImageIndex + 1} / ${filteredImages.length}`;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") changeImage(-1);
  if (e.key === "ArrowRight") changeImage(1);
});

// Filter buttons
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderGallery(btn.dataset.filter);
  });
});

// Initial render (called after loader completes via initAnimations)
function initAnimations() {
  renderGallery();
}

// Setup cursor hover targets
setupCursorHover("a, button, .gallery-item");
