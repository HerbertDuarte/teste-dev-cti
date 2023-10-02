import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: String(process.env.API_URL) })

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('access_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$api = api
})

export { api }
