// Auth State
let isLoginMode = true;
let currentUser = JSON.parse(localStorage.getItem('bmw_user')) || null;

// Open Auth Modal
function openAuth() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.replace('hidden', 'flex');
        document.body.style.overflow = 'hidden';
    }
}

// Close Auth Modal
function closeAuth() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.replace('flex', 'hidden');
        document.body.style.overflow = 'auto';
    }
}

// Toggle between Login and Register
function toggleAuth() {
    isLoginMode = !isLoginMode;
    
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const nameGroup = document.getElementById('nameGroup');
    const authBtn = document.getElementById('authBtn');
    
    if (authTitle) {
        authTitle.innerText = isLoginMode ? 
            (translations[currentLanguage]?.['welcome-back'] || 'Welcome Back') : 
            (translations[currentLanguage]?.['create-account'] || 'Create Account');
    }
    
    if (authSubtitle) {
        authSubtitle.innerText = isLoginMode ? 
            (translations[currentLanguage]?.['auth-subtitle'] || 'Sign in to your BMW account') : 
            (translations[currentLanguage]?.['fullname'] || 'Create your BMW account');
    }
    
    if (nameGroup) {
        nameGroup.classList.toggle('hidden');
    }
    
    if (authBtn) {
        authBtn.innerText = isLoginMode ? 
            (translations[currentLanguage]?.['create-account'] || 'Create new account') : 
            (translations[currentLanguage]?.['signin'] || 'Back to login');
    }
}

// Auth Form Submit
document.getElementById('authForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const user = {
        name: document.getElementById('authName')?.value || 'Guest',
        email: document.getElementById('authEmail')?.value
    };
    
    currentUser = user;
    localStorage.setItem('bmw_user', JSON.stringify(user));
    
    showToast(
        isLoginMode ? 
        (translations[currentLanguage]?.['welcome-back'] || 'Welcome back!') : 
        (translations[currentLanguage]?.['create-account'] || 'Account created successfully!'), 
        'success'
    );
    
    setTimeout(() => {
        closeAuth();
        checkUser();
    }, 1500);
});

// Check User Status
function checkUser() {
    const authStatus = document.getElementById('authStatus');
    
    if (currentUser && authStatus) {
        authStatus.innerHTML = `
            <div class="relative group">
                <button class="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center
                              hover:bg-[#1c69d4] hover:border-[#1c69d4] hover:scale-110 transition-all duration-300">
                    <span class="text-[10px] font-bold text-white">${currentUser.name.charAt(0).toUpperCase()}</span>
                </button>
                <div class="absolute right-0 top-12 w-48 bg-zinc-900 border border-white/10 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div class="p-4 text-[9px] text-zinc-400 border-b border-white/10">${currentUser.email}</div>
                    <button onclick="logout()" 
                            class="w-full text-left px-4 py-3 text-[9px] uppercase tracking-widest hover:bg-[#1c69d4] hover:text-white transition rounded-b-lg">
                        ${translations[currentLanguage]?.['signin']?.replace('In', 'Out') || 'Sign Out'}
                    </button>
                </div>
            </div>
        `;
    }
}

// Logout
function logout() {
    localStorage.removeItem('bmw_user');
    localStorage.removeItem('bmw_wishlist');
    currentUser = null;
    wishlist = [];
    location.reload();
}