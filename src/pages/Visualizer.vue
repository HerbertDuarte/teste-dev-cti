<script setup>
import '../index.css'
import DataList from 'src/components/DataList.vue'
</script>

<template>
  <main >
    <DataList method="visualizer"/>
  </main>
</template>

<script>

  export default {
    name : 'Visualizer',
    data() {
      return{
      }
    }
  }
</script>
