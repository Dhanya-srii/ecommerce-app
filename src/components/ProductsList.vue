<template>
  <div
    v-lazy:30="getAllProducts"
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
        ><el-select
          class="select-product"
          v-model="selectedOption"
          @change="handleOptionChange"
          placeholder="SORT BY"
        >
       
          <el-option value="asc" label="Price Low To High">Price Low To High</el-option>
          <el-option value="desc" label="Price High To Low">Price High To Low</el-option>
          <el-option value="latest" label="Latest">Latest</el-option>
        </el-select>
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
    ...mapMutations([
      'setTotalProducts',
      'setProductData',
      'resetProductsList',
    ]),
    ...mapActions(['getAllProducts']),

    async handleOptionChange() {
      if (this.selectedOption === 'latest') {
        this.resetProductsList();
        this.getAllProducts();
      } else {
        try {
          const sortedProducts = await products.fetchProductsByPrice(
            this.selectedOption
          );
          this.setTotalProducts(sortedProducts.length);
          this.setProductData(sortedProducts.data);
        } catch (err) {
          alert('Error fetching sorted products:', err.message);
        }
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
