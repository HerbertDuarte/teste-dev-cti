<script setup>
import '../index.css'
import DataList from 'src/components/DataList.vue';
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
