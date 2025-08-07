<template>
  <header class="header-container display-flex justify-content-center">
    <div
      class="sub-header-container display-flex justify-content-space-between align-items-center"
    >
      <router-link
        :to="{ name: ROUTE_NAMES.PRODUCTS }"
        tag="div"
      >
        <p class="product-brand">PLUGO</p>
      </router-link>
      <div
        class="user-control-container display-flex justify-content-center align-items-center"
      >
        <input
          class="search-input"
          type="text"
          placeholder="SEARCH"
          v-model.trim="searchedProduct"
          @keyup.enter="searchProduct"
        />
        <button
          @click="searchProduct"
          class="user-control-button"
        >
          <i class="ri-search-line"></i>
        </button>
        <button
          class="user-control-button"
          v-if="showClear"
          @click="clearSearch"
        >
          <i
            class="ri-eraser-line"
            style="color: #f5f5f5"
          ></i>
        </button>

        <router-link
          :to="{ name: ROUTE_NAMES.FAVOURITE_PRODUCTS }"
          tag="button"
          class="user-control-button"
        >
          <i
            class="ri-heart-line"
            style="color: #f5f5f5"
          ></i>
          <p
            v-if="Object.keys(favouriteProducts).length > 0"
            class="favourite-list-count"
          >
            {{ Object.keys(favouriteProducts).length }}
          </p>
        </router-link>
        <router-link
          :to="{ name: ROUTE_NAMES.PRODUCT_CART }"
          tag="button"
          class="user-control-button"
        >
          <i
            class="ri-shopping-cart-line"
            style="color: #f5f5f5"
          ></i>
          <p
            v-if="cartItemQuantity > 0"
            class="favourite-list-count"
          >
            {{ cartItemQuantity }}
          </p>
        </router-link>
        <button class="user-control-button">
          <i class="ri-logout-circle-r-line"></i>
        </button>
      </div>
    </div>
  </header>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { ROUTE_NAMES } from '@/constants/Routes';

export default {
  data() {
    return {
      showClear: false,
      ROUTE_NAMES,
    };
  },
  computed: {
    ...mapState({
      favouriteProducts: (state) => state.product.favouriteProducts,
      cartItemQuantity: (state) => state.product.cartData.totalQuantity,
      searchQuery: (state) => state.product.searchQuery,
    }),
    searchedProduct: {
      get() {
        return this.searchQuery;
      },
      set(value) {
        this.setSearchProduct(value);
      },
    },
  },
  methods: {
    ...mapMutations([
      'setProductList',
      'resetProductsList',
      'setSearchProduct',
    ]),
    ...mapActions(['getAllProducts', 'getSearchProducts']),
    async searchProduct() {
      if (!this.searchedProduct) return;
      else {
        try {
          this.resetProductsList();
          const searchedProduct = await this.getAllProducts();
          this.setProductList(searchedProduct);
          this.showClear = true;
        } catch (error) {
          alert('Error Searching Product: ' + error.message);
        }
      }
    },
    async clearSearch() {
      try {
        this.resetProductsList();
        const allProducts = await this.getAllProducts();
        this.setProductList(allProducts);
        this.showClear = false;
      } catch (error) {
        alert('Error loading products: ' + error.message);
      }
    },
  },
};

</script>
<style lang="scss" scoped>
@use '/src/styles/abstracts/_variables.scss' as *;

.user-control-button.router-link-active {
  background-color: grey;
  border-radius: 50%;
}

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
