<script setup>
import '../index.css'
import SearchBar from 'src/components/SearchBar.vue';
import DataList from 'src/components/DataList.vue'
</script>

<template>
  <main >
    <h1 class="text-4xl text-slate-700 py-4">Pesquise por alunos</h1>
    <SearchBar/>
    <DataList method="visualizer" v-bind:students="students"/>
  </main>
</template>

<script>
  export default {
    name : 'Visualizer',
    data() {
      return{
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
    }
  }
</script>
