import { api } from "./axios";
import { useTokenStore } from "src/stores/token";

const store = await useTokenStore()
const {setToken} = store

export default async function verifyToken(config) {
  try {
    const token = await sessionStorage.getItem('access_token')
    const oldToken = {"oldToken" : token.value};
    const response = await api.post('/refresh/token',  oldToken );
    const newAccessToken = await response.data.access_token;
    await sessionStorage.setItem('access_token', newAccessToken)
    await setToken(newAccessToken)

    return api({
      ...config,
      headers : {
        'Authorization': `Bearer ${newAccessToken}`
      }
      });
  } catch (error) {
    console.log('axios error : ' + error)
    throw error;
  }
}

