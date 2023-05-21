<script setup>
import '../index.css'
import { RouterLink } from 'vue-router';
</script>

<template>
  <main >
    <h1 class="sm:text-3xl text-2xl text-slate-700 p-4">Tem certeza que deseja excluir o cadastro de <span class="font-bold">{{students[$route.params.id].name}}</span></h1>
    <div class="space-x-2 py-3">
        <RouterLink to="/delete" class="bg-blue-500 text-white rounded-[7px] px-4 py-3 cursor-pointer hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300">
          Excluir
        </RouterLink>
        <RouterLink to='/delete' class="bg-red-400 text-white rounded-[7px] px-4 py-3 cursor-pointer hover:shadow-lg hover:shadow-red-400/40 transition-all duration-300">
          Cancelar
        </RouterLink>
      </div>
  </main>
</template>

<script>

  import { students } from 'src/Students';

  export default {
    data () {
      return {
        students
      }
    }
  }

</script>
