<script setup>
import '../index.css'
import SearchBar from 'src/components/SearchBar.vue';
import DataList from 'src/components/DataList.vue'
</script>

<template>
  <main >
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Exclua um aluno</h1>
    <SearchBar/>
    <DataList method="delete"/>
  </main>
</template>

<script>

export default {
  name : 'Delete',
  data() {
    return{

    }
  }
}
</script>

