<script setup>
import '../index.css'
import DataList from 'src/components/DataList.vue';
import SearchBar from 'src/components/SearchBar.vue';
</script>

<template>
  <main>
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Edite um aluno</h1>
    <SearchBar/>
    <DataList method="edit"/>
  </main>
</template>

<script>

export default {
  name : 'Edit',
  data() {
    return{
    }
  }
}
</script>
