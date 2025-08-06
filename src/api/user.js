import axios from 'axios';
import { parseUser } from '@/api/parser';

export const user = {
  /**
   *retrieves the login user details
  @param {string} usernamePassword
  @returns returns the user data and accessToken
   */

  async loginUser(username, password) {
    try {
      const res = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
        expiresInMins: 5,
      });

      document.cookie = `accessToken=${
        res.data.accessToken
      }; expires=${new Date(Date.now() + 300000)};`;

      return {
        user: parseUser(res.data),
        refreshToken: res.data.refreshToken,
      };
    } catch (err) {
      throw new Error('Login failed');
    }
  },

  /**
   *retrieves the authenticated user details
  @param {string} usernamePassword
  @returns returns the authenticated user details
   */
  async getAuthUser() {
    try {
      const token = document.cookie
        .split('; ')
        .find((ele) => ele.startsWith('accessToken='))
        ?.split('=')[1];

      if (!token) throw new Error('Session expired');

      const res = await axios.get('https://dummyjson.com/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return parseUser(res.data);
    } catch {
      throw new Error('Session expired');
    }
  },
};
