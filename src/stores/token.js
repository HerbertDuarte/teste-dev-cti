import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {
  state: () => ({
    token:  sessionStorage.getItem('access_token'),
    role: sessionStorage.getItem('role'),
    username: sessionStorage.getItem('username'),
    displayName: sessionStorage.getItem('display_name')
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    setToken(newValue) {
      this.token = newValue;
      sessionStorage.setItem('access_token', newValue)
    },
    setRole(newValue) {
      this.role = newValue;
      sessionStorage.setItem('role', newValue)
    },
    setUserName(newValue) {
      this.username = newValue;
      sessionStorage.setItem('username', newValue)
    },
    setDisplayName(newValue) {
      this.displayName = newValue;
      sessionStorage.setItem('display_name', newValue)
    },
    logout(){
      sessionStorage.removeItem('access_token')
      this.token = undefined
      sessionStorage.removeItem('role')
      this.role = undefined
      sessionStorage.removeItem('username')
      this.username = undefined
      sessionStorage.removeItem('display_name')
      this.displayName = undefined
    }
  },
});
