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
};
