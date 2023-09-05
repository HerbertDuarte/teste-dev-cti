// src/boot/pinia.js
import { boot } from 'quasar/wrappers'

import { createPinia } from 'pinia'

export default boot(({ app }) => {
  // Crie uma instância do Pinia
  const pinia = createPinia()
  // Registre o Pinia na instância do aplicativo Quasar
  app.config.globalProperties.$pinia = pinia
})


