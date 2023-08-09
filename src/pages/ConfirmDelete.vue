<script setup>
import '../index.css'
import { RouterLink  } from 'vue-router';
</script>

<template>
  <main >
    <div v-if="!formSuccess" class="space-x-2 py-3 text-center">
      <h1 v-if="student" class="sm:text-3xl text-2xl text-slate-700 p-4 max-w-[600px]">Tem certeza que deseja excluir o cadastro de <span class="font-bold">{{student.name}}</span></h1>
        <q-btn color="negative" v-on:click="handleClick">
          Excluir
        </q-btn>
        <q-btn @click="$router.back" color="secondary">
          Cancelar
        </q-btn>
      </div>
      <div v-if="formSuccess && !formError" class="max-w-[600px] w-full flex justify-center ">
        <div class="bg-green-500 text-white/80 border-4 border-green-600/60 p-2 m-3 rounded w-[90%]">
        {{ formSuccess }}
        </div>
        <q-btn color="primary" to="/delete">
          Voltar
        </q-btn>
      </div>
      <div v-if="!formSuccess && formError" class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-3 rounded w-[90%]  max-w-[600px]">
      Erro: {{ formError }}
      </div>
      <RouterLink  v-if="formError" to='/delete' class="bg-blue-400 text-white rounded-[7px] px-4 py-3 cursor-pointer hover:shadow-lg hover:shadow-blue-400/40 transition-all duration-300 mx-auto">
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
        formSuccess: ''
      }
    },
    methods: {

      async fetchData (){

        const url = 'http://localhost:3000/students/list/' + this.$route.params.id

        const data = await fetch(url)
        const response = await data.json()

        this.student = response

      },
      handleClick(){

        const url = 'http://localhost:3000/students/delete/' + this.$route.params.id

        axios.delete(url)
        .then(() => {
          this.formSuccess = 'Registro excluído com sucesso'
        })
        .catch(error => {
          this.formError = error.message
        });

        // this.$router.push('/delete/success')
      }

    },
    mounted() {
       this.fetchData()
    }
  }

</script>
