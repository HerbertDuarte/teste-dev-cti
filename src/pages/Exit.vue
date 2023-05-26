<script setup>
  import {RouterLink} from 'vue-router'
</script>

<template>
  <main>
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Deseja sair da sua conta?</h1>
    <div class="space-x-2">
      <RouterLink class="bg-blue-500 text-white rounded-[7px] px-4 py-3 cursor-pointer" to="/dashboard">Voltar</RouterLink>
      <button class="bg-red-500 text-white rounded-[7px] px-5 py-[10px] cursor-pointer hover:opacity-80 duration-300" v-on:click="handleClick">Sair</button>
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
