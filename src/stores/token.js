import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {
  state: () => ({
    token: sessionStorage.getItem('access_token') ? sessionStorage.getItem('access_token') : undefined,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    setToken(newValue) {
      this.token = newValue;
    },
    logout(){
      sessionStorage.removeItem('access_token')
      this.token = undefined
      location.reload()
    }
  },
});
