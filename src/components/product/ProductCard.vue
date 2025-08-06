<template>
  <div class="product-card display-flex justify-content-center">
    <router-link
      :to="{ name: ROUTE_NAMES.PRODUCT_DETAIL, query: { id: productData.id } }"
      tag="div"
      class="product"
    >
      <div class="image-container">
        <button
          class="fav-icon"
          @click.stop="updateFavProducts(productData)"
        >
          <i :class="isFavourite"></i>
        </button>
        <img
          class="product-image display-block"
          alt="Product image"
          :src="productData.images[0]"
        />
      </div>

      <div
        class="product-info display-flex align-items-start justify-content-center flex-direction-column"
      >
        <div
          class="sub-product-info display-flex align-items-start justify-content-space-between"
        >
          <p class="product-card-title">
            {{ productData.title }}
          </p>
          <p class="card-price">${{ productData.price }}</p>
        </div>
        <div></div>
      </div>
    </router-link>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import { ROUTE_NAMES } from '@/constants/Routes';

export default {
  name: 'ProductCard',
  data() {
    return {
      ROUTE_NAMES,
    };
  },
  props: {
    productData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      favouriteProducts: (state) => state.product.favouriteProducts,
      getCartProductsQuantity: (state) => state.product.cartData.totalQuantity,
    }),

    isFavourite() {
      return this.favouriteProducts[this.productData.id]
        ? 'ri-heart-fill'
        : 'ri-heart-line';
    },
  },
  methods: {
    ...mapMutations(['updateFavProducts']),
 
  },
};
</script>
<style scoped lang="scss">
.product-card {
  gap: 16px;
  padding-right: 20px;
  padding-left: 12px;
  margin-bottom: 16px;
  cursor: pointer;
}

.image-container {
  background-color: rgb(240, 240, 240);
  overflow: hidden;
  position: relative;
}

.product-image {
  padding: 16px;
  width: 300px;
  height: 320px;
  object-fit: cover;
  margin: 0 auto;
}

.product-info {
  padding: 8px;
}

.sub-product-info {
  min-width: 350px;
  margin-bottom: 8px;
  padding-top: 8px;

  .product-card-title {
    word-wrap: break-word;
    font-weight: 800;
    text-align: left;
    line-height: 24px;
    max-width: 200px;
  }

  .card-price {
    font-weight: 800;
    color: brown;
  }
}
</style>
