<template>
  <login v-if="!auth"/>
  <router-view v-if="auth"/>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import Login from './pages/Login.vue';
import { Screen } from 'quasar'
import { storeToRefs } from 'pinia';
import { useTokenStore } from './stores/token';
Screen.setSizes({ sm: 350, md: 500, lg: 1000, xl: 2000 })

const tokenRef = ref()
const auth = ref()


onBeforeMount(() => {

  const store = useTokenStore()
  const {token} = storeToRefs(store)
  const {setToken} = store
  tokenRef.value = token

  if(sessionStorage.getItem('access_token') && token){
    setToken(sessionStorage.getItem('access_token'))
    auth.value = sessionStorage.getItem('access_token')
  }

  if(sessionStorage.getItem('access_token') == 'undefined'){
    sessionStorage.removeItem("access_token")
  }
})

</script>
