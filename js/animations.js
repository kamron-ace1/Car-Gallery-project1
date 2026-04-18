// Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// Reveal on Scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.parallax-layer');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counters Animation
function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                let current = 0;
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.innerText = target + (counter.innerText.includes('+') ? '+' : counter.innerText.includes('%') ? '%' : '');
                        clearInterval(timer);
                    } else {
                        counter.innerText = Math.floor(current) + (counter.innerText.includes('+') ? '+' : counter.innerText.includes('%') ? '%' : '');
                    }
                }, 20);
                
                observer.unobserve(counter);
            }
        });
    });
    
    document.querySelectorAll('.counter').forEach(counter => observer.observe(counter));
}

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000);
        }
    }, 1500);
});

// Back to Top Button
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    const homeLogo = document.getElementById('homeLogo');
    
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            if (homeLogo) homeLogo.classList.add('scrolled-logo');
        } else {
            nav.classList.remove('scrolled');
            if (homeLogo) homeLogo.classList.remove('scrolled-logo');
        }
    }
});

// Home Logo Click
document.getElementById('homeLogo')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Scroll to Collection
function scrollToCollection() {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
}

// Ripple Effect for buttons
document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple-effect');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});