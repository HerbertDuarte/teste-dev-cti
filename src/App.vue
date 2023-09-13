<template>
  <login v-if="!auth"/>
  <router-view v-if="auth && role == 'admin'"/>

  <user-layout v-if="auth && role == 'user'">
    <user-page :user="username" />
  </user-layout>

</template>

<script setup>
import UserPage from './pages/UserPage.vue';
import UserLayout from './layouts/UserLayout.vue';
import { onBeforeMount, ref } from 'vue'
import Login from './pages/Login.vue';
import { Screen } from 'quasar'
import { storeToRefs } from 'pinia';
import { useTokenStore } from './stores/token';
Screen.setSizes({ sm: 350, md: 500, lg: 1000, xl: 2000 })

const tokenRef = ref()
const auth = ref()
const role = ref()
const username = ref()

onBeforeMount(() => {

  const store = useTokenStore()
  const {token} = storeToRefs(store)
  const {setRole, setToken, setUserName,setDisplayName, logout} = store
  tokenRef.value = token

  if(!token || !(sessionStorage.getItem('access_token')) || (sessionStorage.getItem('access_token')) == 'undefined' || token == 'undefined'){
    logout()
  }else{
    setToken(sessionStorage.getItem('access_token'))
    auth.value = sessionStorage.getItem('access_token')
    setRole(sessionStorage.getItem('role'))
    role.value = sessionStorage.getItem('role')
    setUserName(sessionStorage.getItem('username'))
    username.value = sessionStorage.getItem('username')
    setDisplayName(sessionStorage.getItem('display_name'))
  }
})

</script>
