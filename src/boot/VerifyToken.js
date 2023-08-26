import { api } from "./axios";
import { useTokenStore } from "src/stores/token";

const store = useTokenStore()
const {setToken} = store

export default async function verifyToken(config) {
  try {
    const token = sessionStorage.getItem('access_token')
    const oldToken = {"oldToken" : token.value};
    const response = await api.post('/refresh/token',  oldToken );
    const newAccessToken = response.data.access_token;
    sessionStorage.setItem('access_token', newAccessToken)
    setToken(newAccessToken)

    return api({
      ...config,
      headers : {
        'Authorization': `Bearer ${newAccessToken}`
      }
      });
  } catch (error) {
    console.log(error)
  }
}

