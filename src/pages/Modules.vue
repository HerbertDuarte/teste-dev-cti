<script setup>
import '../index.css'
import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="p-5">
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Gerenciador de módulos</h1>
      <div class="space-y-3 flex flex-col w-full max-w-md">
        <q-btn color="primary" class="text-xl rounded-lg">
          <RouterLink to="/modules/view/1">
            Módulo 1
          </RouterLink>
        </q-btn>
        <q-btn color="primary" class="text-xl rounded-lg">
          <RouterLink to="/modules/view/2">
            Módulo 2
          </RouterLink>
        </q-btn>
        <q-btn color="primary" class="text-xl rounded-lg">
          <RouterLink to="/modules/view/3">
            Módulo 3
          </RouterLink>
        </q-btn>
      </div>
  </main>
</template>
