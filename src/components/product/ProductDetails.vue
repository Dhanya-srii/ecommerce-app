<template>
  <loading-indicator v-if="isLoading" />

  <div
    v-else
    class="product-container display-flex justify-content-center align-items-start"
  >
    <button
      @click="goBackRoute"
      class="back-button"
    >
      <i class="ri-arrow-left-line"></i>
    </button>
    <div class="sub-images display-flex flex-direction-column">
      <div
        class="sub-img-div"
        v-for="image in selectedProduct.images"
        :key="image"
      >
        <img
          class="sub-image"
          :src="image"
          alt="image"
          @click="handleHeroImage(image)"
        />
      </div>
    </div>

    <div
      class="main-image-section display-flex justify-content-center align-items-center"
    >
      <img
        class="hero-image"
        :src="heroImage || selectedProduct.images[0]"
        alt="Product image"
      />
    </div>

    <div class="product-details display-flex flex-direction-column">
      <p class="brand-title">EVERYDAY HUMANS</p>
      <p class="product-title">{{ selectedProduct.title }}</p>
      <el-rate
        v-model="value"
        disabled
        show-score
        text-color="#ec9854"
        score-template="{value} points"
      ></el-rate>
      <p class="detail-price">${{ selectedProduct.price }}</p>
      <p class="description">{{ selectedProduct.description }}</p>

      <div>
        <div
          class="action-buttons display-flex align-items-center justify-content-start"
        >
          <div v-if="!amount">
            <button
              class="addCart-details"
              @click="updateCart(selectedProduct)"
            >
              Add to Cart
            </button>
          </div>
          <div
            class="addCart-details display-flex align-items-center justify-content-space-between"
            v-else
          >
            <button
              class="counter-button"
              @click="
                updateCart({ id: selectedProduct.id, quantityChange: -1 })
              "
            >
              -
            </button>

            <span>{{ amount }}</span>
            <button
              class="counter-button"
              @click="updateCart({ id: selectedProduct.id, quantityChange: 1 })"
            >
              +
            </button>
          </div>
          <button
            @click="updateFavProducts(selectedProduct)"
            class="fav-detail display-flex align-items-center justify-content-center"
          >
            <i :class="isFavourite"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import { products } from '../../api/products';
import LoadingIndicator from '../utility/LoadingIndicator.vue';

export default {
  name: 'ProductDetail',
  data() {
    return {
      selectedProduct: {},
      value: 4.5,
      heroImage: '',
      isLoading: true,
    };
  },
  components: {
    LoadingIndicator,
  },
  async created() {
    await this.getProductdata();
  },
  computed: {
    ...mapState({
      cartProducts: (state) => state.product.cartData.products,
      favouriteProducts: (state) => state.product.favouriteProducts,
    }),
    amount() {
      const product = this.cartProducts?.find(
        (p) => p.id === this.selectedProduct.id
      );
      return product ? product.quantity : 0;
    },
    isFavourite() {
      return this.favouriteProducts[this.selectedProduct.id]
        ? 'ri-heart-fill'
        : 'ri-heart-line';
    },
  },
  methods: {
    ...mapMutations(['updateFavProducts']),

    ...mapActions(['updateCart']),
    async getProductdata() {
      try {
        this.isLoading = true;
        const productId = this.$route.query.id;
        const response = await products.fetchProductData(productId);
        this.selectedProduct = response;
        return this.selectedProduct;
      } catch (err) {
        alert(err.message);
      } finally {
        this.isLoading = false;
      }
    },
    goBackRoute() {
      this.$router.go(-1);
    },
    handleHeroImage(image) {
      this.heroImage = image;
    },
  },
};
</script>

<style lang="scss" scoped>
.product-container {
  max-width: 1300px;
  min-height: 85vh;

  margin: auto;
  gap: 1rem;
  padding: 2rem;
}

.sub-images {
  cursor: pointer;
  gap: 1rem;
}

.sub-img-div {
  height: 200px;
  width: 100%;
  background-color: #f0f0f0;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
}

.sub-image {
  height: 190px;
  width: 190px;
  object-fit: cover;
}

.main-image-section {
  background-color: #f0f0f0;
  width: 450px;
  height: 680px;
  padding: 16px;

  .hero-image {
    background-position: center;
    width: 400px;
    height: 450px;
    object-fit: contain;
  }
}

.product-details {
  flex: 1;
  gap: 3rem;
  transition: ease 1s;
}

.brand-title {
  color: #808080;
  font-size: 0.9rem;
}

.product-title {
  color: #42324f;
  font-size: 40px;
  font-weight: bold;
}

.detail-price {
  font-size: 1.5rem;
  font-weight: bold;
}

.description {
  color: #808080;
  font-size: 1rem;
}

.action-buttons {
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}
</style>
