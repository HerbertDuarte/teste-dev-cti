<template>
  <login v-if="!auth"/>
  <router-view v-if="auth"/>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Login from './pages/Login.vue';
import { Screen } from 'quasar'
import { storeToRefs } from 'pinia';
import { useTokenStore } from './stores/token';
Screen.setSizes({ sm: 350, md: 500, lg: 1000, xl: 2000 })

const tokenRef = ref(undefined)
const auth = ref(undefined)


onMounted(() => {

  const store = useTokenStore()
  const {setToken} = store
  tokenRef.value = storeToRefs(store)
  if(sessionStorage.getItem('access_token')){
    setToken(sessionStorage.getItem('access_token'))
    auth.value = sessionStorage.getItem('access_token')
  }
})

</script>
