// auth.js
(() => {
    const passwordScreen = document.getElementById('password-screen');
    const usernameInput = document.getElementById('username-input');
    const codeInput = document.getElementById('code-input');
    const requestCodeBtn = document.getElementById('request-code-button');
    const loginBtn = document.getElementById('login-button');
    const errorMessage = document.getElementById('error-message');
    const logoutBtn = document.getElementById('logout-button');
  
    const STORAGE_KEY = 'pafaPricePassword';
  
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      passwordScreen.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
    } else {
      logoutBtn.style.display = 'none';
    }
  
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    });
  
    requestCodeBtn.addEventListener('click', async () => {
      const username = usernameInput.value.trim().toLowerCase();
      if (!username) {
        errorMessage.textContent = 'Kullanıcı adı boş olamaz.';
        return;
      }
  
      try {
        const res = await fetch('https://amazon-proxy-server-backend-67c6fdfdccf7.herokuapp.com/api/request-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username })
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Kod gönderilemedi.');
        errorMessage.style.color = '#10b981';
        errorMessage.textContent = '✔ Kod e-posta ile gönderildi!';
      } catch (err) {
        errorMessage.style.color = '#ef4444';
        errorMessage.textContent = err.message;
      }
    });
  
    loginBtn.addEventListener('click', async () => {
      const username = usernameInput.value.trim().toLowerCase();
      const code = codeInput.value.trim();
      if (!username || !code) {
        errorMessage.textContent = 'Kullanıcı adı ve şifre gerekli.';
        return;
      }
  
      try {
        const res = await fetch('https://amazon-proxy-server-backend-67c6fdfdccf7.herokuapp.com/api/verify-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, code })
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Giriş başarısız.');
        localStorage.setItem(STORAGE_KEY, username);
        passwordScreen.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
      } catch (err) {
        errorMessage.style.color = '#ef4444';
        errorMessage.textContent = err.message;
      }
    });
  })();
  