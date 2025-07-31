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
        <button
          @click="toggleFilter()"
          class="filter-sort-panel-button"
        >
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
      v-if="listProducts.length > 0"
      :totalProducts="listProducts.length"
    />
    <div
      v-if="selectedCategories.length > 0"
      class="filters display-flex justify-content-center"
    >
      <div class="filter-container display-flex">
        <button
          v-for="(category, index) in selectedCategories"
          :key="'Category-' + index"
          class="filter-pill display-flex align-items-center justify-content-space-between"
        >
          <span>{{ category }}</span>
          <button
            class="remove-filter"
            @click="removeCategory(category)"
          >
            <i class="ri-close-line"></i>
          </button>
        </button>
      </div>

      <button
        class="clear-filters display-flex align-items-center justify-content-space-between"
        @click="clearAllFilters()"
      >
        <span>Clear All</span> <i class="ri-close-circle-line"></i>
      </button>
    </div>
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
      productList: (state) => state.product.productList,
      selectedCategories: (state) => state.product.selectedCategories,
    }),
    listProducts() {
      return this.productList;
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
    ...mapActions(['getAllProducts', 'getAllProductsByCategories']),

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
    ...mapMutations([
      'setProductList',
      'clearSelectedCategories',
      'removeOneSelectedCategory',
      'toggleFilter',
      'setTotalProducts',
    ]),
    clearAllFilters() {
      this.clearSelectedCategories();
      this.getAllProductsByCategories();
    },

    removeCategory(category) {
      this.removeOneSelectedCategory(category);
      this.getAllProductsByCategories();
    },
  },
};
</script>
<style scoped lang="scss">
@use '/src/styles/abstracts/_variables.scss' as *;

.filter-sort-panel {
  padding: 1rem 2rem;
  width: 100vw;
  border-bottom: 1px solid rgb(194, 192, 192);

  option {
    font-size: 14px;
  }
}
.filters {
  background-color: $secondary-color;
  padding: 16px 0px;
  width: 1600px;
}

.filter-container {
  overflow-x: auto;
  flex-wrap: nowrap;
  flex: 1;
  gap: 8px;
  padding-bottom: 4px;
}
.filter-pill,
.clear-filters {
  background-color: rgb(238, 238, 238);
  padding: 0 18px;
  white-space: nowrap;
  text-transform: capitalize;
  font-size: 14px;
}
.sub-filter-sort-panel {
  min-width: 1600px;
}

.remove-filter,
.ri-close-circle-line {
  background: none;
  border: none;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
  font-weight: 300;
  text-align: left;
}

.clear-filters {
  flex-shrink: 0;
  font-weight: 800;
  background-color: $secondary-color;
  cursor: pointer;
  margin: 0px;
  padding: 0px;
}
</style>
