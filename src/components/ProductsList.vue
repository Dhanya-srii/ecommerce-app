<template>
  <div
    class="product-list display-flex align-items-center flex-direction-column"
  >
    <div
      v-if="listProducts.length > 0"
      class="products display-flex justify-content-start"
    >
      <product-cards
        v-for="(product, index) in listProducts"
        :key="index"
        :productData="product"
      />
    </div>

    <div v-else>
      <p
        class="product-status-message display-flex justify-content-center align-items-center"
      >
        Product Not Listed!
      </p>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import ProductCard from './ProductCard.vue';

export default {
  name: 'ProductListing',
  components: {
    ProductCard,
  },
  computed: {
    ...mapState({
      productData: (state) => state.storeProducts.productData,
    }),
    listProducts() {
      return this.productData;
    },
  },

  async created() {
    try {
      await this.getAllProducts();
    } catch (error) {
      alert('Error loading products:', error);
    }
  },
  methods: {
    ...mapActions(['getAllProducts']),
  },
};
</script>
