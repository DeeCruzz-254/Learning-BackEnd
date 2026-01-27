const API_URL = 'http://localhost:3000/api/v1/users';

// Toggle between login and register forms
function toggleForms() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    
    registerForm.classList.toggle('active');
    loginForm.classList.toggle('active');
}

// Register user
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        const messageDiv = document.getElementById('register-message');
        
        if (response.ok) {
            messageDiv.className = 'message success';
            messageDiv.textContent = data.message || 'Registration successful! Please login.';
            document.getElementById('register-form').reset();
            
            setTimeout(() => {
                toggleForms();
            }, 2000);
        } else {
            messageDiv.className = 'message error';
            messageDiv.textContent = data.message || 'Registration failed. Try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        const messageDiv = document.getElementById('register-message');
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Network error. Please try again.';
    }
});

// Login user
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        const messageDiv = document.getElementById('login-message');
        
        if (response.ok) {
            messageDiv.className = 'message success';
            messageDiv.textContent = 'Login successful!';
            
            // Store user data and token
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            
            setTimeout(() => {
                showDashboard(data.user);
            }, 1500);
        } else {
            messageDiv.className = 'message error';
            messageDiv.textContent = data.message || 'Login failed. Check your credentials.';
        }
    } catch (error) {
        console.error('Error:', error);
        const messageDiv = document.getElementById('login-message');
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Network error. Please try again.';
    }
});

// Show dashboard after login
function showDashboard(user) {
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('dashboard').classList.add('active');
    
    const userInfo = document.getElementById('user-info');
    userInfo.innerHTML = `
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Welcome back!</strong></p>
    `;
}

// Logout user
function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    document.getElementById('dashboard').classList.remove('active');
    document.getElementById('registerForm').classList.add('active');
    document.getElementById('login-form').reset();
    document.getElementById('register-form').reset();
}

// Check if user is already logged in on page load
window.addEventListener('load', () => {
    const user = localStorage.getItem('user');
    if (user) {
        showDashboard(JSON.parse(user));
    }
});
