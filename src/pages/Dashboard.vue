<script setup>
import '../index.css'
import { RouterLink } from 'vue-router';
</script>

<template>
  <main>

    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Painel de Controle</h1>

    <section class="flex justify-center items-center p-3 w-[90%] max-w-[750px]">

      <q-btn class="sm:w-52 w-full m-1 rounded-lg" color="primary" outline size="xl">
        <RouterLink to="/register">
          Cadastrar
        </RouterLink>
      </q-btn>
      <q-btn class="sm:w-52 w-full m-1 rounded-lg" color="primary" outline size="xl">
        <RouterLink to="/visualizer">
          Visualizar
        </RouterLink>
      </q-btn>
      <q-btn class="sm:w-52 w-full m-1 rounded-lg" color="primary" outline size="xl">
        <RouterLink to="/edit">
          Editar
        </RouterLink>
      </q-btn>
      <q-btn class="sm:w-52 w-full m-1 rounded-lg" color="primary" outline size="xl">
        <RouterLink to="/delete">
          Excluir
        </RouterLink>
      </q-btn>
      <q-btn class="sm:w-52 w-full m-1 rounded-lg" color="primary" outline size="xl">
        <RouterLink to="/modules">
          Módulos
        </RouterLink>
      </q-btn>
      <!-- <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full bg-blue-50" to="/visualizer">
        Visualizar
      </RouterLink>
      <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full bg-blue-50" to="/edit">
        Editar
      </RouterLink>
      <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full bg-blue-50" to="/delete">
        Excluir
      </RouterLink>
      <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full bg-blue-50" to="/modules">
        Gerir módulos
      </RouterLink> -->

    </section>

  </main>
</template>
