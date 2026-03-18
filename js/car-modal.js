// Car Modal State
let currentCar = null;

// Open Car Modal
function openCarModal(car) {
    currentCar = car;
    const modal = document.getElementById('carModal');
    
    if (!modal) return;
    
    // Set modal content
    document.getElementById('modalImg').src = car.image;
    document.getElementById('modalTitle').innerText = car.model;
    document.getElementById('modalYear').innerText = car.year;
    document.getElementById('modalHp').innerText = car.hp;
    
    let seriesText = '';
    switch(car.series) {
        case 'sedan': seriesText = 'SEDAN SERIES'; break;
        case 'coupe': seriesText = 'COUPE SERIES'; break;
        case 'suv': seriesText = 'SAV SERIES'; break;
        case 'm': seriesText = 'M PERFORMANCE'; break;
        case 'electric': seriesText = 'ELECTRIC i SERIES'; break;
        default: seriesText = car.series.toUpperCase();
    }
    
    document.getElementById('modalSeries').innerText = seriesText;
    document.getElementById('modalPrice').innerText = car.price;
    
    // Set specifications
    document.getElementById('modalSpecs').innerHTML = `
        <div class="flex justify-between border-b border-white/5 py-3">
            <span class="text-zinc-500 text-sm">${translations[currentLanguage]?.['engine'] || 'Engine'}</span>
            <span class="text-white font-medium">${car.engine}</span>
        </div>
        <div class="flex justify-between border-b border-white/5 py-3">
            <span class="text-zinc-500 text-sm">${translations[currentLanguage]?.['power'] || 'Power'}</span>
            <span class="text-white font-medium">${car.hp} HP</span>
        </div>
        <div class="flex justify-between border-b border-white/5 py-3">
            <span class="text-zinc-500 text-sm">${translations[currentLanguage]?.['torque'] || 'Torque'}</span>
            <span class="text-white font-medium">${car.torque}</span>
        </div>
        <div class="flex justify-between border-b border-white/5 py-3">
            <span class="text-zinc-500 text-sm">${translations[currentLanguage]?.['acceleration'] || '0-100 km/h'}</span>
            <span class="text-white font-medium">${car.acceleration}</span>
        </div>
        <div class="flex justify-between border-b border-white/5 py-3">
            <span class="text-zinc-500 text-sm">${translations[currentLanguage]?.['top-speed'] || 'Top Speed'}</span>
            <span class="text-white font-medium">${car.speed}</span>
        </div>
        <div class="flex justify-between border-b border-white/5 py-3">
            <span class="text-zinc-500 text-sm">${translations[currentLanguage]?.['weight'] || 'Weight'}</span>
            <span class="text-white font-medium">${car.weight}</span>
        </div>
        <div class="flex justify-between border-b border-white/5 py-3">
            <span class="text-zinc-500 text-sm">${translations[currentLanguage]?.['production'] || 'Production'}</span>
            <span class="text-white font-medium">${car.production}</span>
        </div>
    `;
    
    modal.classList.replace('hidden', 'flex');
    document.body.style.overflow = 'hidden';
    
    // Add escape key listener
    document.addEventListener('keydown', closeOnEscape);
}

// Close Car Modal
function closeCarModal() {
    const modal = document.getElementById('carModal');
    if (modal) {
        modal.classList.replace('flex', 'hidden');
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', closeOnEscape);
    }
}

// Close on Escape
function closeOnEscape(e) {
    if (e.key === 'Escape') {
        closeCarModal();
        closeAuth();
        closeWishlist();
        closeSearch();
    }
}

// Share Car
function shareCar() {
    if (currentCar && navigator.share) {
        navigator.share({
            title: currentCar.model,
            text: `Check out the ${currentCar.model} BMW`,
            url: window.location.href,
        });
    } else if (currentCar) {
        navigator.clipboard.writeText(window.location.href);
        showToast(
            translations[currentLanguage]?.['link-copied'] || 'Link copied to clipboard!', 
            'success'
        );
    }
}