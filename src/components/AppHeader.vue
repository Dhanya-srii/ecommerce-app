<template>
  <header class="header-container display-flex justify-content-center">
    <div
      class="sub-header-container display-flex justify-content-space-between align-items-center"
    >
      <div>
        <p class="product-brand">PLUGO</p>
      </div>
      <div
        class="user-control-container display-flex justify-content-center align-items-center"
      >
        <input
          class="search-input"
          type="text"
          placeholder="SEARCH"
        />
        <button class="user-control-button">
          <i class="ri-search-line"></i>
        </button>
        <button class="user-control-button">
          <i
            class="ri-eraser-line"
            style="color: #f5f5f5"
          ></i>
        </button>

        <button
          class="user-control-button"
          @click="goToFavourites()"
        >
          <i
            class="ri-heart-line"
            style="color: #f5f5f5"
          ></i>
          <p
            v-if="hasFavourites"
            class="favourite-list-count"
          >
            {{ hasFavourites }}
          </p>
        </button>
        <button class="user-control-button">
          <i
            class="ri-shopping-cart-line"
            style="color: #f5f5f5"
          ></i>
        </button>
        <button class="user-control-button">
          <i class="ri-logout-circle-r-line"></i>
        </button>
      </div>
    </div>
  </header>
</template>
<script>
import { mapGetters } from 'vuex';
import { ROUTE_NAMES } from '@/constants/Routes';

export default {
  computed: {
    ...mapGetters(['hasFavourites']),
  },
  methods: {
    goToFavourites() {
      if (this.$route.name !== ROUTE_NAMES.FAVOURITE_PRODUCTS) {
        this.$router.push({
          name: ROUTE_NAMES.FAVOURITE_PRODUCTS,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@use '/src/styles/abstracts/_variables.scss' as *;

.header-container {
  width: 100vw;
  position: sticky;
  top: 0;
  margin: 0%;
  padding: 1rem 2rem;
  background-color: $primary-color;
  z-index: 1;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}

.sub-header-container {
  min-width: 1600px;
}

.user-control-container {
  gap: 16px;
}

.product-brand {
  cursor: pointer;
  font-size: 32px;
  font-weight: bold;
  color: $secondary-color;
}

.favourite-list-count {
  position: absolute;
  background-color: $fav-color;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  font-size: 1.2rem;
  text-align: center;
  color: $secondary-color;
  right: -5px;
  top: -5px;
}

.cart {
  background-color: $primary-color;
  color: $secondary-color;
  font-size: 1.5rem;
  padding: 8px 4px 4px 8px;
}

.search-input {
  background-color: $primary-color;
  font-size: 1.1rem;
  width: 130px;
  text-align: center;
  padding: 8px;
  color: $secondary-color;
  border: 1px solid $secondary-color;
}

::placeholder {
  color: $secondary-color;
}
</style>
