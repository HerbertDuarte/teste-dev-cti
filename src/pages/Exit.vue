<script setup>
  import {RouterLink} from 'vue-router'
</script>

<template>
  <main>
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Deseja sair da sua conta?</h1>
    <div class="space-x-2">
      <RouterLink to="/">
        <q-btn color="primary">
        Voltar
        </q-btn>
      </RouterLink>

      <q-btn v-on:click="handleClick" color="negative">
        Sair
      </q-btn>
    </div>
  </main>
</template>
<script>

export default {
  data(){
    return{

    }
  },
  methods :{
    handleClick(){
      localStorage.setItem('user', 'null')
      localStorage.setItem('auth', 'false')
      this.reloadPage()
    },
    reloadPage() {
      location.reload();
    },
  },
}
</script>
