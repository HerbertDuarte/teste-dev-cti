<script setup>
import DataList from 'src/components/DataList.vue';
</script>

<template>
  <main>
    <DataList :single="$route.params.id"/>
  </main>
</template>
