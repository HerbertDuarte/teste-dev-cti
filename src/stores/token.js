import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {
  state: () => ({
    token: sessionStorage.getItem('access_token') ? sessionStorage.getItem('access_token') : undefined,
    role: sessionStorage.getItem('role') ? sessionStorage.getItem('role') : undefined,
    username: sessionStorage.getItem('username') ? sessionStorage.getItem('username') : undefined,
    displayName: sessionStorage.getItem('display_name') ? sessionStorage.getItem('display_name') : undefined,
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
      location.reload()
    }
  },
});
