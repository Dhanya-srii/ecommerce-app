import axios from 'axios';

export const cart = {
  /**
   *  Adds a product to the cart.
   * @param {object} cartData The data for the product to be added.
   * @returns {Promise<object>} A promise that resolves with the added cart product data.
   */

  async addCart(cartData) {
    try {
      const { data } = await axios.post(
        'https://dummyjson.com/carts/add',
        cartData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return data;
    } catch (err) {
      throw new Error(err);
    }
  },
};
