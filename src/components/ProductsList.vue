<template>
  <div
    class="product-list display-flex align-items-center flex-direction-column"
  >
    <div
      class="filter-sort-panel display-flex align-items-center justify-content-center"
    >
      <div
        class="sub-filter-sort-panel display-flex align-items-center justify-content-space-between"
      >
        <button class="filter-sort-panel-button">
          <span>FILTERS</span><i class="ri-equalizer-3-line"></i></button
        ><select
          class="select-product"
          v-model="selectedOption"
          @change="handleOptionChange"
        >
          <option
            value=""
            disabled
          >
            SORT BY
          </option>
          <option value="asc">Price Low To High</option>
          <option value="desc">Price High To Low</option>
          <option value="latest">Latest</option>
        </select>
      </div>
    </div>
    <product-specifications
      v-if="listProducts.length"
      :totalProducts="listProducts.length"
    />
    <div
      v-if="listProducts.length > 0"
      class="products display-flex justify-content-start"
    >
      <product-card
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
import { mapState, mapActions, mapMutations } from 'vuex';
import ProductCard from './ProductCard.vue';
import ProductSpecifications from './ProductSpecifications.vue';
import { products } from '/src/api/products.js';
export default {
  name: 'ProductListing',
  components: {
    ProductCard,
    ProductSpecifications,
  },
  data() {
    return {
      selectedOption: '',
    };
  },
  computed: {
    ...mapState({
      productData: (state) => state.product.productData,
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
    ...mapMutations(['setTotalProducts', 'setProductData']),
    ...mapActions(['getAllProducts']),

    async handleOptionChange() {
      try {
        if (!this.selectedOption) return;
        if (this.selectedOption === 'latest') {
          return this.getAllProducts();
        }
        const sortedProducts = await products.fetchProductsByPrice(
          this.selectedOption
        );
        this.setTotalProducts(sortedProducts.length);
        this.setProductData(sortedProducts.data);
      } catch (err) {
        alert('Error fetching sorted products:', err.message);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.filter-sort-panel {
  padding: 1rem 2rem;
  width: 100vw;
  border-bottom: 1px solid rgb(194, 192, 192);

  option {
    font-size: 14px;
  }
}

.sub-filter-sort-panel {
  min-width: 1600px;
}
</style>
