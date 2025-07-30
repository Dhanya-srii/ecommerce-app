<template>
  <div id="app">
    <app-header v-if="!canShowHeader" />
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import AppHeader from './components/AppHeader.vue';
import { ROUTE_NAMES } from './constants/Routes';
export default {
  created() {
    this.checkSession();
  },
  components: {
    AppHeader,
  },
  watch: {
    '$route.name': {
      handler(to) {
        if (to != ROUTE_NAMES.PRODUCTS) {
          this.resetProductsList();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    isLoginPage() {
      return this.$route.name === ROUTE_NAMES.LOGIN_PAGE;
    },
    canShowHeader() {
      return ROUTE_NAMES.LOGIN_PAGE.includes(this.$route.name);
    },
  },
  methods: {
    ...mapMutations(['resetProductsList']),

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
          this.$router.push({ name: ROUTE_NAMES.PRODUCTS });
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

<style lang="scss" src="./styles/styles.scss"></style>
