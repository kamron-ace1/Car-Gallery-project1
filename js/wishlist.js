// Wishlist State
let wishlist = JSON.parse(localStorage.getItem("bmw_wishlist")) || [];

// Update Wishlist Count
function updateWishlistCount() {
  const countEl = document.getElementById("wishlist-count");
  if (countEl) {
    countEl.innerText = wishlist.length;
  }
}

// Toggle Wishlist
function toggleWishlist(event, carId) {
  event.stopPropagation();

  if (!currentUser) {
    showToast(
      translations[currentLanguage]?.["signin"] ||
        "Please sign in to add items to wishlist",
      "error",
    );
    openAuth();
    return;
  }

  const car = bmwCars.find((c) => c.id === carId);
  const index = wishlist.findIndex((item) => item.id === carId);

  if (index === -1) {
    wishlist.push(car);
    showToast(
      `${car.model} ${translations[currentLanguage]?.["add-to-wishlist"] || "added to wishlist"}`,
      "success",
    );
  } else {
    wishlist.splice(index, 1);
    showToast(
      `${car.model} ${translations[currentLanguage]?.["remove-wishlist"] || "removed from wishlist"}`,
      "info",
    );
  }

  localStorage.setItem("bmw_wishlist", JSON.stringify(wishlist));
  updateWishlistCount();

  if (typeof displayCars === "function") {
    displayCars(true);
  }
}

// Open Wishlist
function openWishlist() {
  if (!currentUser) {
    showToast(
      translations[currentLanguage]?.["signin"] ||
        "Please sign in to view wishlist",
      "error",
    );
    openAuth();
    return;
  }

  const modal = document.getElementById("wishlistModal");
  const container = document.getElementById("wishlistItems");

  if (modal && container) {
    if (wishlist.length === 0) {
      container.innerHTML = `<p class="text-zinc-500 text-center py-8">${translations[currentLanguage]?.["empty-wishlist"] || "Your wishlist is empty"}</p>`;
    } else {
      container.innerHTML = wishlist
        .map(
          (car) => `
                <div class="flex items-center gap-4 border border-white/10 p-4 rounded-xl">
                    <img src="${car.image}" class="w-20 h-20 object-cover rounded-lg">
                    <div class="flex-1">
                        <h4 class="font-bold text-lg">${car.model}</h4>
                        <p class="text-[8px] uppercase tracking-widest text-zinc-500 mt-1">${car.year} | ${car.price} | ${car.hp} HP</p>
                    </div>
                    <button onclick="toggleWishlist(event, ${car.id})" 
                            class="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center
                                hover:bg-red-500 hover:scale-110 transition-all">
                        <i class="fa-solid fa-trash-can text-red-500 hover:text-white"></i>
                    </button>
                </div>
            `,
        )
        .join("");
    }

    modal.classList.replace("hidden", "flex");
    document.body.style.overflow = "hidden";
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

// Add to Wishlist (Modal version)
function addToWishlist(car) {
  if (!currentUser) {
    showToast(
      translations[currentLanguage]?.["signin"] ||
        "Please sign in to add items to wishlist",
      "error",
    );
    openAuth();
    return;
  }

  const index = wishlist.findIndex((item) => item.id === car.id);

  if (index === -1) {
    wishlist.push(car);
    showToast(
      `${car.model} ${translations[currentLanguage]?.["add-to-wishlist"] || "added to wishlist"}`,
      "success",
    );
  } else {
    wishlist.splice(index, 1);
    showToast(
      `${car.model} ${translations[currentLanguage]?.["remove-wishlist"] || "removed from wishlist"}`,
      "info",
    );
  }

  localStorage.setItem("bmw_wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
  updateModalWishlistButton();

  if (typeof displayCars === "function") {
    displayCars(true);
  }
}

// Update Modal Wishlist Button
function updateModalWishlistButton() {
  if (!currentCar) return;

  const button = document.querySelector('[onclick*="addToWishlist"]');
  if (!button) return;

  const isInWishlist = wishlist.some((item) => item.id === currentCar.id);
  const textSpan = button.querySelector(".add-to-wishlist-text");
  const icon = button.querySelector("i");

  if (isInWishlist) {
    button.classList.add("bg-[#1c69d4]", "text-black");
    button.classList.remove("border-[#1c69d4]");
    if (textSpan) {
      textSpan.textContent =
        translations[currentLanguage]?.["remove-wishlist"] ||
        "Remove from Wishlist";
    }
    if (icon) {
      icon.className = "fa-solid fa-heart text-xs";
    }
  } else {
    button.classList.remove("bg-[#1c69d4]", "text-black");
    button.classList.add("border-[#1c69d4]");
    if (textSpan) {
      textSpan.textContent =
        translations[currentLanguage]?.["add-to-wishlist"] || "Add to Wishlist";
    }
    if (icon) {
      icon.className = "fa-regular fa-heart text-xs";
    }
  }
}

// Initialize wishlist count
updateWishlistCount();
