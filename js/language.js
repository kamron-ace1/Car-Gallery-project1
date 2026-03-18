// Language Management
let currentLanguage = localStorage.getItem('bmw_language') || 'en';

// Change language function
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('bmw_language', lang);
    
    // Update current language display
    const currentLangEl = document.getElementById('current-language');
    if (currentLangEl) {
        currentLangEl.textContent = lang.toUpperCase();
    }
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        const key = Array.from(element.attributes)
            .find(attr => attr.name === `data-${lang}`)?.value;
        
        if (key) {
            if (element.placeholder !== undefined) {
                element.placeholder = key;
            } else {
                element.textContent = key;
            }
        }
    });
    
    // Update select options
    document.querySelectorAll('#sortSelect option').forEach(option => {
        const key = option.getAttribute(`data-${lang}`);
        if (key) {
            option.textContent = key;
        }
    });
    
    // Update tooltips
    document.querySelectorAll('[data-en].search-tooltip, [data-en].wishlist-tooltip, [data-en].auth-tooltip, [data-en]#home-tooltip').forEach(tooltip => {
        const key = tooltip.getAttribute(`data-${lang}`);
        if (key) {
            tooltip.textContent = key;
        }
    });
    
    // Show toast notification
    if (typeof showToast === 'function') {
        showToast(getTranslation('language_changed', lang), 'info');
    }
}

// Get translation by key
function getTranslation(key, lang) {
    return translations[lang]?.[key] || translations.en[key];
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    changeLanguage(currentLanguage);
});