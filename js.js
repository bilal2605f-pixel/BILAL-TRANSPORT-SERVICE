// Base Prices & Per-KM Rates in PKR
const pricingData = {
    "10-wheeler": { base: 9500, perKm: 120 },
    "12-wheeler": { base: 13500, perKm: 150 },
    "22-wheeler": { base: 24000, perKm: 240 }
  };
  
  // Material Surcharges in PKR
  const materialAddon = {
    mitti: 0,
    malba: 1000,
    rait: 5000,
    bajri: 14500
  };
  
  // DOM Elements
  const truckSelect = document.getElementById("truckType");
  const materialSelect = document.getElementById("materialType");
  const distanceRange = document.getElementById("distanceRange");
  const distanceValue = document.getElementById("distanceValue");
  const tripCount = document.getElementById("tripCount");
  const totalPriceEl = document.getElementById("totalPrice");
  const bookingForm = document.getElementById("bookingForm");
  const whatsappBtn = document.getElementById("whatsappBtn");
  const modal = document.getElementById("bookingModal");
  const modalSummary = document.getElementById("modalSummary");
  const closeModal = document.getElementById("closeModal");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  
  // Calculate Live Fare
  function calculateFare() {
    const truck = truckSelect.value;
    const material = materialSelect.value;
    const km = parseInt(distanceRange.value, 10);
    const trips = Math.max(1, parseInt(tripCount.value, 10) || 1);
  
    distanceValue.textContent = `${km} km`;
  
    const baseFare = pricingData[truck].base;
    const distanceFare = km * pricingData[truck].perKm;
    const materialCost = materialAddon[material];
  
    const singleTripTotal = baseFare + distanceFare + materialCost;
    const grandTotal = singleTripTotal * trips;
  
    totalPriceEl.textContent = `Rs. ${grandTotal.toLocaleString("en-PK")}`;
    return grandTotal;
  }
  
  // Event Listeners for Live Calculation
  truckSelect.addEventListener("change", calculateFare);
  materialSelect.addEventListener("change", calculateFare);
  distanceRange.addEventListener("input", calculateFare);
  tripCount.addEventListener("input", calculateFare);
  
  // Select Truck directly from Fleet Cards
  document.querySelectorAll(".select-truck").forEach(button => {
    button.addEventListener("click", () => {
      truckSelect.value = button.dataset.truck;
      calculateFare();
      document.getElementById("calculator").scrollIntoView({ behavior: "smooth" });
    });
  });
  
  // Handle Form Submission
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const site = document.getElementById("siteLocation").value;
    const total = totalPriceEl.textContent;
  
    modalSummary.innerHTML = `
      Thank you <strong>${name}</strong>! Your booking for <strong>${tripCount.value}x ${truckSelect.value.toUpperCase()}</strong> (${materialSelect.value.toUpperCase()}) to <strong>${site}</strong> is logged.<br><br>
      <strong>Estimated Fare:</strong> ${total}<br>
      Our dispatch team will call you on <strong>${phone}</strong> shortly.
    `;
    modal.classList.add("active");
  });
  
  // Close Modal
  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
    bookingForm.reset();
    calculateFare();
  });
  
  // Send Quote via WhatsApp
  whatsappBtn.addEventListener("click", () => {
    const name = document.getElementById("customerName").value || "Customer";
    const site = document.getElementById("siteLocation").value || "Not specified";
    const message = `Assalam-o-Alaikum Bilal Transport Service!%0A*New Dumper Booking Quote*%0A- Name: ${name}%0A- Dumper: ${truckSelect.value.toUpperCase()}%0A- Material: ${materialSelect.value.toUpperCase()}%0A- Distance: ${distanceRange.value} km%0A- Trips: ${tripCount.value}%0A- Site: ${site}%0A- Estimated Fare: ${totalPriceEl.textContent}`;
    
    window.open(`https://wa.me/923001234567?text=${message}`, "_blank");
  });
  
  // Mobile Menu Toggle
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  
  // Initialize Default Price on Load
  calculateFare();