import { user } from '@/api/user';
export const users = {
  // namespaced: true,
  state: {
    userData: null,
    refreshToken: '',
  },
  mutations: {
    setUser(state, data) {
      state.userData = data;
    },
    clearUser(state) {
      state.userData = null;
      state.refreshToken = '';
    },
    setRefreshToken(state, token) {
      state.refreshToken = token;
    },
  },
  getters: {
    isLoggedIn: (state) => state.userData,
  },
  actions: {
    async getUser({ commit }) {
      try {
        const response = await user.getAuthUser();
        commit('setUser', response.user);
        commit('setRefreshToken', response.refreshToken);
        return response.user;
      } catch {
        commit('clearUser');
        throw new Error('Session expired');
      }
    },
    logout({ commit }) {
      document.cookie =
        'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      commit('clearUser');
    },

    startSessionTimeout({ dispatch }, router) {
      setTimeout(() => {
        dispatch('logout');
        router.push('/login');
      }, 300000);
    },
  },
};
