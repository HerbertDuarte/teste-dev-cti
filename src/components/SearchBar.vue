<script setup>
  import { RouterLink } from 'vue-router';
</script>

<template>
  <form v-on:submit="$event => handleSubmit($event)" class="flex flex-row justify-center items-start gap-3 p-4 w-full max-w-[600px] mx-auto">
    <input required placeholder="Pesquise usando o nome" type="text" name="search" id="search" v-model="query" class="flex-1 l bg-slate-200 p-2 rounded">
    <input type="submit" value='Pesquisar' class="bg-blue-500 text-white rounded-[7px] px-4 py-2 cursor-pointer hover:shadow-lg hover:shadow-blue-500/40">
  </form>
</template>

<script>

  export default {
    name: 'SearchBar',
    data(){
      return {
        query : '',
        reload : this.reloadPage
      }
    },
    methods : {
      handleSubmit(e) {
        e.preventDefault()
        this.$route.params.name = this.query
        this.$router.push('/search?query=' + this.query)
        if(this.reload){
          location.reload()
          this.$router.push('/search?query=' + this.query)
        }
      }
    },
  }
</script>
