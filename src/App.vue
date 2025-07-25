<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { ROUTE_NAMES } from './constants/Routes';
export default {
  created() {
    this.checkSession();
  },
  computed: {
    isLoginPage() {
      return this.$route.name === ROUTE_NAMES.LOGIN_PAGE;
    },
  },
  methods: {
    ...mapActions(['logout', 'getUser']),
    async checkSession() {
      try {
        const token = document.cookie
          .split('; ')
          .find((ele) => ele.startsWith('accessToken='))
          ?.split('=')[1];

        if (!token) {
          this.logout();
          if (!this.isLoginPage) {
            this.$router.push({ name: ROUTE_NAMES.LOGIN_PAGE });
          }
          return;
        }

        await this.getUser();
        if (this.isLoginPage) {
          this.$router.push({ name: ROUTE_NAMES.LOGOUT_PAGE });
        }
      } catch {
        this.logout();
        if (!this.isLoginPage) {
          this.$router.push({ name: ROUTE_NAMES.LOGIN_PAGE });
        }
      }
    },
  },
};
</script>

<style lang="scss"  src="./styles/styles.scss"></style>
