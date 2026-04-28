// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functions
    initCounters();
    displayCars();
    displayGallery();
    checkUser();
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filteredCars = bmwCars.filter(car => 
                btn.dataset.filter === 'all' ? true : car.series === btn.dataset.filter
            );
            currentPage = 1;
            displayCars(true);
        });
    });
    
    // Load More button
    document.getElementById('loadMoreBtn')?.addEventListener('click', loadMore);
    
    // Welcome toast
    setTimeout(() => {
        showToast(
            translations[currentLanguage]?.['welcome'] || 'Welcome to BMW Complete Collection', 
            'info'
        );
    }, 2000);
});