<script setup>
import '../index.css'
import { RouterLink  } from 'vue-router';
</script>

<template>
  <main v-if="!formEnd" >
    <h1 v-if="student" class="sm:text-3xl text-2xl text-slate-700 p-4 max-w-[600px]">Tem certeza que deseja excluir o cadastro de <span class="font-bold">{{student.name}}</span></h1>
      <div v-if="!formError && !formSuccess" class="space-x-2 py-3">
        <button v-on:click="handleClick" to="/delete" class="bg-blue-500 text-white rounded-[7px] px-4 py-[10px] cursor-pointer hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300">
          Excluir
        </button>
        <RouterLink to='/delete' class="bg-red-400 text-white rounded-[7px] px-4 py-3 cursor-pointer hover:shadow-lg hover:shadow-red-400/40 transition-all duration-300">
          Cancelar
        </RouterLink>
      </div>
      <div v-if="formError" class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-3 rounded w-[90%]  max-w-[600px]">
      Erro: {{ formError }}
      </div>
      <RouterLink  v-if="formError" to='/delete' class="bg-blue-400 text-white rounded-[7px] px-4 py-3 cursor-pointer hover:shadow-lg hover:shadow-blue-400/40 transition-all duration-300 mx-auto">
          Voltar
      </RouterLink>
  </main>
  <main v-if="formEnd">
    <h1 class="sm:text-3xl text-2xl text-slate-700 py-3">Registro deletado com sucesso!</h1>
      <RouterLink to='/delete' class="bg-teal-500 text-white rounded-[7px] px-4 py-2 cursor-pointer hover:shadow-lg hover:shadow-teal-500/40 transition-all duration-300 mx-auto">
          Voltar
      </RouterLink>
  </main>
</template>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        student : null,
        formError : '',
        formEnd : false
      }
    },
    methods: {

      async fetchData (){

        const url = 'http://localhost:9001/students/list/' + this.$route.params.id

        const data = await fetch(url)
        const response = await data.json()

        this.student = response

      },
      handleClick(){

        const url = 'http://localhost:9001/students/delete/' + this.$route.params.id

        axios.delete(url)
        .then(() => {
          this.formEnd = true
          this.formError = ''
        })
        .catch(error => {
          this.formError = error.message
        });

      }

    },
    mounted() {
       this.fetchData()
    }
  }

</script>
