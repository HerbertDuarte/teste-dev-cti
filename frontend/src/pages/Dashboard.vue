<script setup>
import '../index.css'
import { RouterLink } from 'vue-router';
</script>

<template>
  <main>

    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Painel de Controle</h1>

    <section class="flex justify-center items-center p-3 w-[90%] max-w-[750px]">

      <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full" to="/register">
        Cadastrar
      </RouterLink>
      <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full" to="/visualizer">
        Visualizar
      </RouterLink>
      <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full" to="/edit">
        Editar
      </RouterLink>
      <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full" to="/delete">
        Excluir
      </RouterLink>
      <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full" to="/modules">
        Gerir módulos
      </RouterLink>

    </section>

  </main>
</template>
