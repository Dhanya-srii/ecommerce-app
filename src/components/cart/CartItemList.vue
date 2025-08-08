<template>
  <div class="cart display-flex align-items-center justify-content-center">
    <p
      class="product-status-message display-flex justify-content-center align-items-center"
      v-if="cartData.products.length === 0"
    >
      No items in cart.
    </p>
    <div
      v-else
      class="cart-wrapper display-flex flex-direction-column"
    >
      <p class="cart-title">
        My Shopping Cart
        <span class="item-count">({{ cartData.products.length || 0 }})</span>
      </p>

      <div class="cart-content display-flex">
        <div class="cart-items display-flex flex-direction-column">
          <cart-item
            v-for="product in cartData.products"
            :key="product.id"
            :product="product"
          />
        </div>

        <div class="cart-summary">
          <p class="free-shipping">
            <i class="ri-truck-line"></i>
            {{ "You've earned free shipping" }}
          </p>
          <p class="free-returns">
            <i class="ri-clockwise-line"></i>
            Free returns on all qualifying orders
          </p>
          <select class="promo-select">
            <option value="">Apply a promo card</option>
          </select>

          <div class="order-breakdown">
            <p class="discount-info display-flex justify-content-space-between">
              <span class="discount-title">Extra 15% off applied</span>
              <span class="discount-amount">{{
                (cartData.total - cartData.discountedTotal).toFixed(2)
              }}</span>
            </p>
            <div class="price-details">
              <p
                class="sub-price-details display-flex justify-content-space-between"
              >
                <span>Subtotal</span>
                <span>${{ cartData.total.toFixed(2) }}</span>
              </p>
              <p
                class="sub-price-details display-flex justify-content-space-between"
              >
                <span>shipping costs</span>
                <span>Free</span>
              </p>
              <p
                class="sub-price-details display-flex justify-content-space-between"
              >
                <span>order discount</span>
                <span
                  >${{
                    (cartData.total - cartData.discountedTotal).toFixed(2)
                  }}</span
                >
              </p>
            </div>
          </div>

          <div class="total display-flex justify-content-space-between">
            <p>
              Grand Total
              <span class="gst-note">Prices include GST</span>
            </p>
            <p>${{ cartData.discountedTotal }}</p>
          </div>

          <button class="checkout-button">Checkout</button>
          <p class="terms-text">
            By continuing, I confirm that I have read and accept the
            <a
              class="condition"
              href="#"
              >Terms and Conditions</a
            >
            and the
            <a
              class="condition"
              href="#"
              >Privacy Policy</a
            >.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '@/components/cart/CartItem.vue';
import { mapState } from 'vuex';
export default {
  name: 'CartItemList',
  components: { CartItem },
  computed: {
    ...mapState({
      cartData: (state) => state.product.cartData,
    }),
  },
};
</script>

<style lang="scss" scoped>
@use '/src/styles/abstracts/_variables.scss' as *;

.cart {
  width: 100vw;

  &-wrapper {
    min-width: 1600px;
    min-height: 700px;
    gap: 32px;
    margin: 24px;
  }

  &-title {
    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;
  }

  &-content {
    gap: 24px;
  }

  &-items {
    width: 60%;
    gap: 16px;
  }

  &-summary {
    width: 40%;
  }
}
.item-count {
  color: gray;
  font-weight: 300;
}
.free-shipping,
.free-returns {
  border: 1px solid #d0caca;
  text-align: center;
  padding: 8px;
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 8px;

  .ri-clockwise-line {
    padding: 16px;
    font-size: 18px;
  }
}

.free-shipping {
  color: green;
}

.free-returns {
  color: gray;
}

.promo-select {
  width: 100%;
  margin: 16px 0;
  padding: 16px;
  border: none;
  font-size: 18px;
  background-color: #eeeeee;
  font-weight: 400;
  text-transform: uppercase;
}

.order-breakdown {
  border-top: 1px solid #cac8c8;
  border-bottom: 1px solid #cac8c8;
  padding: 16px 0;
}

.discount-info {
  text-transform: uppercase;

  .discount-amount,
  .discount-title {
    font-weight: 300;
    font-size: 14px;
  }
}

.discount-amount {
  color: green;
}

.price-details {
  margin-top: 24px;
  color: #5e5d5d;
  font-size: 14px;
}

.sub-price-details,
.total {
  padding: 4px 0;
  text-transform: uppercase;
}

.total {
  margin: 38px 0;

  .gst-note {
    font-size: 15px;
    color: gray;
  }
}

.checkout-button {
  width: 100%;
  background-color: $primary-color;
  color: $secondary-color;
  padding: 16px;
  font-size: 18px;
  text-transform: uppercase;
}

.terms-text {
  font-size: 12px;
  margin: 16px 0;
  font-weight: 300;
  color: $primary-color;

  .condition {
    color: $primary-color;
  }
}
</style>
