import Vue from 'vue';
import { products } from '/src/api/products.js';
import { cart } from '/src/api/cart.js';

export const product = {
  state: {
    favouriteProducts:
      JSON.parse(localStorage.getItem('favouriteProducts')) || {},
    productList: [],
    selectedCategories: [],
    showFilter: false,
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

    setSelectedCategories(state, categories) {
      state.selectedCategories = categories;
    },
    clearSelectedCategories(state) {
      state.selectedCategories = [];
    },
    setCart(state, carts) {
      state.cartData = { ...carts };
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
