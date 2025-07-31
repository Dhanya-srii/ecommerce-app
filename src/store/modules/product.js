import Vue from 'vue';
import { products } from '/src/api/products.js';
export const product = {
  state: {
    favouritesList: JSON.parse(localStorage.getItem('favouritesList')) || {},
    productData: [],
    limit: 30,
    totalProducts: 0,
  },
  mutations: {
    updateFavList(state, product) {
      const id = product.id;
      if (state.favouritesList[id]) {
        Vue.delete(state.favouritesList, id);
      } else {
        Vue.set(state.favouritesList, id, product);
      }
      localStorage.setItem(
        'favouritesList',
        JSON.stringify(state.favouritesList)
      );
    },
    setProductData(state, products) {
      state.productData = products;
    },
    setTotalProducts(state, total) {
      state.totalProducts = total;
    },
    resetProductsList(state) {
      state.limit = 30;
      state.totalProducts = 0;
      state.productData = [];
    },
  },
  getters: {
    hasFavourites: (state) => Object.keys(state.favouritesList).length,
  },
  actions: {
    async getAllProducts({ state, commit }) {
      try {
        const currentLength = state.productData.length;
        if (currentLength < state.totalProducts || state.totalProducts === 0) {
          const { data: productsList } = await products.fetchAllProducts(
            state.limit,
            currentLength
          );
          state.productData = state.productData.concat(productsList);

          commit('setProductData', state.productData);
        }

        return state.productData;
      } catch (err) {
        alert('Error loading products: ' + err.message);
      }
    },
  },
};
