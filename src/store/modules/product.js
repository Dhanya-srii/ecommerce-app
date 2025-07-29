import { products } from '/src/api/products.js';
export const product = {
  state: {
    productData: [],
    allProducts: [],
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
      state.allProducts = [];
    },
  },
  actions: {
    async getAllProducts({ state, commit }) {
      try {
        const currentLength = state.allProducts.length;
        if (currentLength < state.totalProducts || state.totalProducts === 0) {
          const { data: productsList } = await products.fetchAllProducts(
            state.limit,
            currentLength
          );
          state.allProducts = state.allProducts.concat(productsList);

          commit('setProductData', state.allProducts);
        }

        return state.allProducts;
      } catch (err) {
        alert('Error loading products: ' + err.message);
      }
    },
  },
};
