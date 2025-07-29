<template>
  <div
    class="login-wrapper-container display-flex align-items-center justify-content-center"
  >
    <div
      class="login-container display-flex align-items-center flex-direction-column"
    >
      <p class="login-title">Login / Join Us</p>
      <p class="message">Enter your name and password to log in</p>
      <div class="user-details display-flex flex-direction-column">
        <label class="label">NAME</label>
        <input
          class="user-input"
          required
          v-model="username"
          placeholder="Name"
        />
      </div>
      <div class="user-details display-flex flex-direction-column">
        <label class="label">PASSWORD</label>
        <input
          class="user-input"
          required
          v-model="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <button
        class="login-btn"
        @click="loginUserHandler"
      >
        LOGIN
      </button>
      <p
        v-if="errorMessage"
        style="color: red"
      >
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import { user } from '../api/user';
import { ROUTE_NAMES } from '../constants/Routes';

export default {
  data() {
    return {
      username: 'emilys',
      password: 'emilyspass',
      errorMessage: '',
    };
  },

  methods: {
    ...mapActions(['startSessionTimeout']),
    ...mapMutations(['setUser']),
    async loginUserHandler() {
      try {
        const parsedUser = await user.loginUser(this.username, this.password);
        
        this.setUser(parsedUser);
        
        this.startSessionTimeout(this.$router);
        this.$router.push({ name: ROUTE_NAMES.PRODUCTS });
      } catch {
        this.errorMessage = 'Invalid username or password';
      }
    },
  },
};
</script>
<style scoped lang="scss">
@use '/src/styles/abstracts/_variables.scss' as *;

.login-wrapper-container {
  height: 100vh;
  background-color: #f9f9f9;
}

.login-container {
  gap: 24px;
  padding: 24px;
  width: 320px;
  border-radius: 8px;
  background-color: $secondary-color;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.login-title {
  font-size: 24px;
  font-weight: 300;
}

.message {
  font-size: 14px;
  font-weight: 300;
}

.user-details {
  width: 100%;
}

.label {
  font-size: 12px;
  margin-bottom: 8px;
  color: #333;
}

.user-input {
  padding: 16px 12px;
  border: 1px solid #aaa;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
}

.login-btn {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #959595;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
