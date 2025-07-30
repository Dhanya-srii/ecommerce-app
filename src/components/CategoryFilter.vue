<template>
  <div
    class="modal-filter-container"
    @click="toggleFilter"
  >
    <div
      class="filters-panel display-flex flex-direction-column"
      @click.stop
    >
      <div class="categories display-flex flex-direction-column">
        <div
          class="filters-panel-header display-flex align-items-center justify-content-space-between"
        >
          <p class="filters-panel-title">Product Filters</p>
          <button
            @click="toggleFilter"
            class="close-filter"
          >
            <i class="ri-close-large-line"></i>
          </button>
        </div>

        <div class="filters-panel-body display-flex flex-direction-column">
          <p class="custom">Category</p>

          <div
            v-for="(category, index) in categoryList"
            :key="index"
          >
            <el-checkbox
              :label="category.slug"
              v-model="originalCategoriesLocal"
              class="custom"
            >
              {{ category.slug }}
            </el-checkbox>
          </div>
        </div>

        <div
          class="filter-panel-footer display-flex align-items-center justify-content-center flex-direction-column"
        >
          <button
            class="clear-all"
            v-if="originalCategories.length > 0"
            @click="clearFilters"
          >
            <span>Clear All</span>
            <i class="ri-close-circle-line"></i>
          </button>
          <button
            class="apply-filter"
            @click="applyFilters"
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex';
import { products } from '../api/products';
export default {
  data() {
    return {
      categoryList: [],
      originalCategoriesLocal: [],
    };
  },

  computed: {
    ...mapState({
      showFilter: (state) => state.product.showFilter,
      originalCategories: (state) => state.product.selectedCategories,
    }),
    ...mapGetters(['isLoggedIn']),
  },

  async created() {
    try {
      const categoryData = await products.fetchCategoryNames();
      this.categoryList = categoryData;
      this.originalCategoriesLocal = [...this.originalCategories];
    } catch (err) {
      alert('Error loading products: ' + err.message);
    }
  },

  methods: {
    ...mapMutations([
      'setSelectedCategories',
      'clearSelectedCategories',
      'toggleFilter',
    ]),
    ...mapActions(['getAllProductsByCategories']),

    applyFilters() {
      this.setSelectedCategories(this.originalCategoriesLocal);
      this.toggleFilter();
      this.getAllProductsByCategories();
    },

    clearFilters() {
      this.originalCategoriesLocal = [];
      this.clearSelectedCategories();
      this.getAllProductsByCategories();
      this.getAllProducts();
    },
  },
};
</script>

<style lang="scss" scoped>
@use '/src/styles/abstracts/_variables.scss' as *;

.filters-panel {
  gap: 2rem;
  top: 0%;
  background-color: rgb(254, 254, 254);
  position: fixed;
  left: 0%;
  z-index: 1000;
  width: 450px;
  height: 100vh;
}

.categories {
  overflow-y: scroll;
  position: relative;
}

.filters-panel-header {
  width: 100%;
  border-bottom: 1px solid rgb(236, 233, 233);

  .filters-panel-title {
    font-weight: 600;
    font-size: 1.17em;
    padding: 16px;
  }
}

.filters-panel-body {
  gap: 2rem;
  padding: 16px;
}

.filter-panel-footer {
  gap: 16px;
  min-width: 420px;
  min-height: 130px;
  position: sticky;
  bottom: 0;
  z-index: 1000;
  background-color: $secondary-color;
}
</style>
