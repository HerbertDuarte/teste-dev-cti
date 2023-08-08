<script setup>
import '../index.css'

import DataList from 'src/components/DataList.vue'
</script>

<template>
  <main >
    <main >
    <h1 class="sm:text-3xl text-2xl text-slate-700 py-3">Registro deletado com sucesso!</h1>
    <q-btn color="primary">
      <RouterLink to='/delete' >
        Voltar
      </RouterLink>
    </q-btn>
  </main>
  </main>
</template>

<script>

export default {
  name : 'SuccessDelete',
  data() {
    return{

    }
  }
}
</script>

