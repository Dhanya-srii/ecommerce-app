import { products } from '/src/api/products.js';
export const product = {
  state: {
    productData: [],
    limit: 30,
    totalProducts: 0,
  },
  mutations: {
    setProductData(state, products) {
      state.productData = products;
    },
    resetProductsList(state) {
      state.limit = 30;
      state.totalProducts = 0;
      state.productData = [];
    },
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
