<template>
  <div class="cart-item display-flex justify-content-start">
    <div
      class="cart-item-image-container display-flex align-items-center flex-direction-column"
    >
      <img
        class="item-image"
        :src="product.images[0]"
        alt="Product image"
      />
      <span class="cart-item-stock"><i class="ri-check-line"></i>IN STOCK</span>
    </div>
    <div class="cart-item-content display-flex justify-content-space-between">
      <div class="cart-item-info">
        <p class="cart-item-title">{{ product.title }}</p>
        <div class="cart-item-details">
          <p class="cart-item-product-desc">
            <span class="cart-item-product-desc-title">Color:</span> High Risk
            Red-Puma Black
          </p>
          <p class="cart-item-product-desc">
            <span class="cart-item-product-desc-title">Size:</span> UK 8
          </p>
          <p class="cart-item-product-desc">
            <span class="cart-item-product-desc-title">Style number:</span>
            311887_01
          </p>
        </div>

        <div
          class="addCart-details display-flex align-items-center justify-content-space-between"
        >
          <button
            class="counter-button"
            @click="updateCart({ id: product.id, quantityChange: -1 })"
          >
            -
          </button>
          <span>{{ product.quantity }}</span>
          <button
            class="counter-button"
            @click="updateCart({ id: product.id, quantityChange: 1 })"
          >
            +
          </button>
        </div>
      </div>
      <div
        class="cart-item-controls display-flex align-items-center flex-direction-column"
      >
        <p class="cart-item-price">
          ${{ (product.price * product.quantity).toFixed(2) }}
        </p>
        <div class="cart-item-actions">
          <button class="cart-item-user-btn">
            <i class="ri-edit-line"></i>
          </button>
          <button
            class="cart-item-user-btn"
            @click="updateCart({ id: product.id, remove: true })"
          >
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(['updateCart']),
  },
};
</script>

<style lang="scss" scoped>
@use '/src/styles/abstracts/_variables.scss' as *;

.cart-item {
  gap: 16px;
  padding: 16px;
  border: 1px solid #e2dddd;
  height: 230px;

  &-image-container {
    width: 20%;
    background-color: #eeee;

    .item-image {
      height: 150px;
      width: 180px;
    }
  }
  &-stock {
    margin-top: 8px;
    font-size: 10px;
    text-align: center;
    color: #4d7d04;
    border: 1px solid #4d7d04;
    padding: 6px;
    background-color: #ffff;
    border-radius: 12px;

    .ri-check-line {
      background-color: #4d7d04;
      color: $secondary-color;
      border-radius: 50%;
      margin: 4px;
    }
  }
  &-content {
    flex: 1;
  }
  &-info {
    flex: 1;
  }
  &-product-desc {
    font-weight: 300;
    padding: 4px 0;

    &-title {
      color: gray;
      font-weight: 200;
    }
  }
  &-title {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 16px;
  }

  &-quantity {
    margin-top: 16px;
    padding: 16px 32px;
    font-size: 16px;
  }

  &-controls {
    gap: 32px;
  }

  &-price {
    font-size: 18px;
  }

  &-user-btn {
    border: none;
    background: none;
    font-size: 24px;
    margin: 4px 8px;

    .ri-edit-line,
    .ri-delete-bin-line {
      font-weight: 300;
    }
  }
}
</style>
