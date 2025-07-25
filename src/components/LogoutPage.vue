<template>
  <div>
    <p>Logged In</p>
    <button @click="toLogout()">Logout</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { ROUTE_NAMES } from '../constants/Routes';

export default {
  methods: {
    ...mapActions(['logout']),
    toLogout() {
      this.logout();
      this.$router.push({
        name: ROUTE_NAMES.LOGIN_PAGE,
      });
    },
  },
};
</script>

