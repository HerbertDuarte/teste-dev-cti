<script setup>
import '../index.css'
</script>

<template>
  <main>
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Ops! Nada aqui</h1>
    <RouterLink to="/" class="bg-blue-100 border border-blue-500 text-blue-600 text-xl px-3 py-2 rounded inline-block w-full sxs:w-auto hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40">
      Voltar
    </RouterLink>
  </main>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>
