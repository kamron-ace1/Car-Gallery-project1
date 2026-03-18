// Display Cars
let currentPage = 1;
const carsPerPage = 9;
let filteredCars = [...bmwCars];

function displayCars(reset = true) {
    const grid = document.getElementById('carGrid');
    const noResults = document.getElementById('noResults');
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    
    if (!grid) return;
    
    if (reset) {
        grid.innerHTML = '';
        currentPage = 1;
    }
    
    const start = (currentPage - 1) * carsPerPage;
    const end = start + carsPerPage;
    const carsToShow = filteredCars.slice(0, end);
    
    if (carsToShow.length === 0) {
        if (noResults) noResults.classList.remove('hidden');
        if (loadMoreContainer) loadMoreContainer.classList.add('hidden');
        return;
    }
    
    if (noResults) noResults.classList.add('hidden');
    
    carsToShow.slice(reset ? 0 : start).forEach((car, index) => {
        const card = createCarCard(car);
        grid.appendChild(card);
        setTimeout(() => card.classList.add('show'), index * 100);
    });
    
    if (loadMoreContainer) {
        if (carsToShow.length >= filteredCars.length) {
            loadMoreContainer.classList.add('hidden');
        } else {
            loadMoreContainer.classList.remove('hidden');
        }
    }
}

// Create Car Card
function createCarCard(car) {
    const card = document.createElement('div');
    card.className = 'car-card group cursor-pointer';
    card.innerHTML = `
        <div class="relative overflow-hidden aspect-[16/10] bg-zinc-900 border border-white/5 mb-4 rounded-2xl">
            <img src="${car.image}" 
                 class="card-img w-full h-full object-cover"
                 loading="lazy"
                 onerror="this.src='https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2070&auto=format&fit=crop'">
            
            <div class="absolute inset-0 card-overlay"></div>
            
            <div class="absolute top-4 right-4">
                <button onclick="toggleWishlist(event, ${car.id})" 
                        class="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center
                               hover:bg-[#1c69d4] hover:border-[#1c69d4] hover:scale-110 transition-all duration-300">
                    <i class="fa-${wishlist.some(item => item.id === car.id) ? 'solid' : 'regular'} fa-heart text-sm"></i>
                </button>
            </div>
            
            <div class="absolute bottom-4 left-4 right-4">
                <span class="inline-block px-3 py-1 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-[8px] uppercase tracking-widest">
                    ${car.series.toUpperCase()} SERIES
                </span>
            </div>
        </div>
        
        <h3 class="text-2xl font-bold mb-1 group-hover:text-[#1c69d4] transition-colors" style="font-family: 'Playfair Display', serif;">${car.model}</h3>
        <div class="flex items-center gap-3 text-[8px] uppercase tracking-widest text-zinc-500">
            <span>${car.year}</span>
            <span class="w-1 h-1 bg-[#1c69d4] rounded-full"></span>
            <span>${car.hp} HP</span>
            <span class="w-1 h-1 bg-[#1c69d4] rounded-full"></span>
            <span>${car.price}</span>
        </div>
    `;
    
    card.onclick = () => openCarModal(car);
    return card;
}

// Display Gallery
function displayGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    
    galleryImages.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${img}" class="w-full h-full object-cover">
            <div class="gallery-overlay">
                <span class="text-[10px] uppercase tracking-widest text-white font-semibold">${translations[currentLanguage]?.['view-details'] || 'View Details'}</span>
            </div>
        `;
        item.onclick = () => openCarModal(bmwCars[index % bmwCars.length]);
        grid.appendChild(item);
    });
}

// Load More
function loadMore() {
    currentPage++;
    displayCars(false);
}

// Toast Function
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    
    toast.className = `toast flex items-center gap-3 min-w-[300px]`;
    toast.innerHTML = `
        <i class="fa-regular ${type === 'success' ? 'fa-circle-check' : 'fa-circle-info'} text-[#1c69d4] text-xl"></i>
        <span class="flex-1 text-sm">${message}</span>
        <button onclick="this.parentElement.remove()" class="text-white/50 hover:text-white">
            <i class="fa-regular fa-xmark"></i>
        </button>
    `;
    
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

// Newsletter Form
document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast(
        translations[currentLanguage]?.['thank-you'] || 'Thank you for subscribing!', 
        'success'
    );
    e.target.reset();
});

// Click outside to close modals
document.addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalBlurBg')) closeCarModal();
    if (e.target === document.querySelector('#authModal > div:first-child')) closeAuth();
    if (e.target === document.querySelector('#wishlistModal > div:first-child')) closeWishlist();
    if (e.target === document.querySelector('#searchModal > div:first-child')) closeSearch();
});

// Escape key
document.addEventListener('keydown', closeOnEscape);