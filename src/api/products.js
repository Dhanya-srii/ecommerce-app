import axios from 'axios';
import { parseProduct } from './parser';

export const products = {
  /**
   * retrieves a paginated list of product data.
   * @param {Number} limit The maximum number of products to return.
   * @param {Number} skip The number of products to skip from the beginning of the list.
   * @returns {Promise<Object[]>} A promise that resolves to an array of product objects.
   */

  async fetchAllProducts(limit, skip) {
    let BASE_URL = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    try {
      const { data } = await axios.get(BASE_URL);
      return {
        data: data.products.map(parseProduct),
        total: data.total,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  /**
   * Fetches product data from the api.
   * @param {string} productId The ID of the product to retrieve.
   * @returns {object} The product data object.
   */

  async fetchProductData(productId) {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products/${productId}`
      );
      return parseProduct(data);
    } catch (err) {
      throw new Error(err.message);
    }
  },

  /**
   * retrieves the product data by price
   * @param {string} sort
   * @returns returns the product data by price .
   */

  async fetchProductsByPrice(sort) {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products?sortBy=title&order=${sort}`
      );
      return { data: data.products.map(parseProduct) };
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
