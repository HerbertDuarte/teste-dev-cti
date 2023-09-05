// src/boot/verifyToken.js
import { api } from "./axios";
import { useTokenStore } from "src/stores/token";

export default async function (config) {
  try {
    const store = await initTokenStore();

    const token = sessionStorage.getItem('access_token');
    const oldToken = { "oldToken": token };
    const response = await api.post('/refresh/token', oldToken);
    const newAccessToken = response.data.hash;

    sessionStorage.setItem('access_token', newAccessToken);
    await store.setToken(newAccessToken);

    return api({
      ...config,
      headers : {
        'Authorization': `Bearer ${newAccessToken}`
      }
      });
  } catch (error) {
    console.error(error);
  }
}

async function initTokenStore() {
  const store = useTokenStore();
  await store.$state; // Aguarda a inicialização do store
  return store;
}

