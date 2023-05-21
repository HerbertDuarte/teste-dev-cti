<script setup>
import '../index.css'
import { RouterLink } from 'vue-router';
</script>

<template>
  <main>

    <h1 class="text-4xl text-slate-700 py-4">Painel de Controle</h1>

    <section class="flex justify-center items-center p-3 w-[90%] max-w-[750px]">

      <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500/80 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full" to="/register">
        Registrar
      </RouterLink>
      <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500/80 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full" to="/visualizer">
        Visualizar
      </RouterLink>
      <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500/80 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full" to="/edit">
        Editar
      </RouterLink>
      <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500/80 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full" to="/delete">
        Excluir
      </RouterLink>
      <RouterLink class="border-2 border-blue-500/80 text-blue-500/80 rounded-[7px] p-4 m-2 inline-block cursor-pointer text-2xl hover:bg-blue-500/80 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 sm:w-52 text-center w-full" to="/modules">
        Gerir módulos
      </RouterLink>

    </section>

  </main>
</template>

<script>
export default {
    data(){
      return {
        alunos: null,
        students : [
          {
            id : 0,
            name : 'Ana Santos',
            cpf : '00976576543',
            date : '12-12-2005'
          },
          {
            id : 1,
            name : 'João Gabriel',
            cpf : '00976576643',
            date : '14-10-2005'
          },
          {
            id : 2,
            name : 'Arthur Maia',
            cpf : '00911576543',
            date : '01-04-2005'
          },
          {
            id : 3,
            name : 'José Xavier',
            cpf : '00976234543',
            date : '12-03-2005'
          },
        ]
      }
    },
  }

</script>
