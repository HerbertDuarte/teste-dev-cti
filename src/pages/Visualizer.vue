<script setup>
import '../index.css'
import DataList from 'src/components/DataList.vue'
</script>

<template>
  <main >
    <!-- <q-banner dense inline-actions class="text-white bg-red w-full">
      You have lost connection to the internet. This app is offline.
    </q-banner> -->
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
