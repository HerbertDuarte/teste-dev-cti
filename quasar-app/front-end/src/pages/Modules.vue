<script setup>
import '../index.css'
import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="p-3">
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Gerenciador de módulos</h1>
      <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500/80 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full" to="/">
        Módulo 1
      </RouterLink>
      <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500/80 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full" to="/">
        Módulo 2
      </RouterLink>
      <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500/80 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full" to="/">
        Módulo 3
      </RouterLink>
  </main>
</template>
