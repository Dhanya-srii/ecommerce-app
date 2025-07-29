import axios from 'axios';
import { parseProduct } from './parser';

export const products = {
  /**
   * retrieves a list of all products.
   * @returns A list containing data of all available products.
   */

  async fetchAllProducts() {
    let BASE_URL = 'https://dummyjson.com/products';

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
