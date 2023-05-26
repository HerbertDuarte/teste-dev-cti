<script setup>
import '../index.css'
import DataList from 'src/components/DataList.vue';
import SearchBar from 'src/components/SearchBar.vue';
</script>

<template>
  <main>
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
