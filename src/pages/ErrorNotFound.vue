<script setup>
import '../index.css'
</script>

<template>
  <main>
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Ops! Nada aqui</h1>
    <q-btn color="primary" @click="$router.back" >
      Voltar
    </q-btn>
  </main>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>
