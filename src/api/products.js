import axios from 'axios';
import { parseProduct } from './parser';
const BASE_URL = 'https://dummyjson.com/products';
export const products = {
  /**
   * retrieves a paginated list of product data.
   * @param {Number} limit The maximum number of products to return.
   * @param {Number} skip The number of products to skip from the beginning of the list.
   * @returns {Promise<Object[]>} A promise that resolves to an array of product objects.
   */

  async fetchAllProducts(limit, skip) {
    let PRODUCT_URL = `${BASE_URL}?limit=${limit}&skip=${skip}`;

    try {
      const { data } = await axios.get(PRODUCT_URL);
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
        `${BASE_URL}?sortBy=title&order=${sort}`
      );
      return { data: data.products.map(parseProduct) };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  /**
   *  retrieves the names of all available product categories.
   * @returns {Promise<String[]>} A promise that resolves to an array of category names (strings).
   */

  async fetchCategory() {
    try {
      const { data } = await axios.get(`${BASE_URL}/categories`);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  /**
   *  retrieves product data for the specified categories.
   * This method fetches products that belong to one or more of the categories provided in the `categoryList`.
   * @param {string[]} categoryList An array of strings, where each string is the name of a category to filter products by.
   * @returns {Promise<{ products: Array<Object>, totalProducts: number }>} A promise that resolves to an object
   * containing an array of product objects (`products`) and the total number of products found (`totalProducts`)
   * for the given categories.
   */
  async fetchProductsCategories(categoryList) {
    const productList = [];
    let totalProducts = 0;

    try {
      for (const category of categoryList) {
        const { data } = await axios.get(`${BASE_URL}/category/${category}`);
        const products = data.products;
        totalProducts += products.length;
        productList.push(...products.map(parseProduct));
      }
      return { products: productList, totalProducts };
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
