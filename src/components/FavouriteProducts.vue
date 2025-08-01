<template>
  <div v-if="hasFavourites === 0">
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
      :totalProducts="Object.keys(favouritesList).length"
    />
    <div class="products display-flex justify-content-start">
      <product-card
        v-for="(product, index) in favouritesList"
        :key="product.id || index"
        :productData="product"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { mapGetters, mapState } from 'vuex';
import ProductSpecifications from './ProductSpecifications.vue';

export default {
  name: 'FavouriteProducts',
  components: {
    ProductCard,
    ProductSpecifications,
  },
  computed: {
    ...mapState({
      favouritesList: (state) => state.product.favouritesList,
    }),

    ...mapGetters(['hasFavourites']),
  },
};
</script>
