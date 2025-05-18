<template>
  <div class="login-container">
    <div class="login-card">
      <div class="avatar"></div>
      <h2>Welcome to AquaGenius</h2>
      <p class="subtitle">Sign in to monitor your AquaGenius system.</p>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input type="email" v-model="email" placeholder="you@example.com" required />
        </div>
        <div class="input-group">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" required />
          <button type="button" @click="showPassword = !showPassword" class="show-password-btn">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
        <button class="btn-primary" type="submit">Sign In</button>
      </form>
      <div class="divider">OR CONTINUE WITH</div>
      <button class="btn-google" @click="signInWithGoogle">
        <span style="font-size:1.2em; margin-right:8px;">🔵</span> Sign in with Google
      </button>
      <div class="links">
        <span>
          Don't have an account?
          <a href="#" @click.prevent="showRegister = true">Create account</a>
        </span>
        <a href="#" class="forgot">Forgot password?</a>
      </div>
    </div>

    <!-- Create Account Modal -->
    <div v-if="showRegister" class="modal-overlay">
      <div class="modal">
        <h3>Create Account</h3>
        <form @submit.prevent="handleRegister">
          <div class="input-group">
            <input type="email" v-model="registerEmail" placeholder="Enter your email" required />
          </div>
          <div class="input-group">
            <input :type="showRegisterPassword ? 'text' : 'password'" v-model="registerPassword" placeholder="Password" required />
            <button type="button" @click="showRegisterPassword = !showRegisterPassword" class="show-password-btn">
              {{ showRegisterPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <div class="input-group">
            <input :type="showRegisterPassword ? 'text' : 'password'" v-model="registerConfirmPassword" placeholder="Confirm Password" required />
          </div>
          <button class="btn-primary" type="submit">Register</button>
          <button type="button" @click="closeRegister" class="btn-cancel">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth, provider, signInWithPopup } from '../firebase';

export default {
  name: 'UserLogin',
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);

    // Registration modal refs
    const showRegister = ref(false);
    const registerEmail = ref('');
    const registerPassword = ref('');
    const registerConfirmPassword = ref('');
    const showRegisterPassword = ref(false);

    // Login logic
    const handleLogin = () => {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (users[email.value] && users[email.value] === password.value) {
        localStorage.setItem('user', JSON.stringify({ isAuthenticated: true, email: email.value }));
        router.push('/dashboard');
      } else {
        alert('Incorrect email or password');
      }
    };

    // Registration logic
    const handleRegister = () => {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (!registerEmail.value || !registerPassword.value || !registerConfirmPassword.value) {
        alert('Please fill in all fields.');
        return;
      }
      if (registerPassword.value !== registerConfirmPassword.value) {
        alert('Passwords do not match!');
        return;
      }
      if (registerEmail.value in users) {
        alert('Account already exists!');
        return;
      }
      users[registerEmail.value] = registerPassword.value;
      localStorage.setItem('users', JSON.stringify(users));
      alert('Account created! You can now login.');
      // Auto-fill login fields
      email.value = registerEmail.value;
      password.value = registerPassword.value;
      closeRegister();
    };

    const closeRegister = () => {
      showRegister.value = false;
      registerEmail.value = '';
      registerPassword.value = '';
      registerConfirmPassword.value = '';
    };

    const signInWithGoogle = async () => {
      try {
        await signInWithPopup(auth, provider);
        localStorage.setItem('user', JSON.stringify({ isAuthenticated: true }));
        router.push('/dashboard');
      } catch (error) {
        alert('Google sign-in failed');
        console.error(error);
      }
    };

    return {
      email, password, showPassword, handleLogin, signInWithGoogle,
      showRegister, registerEmail, registerPassword, registerConfirmPassword,
      handleRegister, showRegisterPassword, closeRegister
    };
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
}
.login-card {
  background: #fff;
  padding: 32px 40px;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #e3f2fd;
  margin-bottom: 16px;
}
h2 {
  font-weight: bold;
  color: #2196F3;
}
.subtitle {
  color: #888;
  margin-bottom: 24px;
}
.input-group {
  width: 100%;
  margin-bottom: 16px;
  position: relative;
}
input[type="email"], input[type="password"], input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
}
.show-password-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #2196F3;
  cursor: pointer;
  font-size: 0.95rem;
}
.btn-primary {
  width: 100%;
  padding: 12px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 8px;
}
.btn-google {
  width: 100%;
  padding: 12px;
  background: #e3f2fd;
  color: #333;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.divider {
  text-align: center;
  color: #888;
  margin: 16px 0;
  font-size: 0.95rem;
}
.links {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  margin-top: 8px;
}
.links a {
  color: #2196F3;
  text-decoration: none;
  font-size: 0.95rem;
  cursor: pointer;
}
.links a.forgot {
  margin-top: 4px;
}
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  padding: 32px 24px;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.12);
  width: 320px;
}
.btn-cancel {
  width: 100%;
  padding: 10px;
  background: #eee;
  color: #333;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
}
</style>