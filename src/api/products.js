import axios from 'axios';
import { parseProduct } from './parser';

export const products = {
  /**
   * retrieves product data by limit
   * @param {Number} limitSkip
   * @returns returns product data by limit
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
