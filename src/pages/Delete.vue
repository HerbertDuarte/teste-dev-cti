<script setup>
import '../index.css'
import SearchBar from 'src/components/SearchBar.vue';
import DataList from 'src/components/DataList.vue'
</script>

<template>
  <main >
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

