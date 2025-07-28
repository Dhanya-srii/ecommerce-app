import axios from 'axios';
import { parseProducts } from './parser';

export const products = {
  /**
   * retrieves product data
   * @returns returns product data
   */

  async fetchAllProducts() {
    let BASE_URL = 'https://dummyjson.com/products';

    try {
      const { data } = await axios.get(BASE_URL);
      return {
        data: data.products.map(parseProducts),
        total: data.total,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
