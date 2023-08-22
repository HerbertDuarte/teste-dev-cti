import { api } from "./axios";
import { useTokenStore } from 'src/stores/token'
import { mapActions, storeToRefs } from 'pinia'

const tokenStore = useTokenStore()

const {token} = storeToRefs(tokenStore)

const {setToken} = mapActions(tokenStore, ['setToken'])

export default async function verifyToken(config) {
  try {
    const oldToken = token;
    const response = await api.post('/refresh/token', { oldToken });
    const newAccessToken = response.data.access_token;
    sessionStorage.setItem('access_token', newAccessToken)
    setToken(newAccessToken)

    return api(config);
  } catch (error) {
    console.log('axios error : ' + error)
    throw error;
  }
}

