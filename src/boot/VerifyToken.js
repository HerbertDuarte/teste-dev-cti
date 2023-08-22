import { storeToRefs } from "pinia";
import { api } from "./axios";
import { useTokenStore } from "src/stores/token";

const store = useTokenStore()
const {setToken} = store

const {token} = storeToRefs(store)

export default async function verifyToken(config) {
  try {
    const oldToken = {"oldToken" : token.value};
    const response = await api.post('/refresh/token',  oldToken );
    const newAccessToken = response.data.access_token;
    console.log(response.data.access_token)
    sessionStorage.setItem('access_token', newAccessToken)
    setToken(newAccessToken)

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

