

<template>
  <router-view v-if="auth == 'true' && user && user.id"/>
  <login v-if="auth == 'false'|| !auth ||  !user || !user.id"/>
</template>

<script>
import { defineComponent } from 'vue'
import { store } from './store';
import { provide } from 'vue';
import Login from './pages/Login.vue';

export default defineComponent({
    name: "App",
    data() {
        return {
            auth: store.auth,
            user : JSON.parse(store.user)
        };
    },
    setup() {
      provide("store", store);
    },
    components: { Login }
})
</script>
