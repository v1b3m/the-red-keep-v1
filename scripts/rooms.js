const roomData = {
  "hill-view": {
    title: "Hill View Suite",
    desc: "Our flagship suite offers panoramic views of Kampala's rolling hills from your private terrace. Features a luxurious king bed, deep soaking tub, and premium finishes throughout. Perfect for romantic getaways or special occasions.",
    size: "45 m²",
    guests: "2 Adults",
    bed: "King Size",
    view: "Valley & Hills",
    price: "$180",
    images: [
      "assets/room-1.jpeg",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    ],
    amenities: [
      "Premium WiFi",
      "Smart TV",
      "Mini Bar",
      "Coffee Machine",
      "Bathtub",
      "Private Terrace",
      "Room Service",
      "Air Conditioning",
      "Safe",
      "Hair Dryer",
    ],
  },
  garden: {
    title: "Garden Pavilion",
    desc: "Immerse yourself in nature with direct access to our lush tropical gardens. This ground-floor pavilion features an outdoor shower, private patio, and queen bed draped in locally woven textiles.",
    size: "38 m²",
    guests: "2 Adults",
    bed: "Queen Size",
    view: "Private Garden",
    price: "$145",
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    ],
    amenities: [
      "Garden Access",
      "Outdoor Shower",
      "WiFi",
      "TV",
      "Mini Bar",
      "Tea/Coffee",
      "Air Conditioning",
      "Safe",
      "Desk",
      "Mosquito Net",
    ],
  },
  loft: {
    title: "Terracotta Loft",
    desc: "Contemporary urban design meets African warmth in our stylish loft. Ideal for business travelers or friends, featuring flexible twin bedding, city views, and a dedicated workspace.",
    size: "35 m²",
    guests: "2 Adults",
    bed: "Twin or King",
    view: "City Skyline",
    price: "$120",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    ],
    amenities: [
      "Work Desk",
      "High-Speed WiFi",
      "TV",
      "Mini Bar",
      "Coffee/Tea",
      "Air Conditioning",
      "Safe",
      "Iron/Board",
      "Hair Dryer",
      "City View",
    ],
  },
};

function initAnimations() {
  gsap.from(".room-card", {
    scrollTrigger: { trigger: ".room-card", start: "top 80%" },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
  });
}

// Room Selection
function selectRoom(roomType) {
  const data = roomData[roomType];
  const details = document.getElementById("roomDetails");

  document.getElementById("detailTitle").textContent = data.title;
  document.getElementById("detailDesc").textContent = data.desc;
  document.getElementById("detailSize").textContent = data.size;
  document.getElementById("detailGuests").textContent = data.guests;
  document.getElementById("detailBed").textContent = data.bed;
  document.getElementById("detailView").textContent = data.view;
  document.getElementById("detailPrice").textContent = data.price;

  // Set main image
  document.getElementById("mainRoomImage").src = data.images[0];

  // Generate thumbnails
  const thumbContainer = document.getElementById("thumbGallery");
  thumbContainer.innerHTML = "";
  data.images.forEach((img, idx) => {
    const thumb = document.createElement("img");
    thumb.src = img;
    thumb.className = `gallery-thumb w-full h-20 object-cover rounded-sm ${idx === 0 ? "active" : ""}`;
    thumb.onclick = () => {
      document.getElementById("mainRoomImage").src = img;
      document
        .querySelectorAll(".gallery-thumb")
        .forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    };
    thumbContainer.appendChild(thumb);
  });

  // Generate amenities
  const amenityContainer = document.getElementById("detailAmenities");
  amenityContainer.innerHTML = "";
  data.amenities.forEach((amenity) => {
    const div = document.createElement("div");
    div.className = "flex items-center gap-2";
    div.innerHTML = `<span class="text-sage">✓</span><span>${amenity}</span>`;
    amenityContainer.appendChild(div);
  });

  // Update select dropdown
  document.getElementById("roomSelect").value = roomType;
  updateSummary();

  // Show details
  details.classList.remove("hidden");
  details.scrollIntoView({ behavior: "smooth", block: "start" });

  gsap.from(details, { opacity: 0, y: 50, duration: 0.8 });
}

// Booking Summary Calculator
function updateSummary() {
  const roomSelect = document.getElementById("roomSelect");
  const rate =
    roomSelect.options[roomSelect.selectedIndex].text.match(/\$(\d+)/)[1];
  const nights = 2; // Default
  const subtotal = rate * nights;
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  document.getElementById("summaryRate").textContent = `$${rate}/night`;
  document.getElementById("summaryTax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("summaryTotal").textContent = `$${total.toFixed(2)}`;
}

document.getElementById("roomSelect").addEventListener("change", updateSummary);

document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll("input[type='date']");
  const roomSelect = document.getElementById("roomSelect");
  const guestsSelect = form.querySelectorAll("select")[1];
  const textarea = form.querySelector("textarea");

  const checkIn = inputs[0]?.value || "Not specified";
  const checkOut = inputs[1]?.value || "Not specified";
  const roomType = roomSelect?.options[roomSelect.selectedIndex]?.text || "Not specified";
  const guests = guestsSelect?.value || "Not specified";
  const specialRequests = textarea?.value?.trim();

  let message = "Hello! I'd like to book a room at The Red Keep.\n\n";
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

function scrollToBooking() {
  document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
}

// Setup cursor hover targets
setupCursorHover("a, button, .room-card");
