import axios from 'axios';

export const cart = {
  /**
   *  Adds a product to the cart.
   * @param {object} productData The data for the product to be added.
   * @returns {Promise<object>} A promise that resolves with the added cart product data.
   */

  async addCart(data) {
    try {
      const response = await axios.post(
        `https://dummyjson.com/carts/add`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return response;
    } catch (err) {
      throw new Error(err);
    }
  },
};
