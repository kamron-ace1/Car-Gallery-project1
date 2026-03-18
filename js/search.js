// Search State
let searchTimeout;

// Open Search Modal
function openSearch() {
    const modal = document.getElementById('searchModal');
    const input = document.getElementById('searchModalInput');
    
    if (modal && input) {
        modal.classList.replace('hidden', 'flex');
        input.focus();
        document.body.style.overflow = 'hidden';
    }
}

// Close Search Modal
function closeSearch() {
    const modal = document.getElementById('searchModal');
    if (modal) {
        modal.classList.replace('flex', 'hidden');
        document.body.style.overflow = 'auto';
    }
}

// Handle Search Input
function handleSearch(e) {
    clearTimeout(searchTimeout);
    const searchTerm = e.target.value.toLowerCase();
    
    searchTimeout = setTimeout(() => {
        if (searchTerm.length > 0) {
            filteredCars = bmwCars.filter(car => 
                car.model.toLowerCase().includes(searchTerm) ||
                car.year.toString().includes(searchTerm) ||
                car.engine.toLowerCase().includes(searchTerm)
            );
        } else {
            filteredCars = [...bmwCars];
            document.querySelector('.filter-btn.active')?.click();
        }
        currentPage = 1;
        if (typeof displayCars === 'function') {
            displayCars(true);
        }
    }, 300);
}

// Handle Sort
function handleSort(e) {
    const [sortBy, order] = e.target.value.split('-');
    
    if (sortBy === 'default') {
        filteredCars = [...bmwCars];
    } else {
        filteredCars.sort((a, b) => {
            if (sortBy === 'year') {
                return order === 'desc' ? b.year - a.year : a.year - b.year;
            } else if (sortBy === 'price') {
                const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
                const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
                return order === 'desc' ? priceB - priceA : priceA - priceB;
            } else if (sortBy === 'hp') {
                return order === 'desc' ? b.hp - a.hp : a.hp - b.hp;
            }
            return 0;
        });
    }
    
    currentPage = 1;
    if (typeof displayCars === 'function') {
        displayCars(true);
    }
}

// Reset Filters
function resetFilters() {
    document.querySelector('.filter-btn.active')?.classList.remove('active');
    document.querySelector('[data-filter="all"]')?.classList.add('active');
    filteredCars = [...bmwCars];
    currentPage = 1;
    if (typeof displayCars === 'function') {
        displayCars(true);
    }
}

// Initialize search input
document.getElementById('searchInput')?.addEventListener('input', handleSearch);
document.getElementById('sortSelect')?.addEventListener('change', handleSort);