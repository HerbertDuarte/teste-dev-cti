<script setup>
import '../index.css'
import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="justify-start items-center p-3">

    <h1 class="sm:text-4xl text-3xl text-left w-full mx-auto max-w-3xl text-slate-700 py-6">Painel de Controle</h1>

    <section class="flex gap-3 w-full max-w-[750px]">

      <RouterLink class="flex-1 inline-block bg-orange-8 p-4 pr-24 pb-20 rounded" to="/visualizer">
        <p class="text-white font-medium text-xl">Alunos</p>
      </RouterLink>

      <RouterLink class="flex-1 inline-block bg-cyan-8 p-4 pr-24 pb-20 rounded" to="register">
        <p class="text-white font-medium text-xl">Cadastrar Aluno</p>
      </RouterLink>

      <RouterLink class="flex-1 inline-block bg-teal-8 p-4 pr-24 pb-20 rounded" to="modules">
        <p class="text-white font-medium text-xl">Módulos</p>
      </RouterLink>

    </section>

  </main>
</template>
