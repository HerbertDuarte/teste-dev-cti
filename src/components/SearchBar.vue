<script setup>
  import { RouterLink } from 'vue-router';
</script>

<template>
  <form v-on:submit="$event => handleSubmit($event)" class="flex flex-row justify-center items-start gap-3 p-4 w-full max-w-[600px] mx-auto">
    <q-input class="flex-1 px-2" dense="dense" required placeholder="Pesquise usando o nome" type="text" name="search" id="search" v-model="query" />
    <q-btn color="primary" type="submit">
      <q-icon name="search"/>
    </q-btn>
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
