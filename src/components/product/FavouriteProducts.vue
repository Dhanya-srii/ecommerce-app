<template>
  <div v-if="Object.keys(favouriteProducts).length === 0">
    <p
      class="product-status-message display-flex justify-content-center align-items-center"
    >
      No Favourites Added!!
    </p>
  </div>

  <div
    v-else
    class="product-list display-flex align-items-center flex-direction-column"
  >
    <product-specifications
      :totalProducts="Object.keys(favouriteProducts).length"
    />
    <div
      :class="[
        'products display-flex justify-content-start',
        `grid-${gridColumns}`,
      ]"
    >
      <product-card
        v-for="(product, index) in favouriteProducts"
        :key="product.id || index"
        :productData="product"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/product/ProductCard.vue';
import { mapState } from 'vuex';
import ProductSpecifications from '@/components/product/ProductSpecifications.vue';

export default {
  name: 'FavouriteProducts',
  components: {
    ProductCard,
    ProductSpecifications,
  },
  computed: {
    ...mapState({
      gridColumns: (state) => state.product.gridColumns,
      favouriteProducts: (state) => state.product.favouriteProducts,
    }),
  },
};
</script>
