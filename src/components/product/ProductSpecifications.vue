<template>
  <div
    class="product-specifications display-flex align-items-center justify-content-space-between"
  >
    <div class="product-length">
      <p>{{ totalProducts }} PRODUCTS</p>
    </div>
    <div>
      <button
        class="grid-button"
        :class="[{ active: gridColumns === setGridView.TWO_COLUMNS }]"
        @click="setGridColumns(setGridView.TWO_COLUMNS)"
      >
        <i class="ri-layout-grid-line"></i>
      </button>
      <button
        class="grid-button"
        :class="[{ active: gridColumns === setGridView.FOUR_COLUMNS }]"
        @click="setGridColumns(setGridView.FOUR_COLUMNS)"
      >
        <i class="ri-layout-grid-2-line"></i>
      </button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { SET_GRID_VIEW } from '@/constants/ProductGrid';

export default {
  props: {
    totalProducts: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      setGridView: SET_GRID_VIEW,
    };
  },
  computed: {
    ...mapState({
      gridColumns: (state) => state.product.gridColumns,
    }),
  },
  methods: {
    ...mapMutations(['setGridColumns']),
  },
};
</script>

<style lang="scss" scoped>
@use '/src/styles/abstracts/_variables.scss' as *;
.product-specifications {
  margin-top: 16px;
  width: 1600px;

  .grid-button {
    padding: 16px;
    background-color: $secondary-color;
    font-size: 24px;
  }

  .grid-button.active {
    border: 1px solid #333;
  }
}

.product-length {
  font-size: 20px;
  letter-spacing: 3px;
}
</style>
