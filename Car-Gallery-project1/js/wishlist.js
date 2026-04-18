// Wishlist State
let wishlist = JSON.parse(localStorage.getItem("bmw_wishlist")) || [];

// Update Wishlist Count
function updateWishlistCount() {
  const countEl = document.getElementById("wishlist-count");
  if (countEl) {
    countEl.innerText = wishlist.length;
  }
}

// Toggle Wishlist (from cards)
function toggleWishlist(event, carId) {
  if (event) event.stopPropagation();

  if (!currentUser) {
    showToast("Please sign in to add items to wishlist", "error");
    openAuth();
    return;
  }

  const car = bmwCars.find(c => c.id === carId);
  if (!car) return;

  const index = wishlist.findIndex(item => item.id === carId);

  if (index === -1) {
    wishlist.push(car);
    showToast(`${car.model} added to wishlist`, "success");
  } else {
    wishlist.splice(index, 1);
    showToast(`${car.model} removed from wishlist`, "info");
  }

  localStorage.setItem("bmw_wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
  updateSingleHeartIcon(carId);
}

// Update single heart icon
function updateSingleHeartIcon(carId) {
  const isAdded = wishlist.some(item => item.id === carId);
  const buttons = document.querySelectorAll(`button[onclick*="toggleWishlist"][onclick*="${carId}"]`);

  buttons.forEach(btn => {
    const icon = btn.querySelector('i.fa-heart');
    if (icon) {
      icon.classList.toggle('fa-solid', isAdded);
      icon.classList.toggle('fa-regular', !isAdded);
    }
  });
}

// ==================== OPEN WISHLIST - FIXED ====================
function openWishlist() {
  if (!currentUser) {
    showToast("Please sign in to view wishlist", "error");
    openAuth();
    return;
  }

  const modal = document.getElementById("wishlistModal");
  const container = document.getElementById("wishlistItems");

  if (!modal || !container) return;

  renderWishlistItems();   // Use a separate function to render

  modal.classList.replace("hidden", "flex");
  document.body.style.overflow = "hidden";
}

// Render wishlist items (can be called multiple times)
function renderWishlistItems() {
  const container = document.getElementById("wishlistItems");
  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = `<p class="text-zinc-500 text-center py-8">${translations[currentLanguage]?.["empty-wishlist"] || "Your wishlist is empty"}</p>`;
    return;
  }

  container.innerHTML = wishlist.map(car => `
    <div class="flex items-center gap-4 border border-white/10 p-4 rounded-xl wishlist-item" data-id="${car.id}">
      <img src="${car.image}" class="w-20 h-20 object-cover rounded-lg">
      <div class="flex-1">
        <h4 class="font-bold">${car.model}</h4>
        <p class="text-[8px] text-zinc-500">${car.year} • ${car.price} • ${car.hp} HP</p>
      </div>
      <button onclick="removeFromWishlist(${car.id}); event.stopPropagation()" 
              class="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:scale-110 transition-all">
        <i class="fa-solid fa-trash-can text-red-500"></i>
      </button>
    </div>
  `).join('');
}

// Remove item from wishlist (called from modal delete button)
function removeFromWishlist(carId) {
  wishlist = wishlist.filter(item => item.id !== carId);
  
  localStorage.setItem("bmw_wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
  
  // Re-render the wishlist modal immediately
  renderWishlistItems();

  // Also update heart icon on main page
  updateSingleHeartIcon(carId);

  // Optional: show toast
  const car = bmwCars.find(c => c.id === carId);
  if (car) {
    showToast(`${car.model} removed from wishlist`, "info");
  }
}

// Close Wishlist
function closeWishlist() {
  const modal = document.getElementById("wishlistModal");
  if (modal) {
    modal.classList.replace("flex", "hidden");
    document.body.style.overflow = "auto";
  }
}

// Add to Wishlist from modal
function addToWishlist(car) {
  if (!currentUser) {
    showToast("Please sign in to add items to wishlist", "error");
    openAuth();
    return;
  }

  const index = wishlist.findIndex(item => item.id === car.id);

  if (index === -1) {
    wishlist.push(car);
    showToast(`${car.model} added to wishlist`, "success");
  } else {
    wishlist.splice(index, 1);
    showToast(`${car.model} removed from wishlist`, "info");
  }

  localStorage.setItem("bmw_wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
  updateModalWishlistButton();
  updateSingleHeartIcon(car.id);
}

// Update modal wishlist button
function updateModalWishlistButton() {
  if (!currentCar) return;

  const btn = document.querySelector('button[onclick*="addToWishlist(currentCar)"]');
  if (!btn) return;

  const isInWishlist = wishlist.some(item => item.id === currentCar.id);
  const text = btn.querySelector('.add-to-wishlist-text');
  const icon = btn.querySelector('i');

  if (isInWishlist) {
    btn.classList.add("bg-[#1c69d4]", "text-black");
    btn.classList.remove("border-[#1c69d4]");
    if (text) text.textContent = "Remove from Wishlist";
    if (icon) icon.className = "fa-solid fa-heart text-xs";
  } else {
    btn.classList.remove("bg-[#1c69d4]", "text-black");
    btn.classList.add("border-[#1c69d4]");
    if (text) text.textContent = "Add to Wishlist";
    if (icon) icon.className = "fa-regular fa-heart text-xs";
  }
}

// Initialize
updateWishlistCount();