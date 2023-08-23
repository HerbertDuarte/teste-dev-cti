<script setup>
import '../index.css'
import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="justify-start items-center p-3">

    <h1 class="sm:text-3xl text-2xl text-left w-full mx-auto max-w-3xl text-slate-700 py-6">Painel de Controle</h1>

    <section class="flex gap-3 w-full max-w-[750px]">

      <RouterLink class="flex-1 inline-block bg-orange-6 p-4 pr-24 pb-20 rounded shadow-md" to="/visualizer">
        <p class="text-white font-medium text-xl">Alunos</p>
      </RouterLink>

      <RouterLink class="flex-1 inline-block bg-cyan-9 p-4 pr-24 pb-20 rounded shadow-md" to="modules">
        <p class="text-white font-medium text-xl">Módulos</p>
      </RouterLink>
    </section>
  </main>
</template>
