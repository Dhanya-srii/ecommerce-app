import { products } from '/src/api/products.js';
export const product = {
  state: {
    productData: [],
  },
  mutations: {
    setProductData(state, products) {
      state.productData = products;
    },
    setTotalProducts(state, total) {
      state.totalProducts = total;
    },
  },
  actions: {
    async getAllProducts({ state, commit }) {
      try {
        const { data } = await products.fetchAllProducts();
        commit('setProductData', data);
        return state.allProducts;
      } catch (err) {
        alert('Error loading products: ' + err.message);
      }
    },
  },
};
