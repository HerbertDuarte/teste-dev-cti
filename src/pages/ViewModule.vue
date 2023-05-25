<script setup>
import '../index.css'
</script>

<template>

  <main class="p-4">

    <div class="border m-2 w-full mx-auto max-w-[700px] rounded" v-if="data">
      <h1 class="sm:text-2xl text-xl p-2 bg-slate-600 text-white/80">Tabela de notas - Módulo {{ $route.params.id }}</h1>
      <div>
        <p class="flex justify-between items-center border-t p-2 font-semibold bg-slate-50"><span class="w-[40%]">Nome </span> <span>Nota</span> <span class="sm:px-2 sxs:px-3 px-4">Ação</span></p>
        <p class="flex justify-between items-center border-t p-2" v-for="student in data">
          <span class="w-[45%]">{{ student.name }}</span>
          <span v-if="student.score">{{student.score}}</span>
          <span v-if="!student.score">Sem nota</span>
          <RouterLink :to="`/edit/confirm/${student.id }/${$route.params.id}`" class="min-w-[80px] text-center bg-blue-500 text-white p-2  rounded">
            Editar
          </RouterLink>
        </p>
      </div>
    </div>

    <div v-if="formError" class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-3 rounded w-[90%]  max-w-[600px]">
      {{ formError }}
    </div>
  </main>

</template>
<script >

  export default {
    data () {
      return {
        data : [],
        formError : '',
        textButton : 'Cancelar'
      }
    },
    methods: {

      async fetchData (){
        const url = 'http://localhost:9001/students/list'

        const data = await fetch(url)
        const response = await data.json()


        if(this.$route.params.id == 1){
          console.log('route 1')
          this.data = response.map((student) =>( { name : student.name, score : student.score.module1, id : student.id}))
        }
        if(this.$route.params.id == 2){
          console.log('route 2')
          this.data = response.map((student) =>( { name : student.name, score : student.score.module2, id : student.id}))
        }
        if(this.$route.params.id == 3){
          console.log('route 3')
          this.data = response.map((student) =>( { name : student.name, score : student.score.module3, id : student.id}))
        }
      },
    },
    mounted() {
      this.fetchData()
    }
  }
</script>
