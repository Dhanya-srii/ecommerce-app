import { products } from '/src/api/products.js';
import { cart } from '/src/api/cart.js';

export const product = {
  state: {
    productData: [],
    limit: 30,
    totalProducts: 0,
    cartData: JSON.parse(localStorage.getItem('cartProducts')) || {
      products: [],
      total: 0,
      discountedTotal: 0,
      totalQuantity: 0,
    },
  },
  mutations: {
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
    setCart(state, carts) {
      state.cartData = { ...carts };
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

    async updateCart({ commit, state }, newProduct) {
      let carts = state.cartData.products;
      if (newProduct.remove) {
        carts = carts.filter((p) => p.id !== newProduct.id);
      } else {
        if (newProduct.quantityChange) {
          const existing = carts.find((p) => p.id === newProduct.id);
          if (existing) {
            existing.quantity += newProduct.quantityChange;
            if (existing.quantity < 1) {
              carts = carts.filter((p) => p.id !== newProduct.id);
            }
          }
        } else {
          carts.push({ ...newProduct, quantity: 1 });
        }
      }
      if (carts.length > 0) {
        try {
          const response = await cart.addCart({
            userId: 5,
            products: carts.map((p) => ({ id: p.id, quantity: p.quantity })),
          });
          commit('setCart', response.data);
        } catch (err) {
          alert('Error syncing carts: ' + err.message);
        }
      } else {
        commit('setCart', {
          products: [],
          total: 0,
          discountedTotal: 0,
          totalQuantity: 0,
        });
      }
      state.cartData.products = carts;
      localStorage.setItem('cartProducts', JSON.stringify(state.cartData));
    },
  },
};
