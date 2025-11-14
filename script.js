// Login Handler
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    
    
    loginError.textContent = '';
    usernameError.textContent = '';
    passwordError.textContent = '';
    
    
    let isValid = true;
    
    if (username === '') {
        usernameError.textContent = 'Username is required';
        isValid = false;
    }
    
    if (password === '') {
        passwordError.textContent = 'Password is required';
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Check credentials
    if (username === 'admin' && password === '1234') {
        // Store user session
        localStorage.setItem('currentUser', username);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to home page
        window.location.href = 'index.html';
    } else {
        loginError.textContent = 'Invalid username or password';
    }
}

// Registration Handler
function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const phone = document.getElementById('regPhone').value.trim();
    
    const usernameError = document.getElementById('regUsernameError');
    const emailError = document.getElementById('regEmailError');
    const passwordError = document.getElementById('regPasswordError');
    const confirmPasswordError = document.getElementById('regConfirmPasswordError');
    const phoneError = document.getElementById('regPhoneError');
    const registerSuccess = document.getElementById('registerSuccess');
    
    // Clear previous errors
    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';
    phoneError.textContent = '';
    registerSuccess.textContent = '';
    
    let isValid = true;
    
    // Username validation
    if (username === '') {
        usernameError.textContent = 'Username is required';
        isValid = false;
    } else if (username.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters';
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Password validation
    if (password === '') {
        passwordError.textContent = 'Password is required';
        isValid = false;
    } else if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        isValid = false;
    }
    
    // Confirm password validation
    if (confirmPassword === '') {
        confirmPasswordError.textContent = 'Please confirm your password';
        isValid = false;
    } else if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match';
        isValid = false;
    }
    
    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (phone === '') {
        phoneError.textContent = 'Phone number is required';
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        phoneError.textContent = 'Please enter a valid 10-digit phone number';
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Store user data (in a real app, this would be sent to a server)
    const userData = {
        username: username,
        email: email,
        phone: phone
    };
    
    // Save to localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Show success message
    registerSuccess.textContent = 'Registration successful! Redirecting to login...';
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// Logout Handler
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    }
}

// Check if user is logged in (for protected pages)
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}
