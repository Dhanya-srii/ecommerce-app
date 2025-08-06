import Vue from 'vue';
import { products } from '/src/api/products.js';
export const product = {
  state: {
    favouriteProducts:
      JSON.parse(localStorage.getItem('favouriteProducts')) || {},
    productList: [],
    selectedCategories: [],
    showFilter: false,
    limit: 30,
    totalProducts: 0,
    gridColumns: 4,
  },
  mutations: {
    updateFavProducts(state, product) {
      const id = product.id;
      if (state.favouriteProducts[id]) {
        Vue.delete(state.favouriteProducts, id);
      } else {
        Vue.set(state.favouriteProducts, id, product);
      }
      localStorage.setItem(
        'favouriteProducts',
        JSON.stringify(state.favouriteProducts)
      );
    },
    setProductList(state, products) {
      state.productList = products;
    },
    setTotalProducts(state, total) {
      state.totalProducts = total;
    },
    resetProductsList(state) {
      state.limit = 30;
      state.totalProducts = 0;
      state.productList = [];
    },
    setGridColumns(state, cols) {
      state.gridColumns = cols;
    },
    setSelectedCategories(state, categories) {
      state.selectedCategories = categories;
    },
    clearSelectedCategories(state) {
      state.selectedCategories = [];
    },
    removeOneSelectedCategory(state, category) {
      state.selectedCategories = state.selectedCategories.filter(
        (c) => c !== category
      );
    },
    toggleFilter(state) {
      state.showFilter = !state.showFilter;
    },
  },

  actions: {
    async getAllProducts({ state, commit }) {
      try {
        const currentLength = state.productList.length;
        if (currentLength < state.totalProducts || state.totalProducts === 0) {
          const { data: productsList } = await products.fetchAllProducts(
            state.limit,
            currentLength
          );
          state.productList = state.productList.concat(productsList);

          commit('setProductList', state.productList);
        }

        return state.productList;
      } catch (err) {
        alert('Error loading products: ' + err.message);
      }
    },
    async getAllProductsByCategories({ state, commit, dispatch }) {
      if (state.selectedCategories.length === 0) {
        commit('resetProductsList');
        dispatch('getAllProducts');
        return;
      }

      const { products: filtered, totalProducts } =
        await products.fetchProductsCategories(state.selectedCategories);

      commit('setTotalProducts', totalProducts);
      commit('setProductList', filtered);
    },
  },
};
