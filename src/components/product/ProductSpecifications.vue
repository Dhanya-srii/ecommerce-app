<template>
  <div
    class="product-specifications display-flex align-items-center justify-content-space-between"
  >
    <div class="product-length">
      <p>{{ totalProducts }} PRODUCTS</p>
    </div>
    <div>
      <button class="grid-button">
        <i class="ri-layout-grid-line"></i>
      </button>
      <button class="grid-button active">
        <i class="ri-layout-grid-2-line"></i>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    totalProducts: {
      type: Number,
      required: true,
    },
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
