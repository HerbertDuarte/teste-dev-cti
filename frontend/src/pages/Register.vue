<script setup>
import '../index.css'
import { RouterLink } from 'vue-router';
</script>

<template>
  <main>
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Cadastre um aluno</h1>
    <form v-on:submit="handleSubmit" class="flex flex-col justify-center items-start gap-3 border-2 p-4 w-[90%] max-w-[600px] mx-auto rounded ">
      <label for="user">Nome</label>
      <input placeholder="Digite o nome do aluno" v-model="name_value" required class="w-full bg-slate-200 p-2 rounded" type="text" name="user" id="user">
      <label for="cpf">CPF</label>
      <input  placeholder="Digite o CPF do aluno" v-model="cpf_value" required class="w-full bg-slate-200 p-2 rounded" type="number" name="cpf" id="cpf">
      <label for="date">Data de nascimento</label>
      <input  v-model="date_value" required class="w-full bg-slate-200 p-2 rounded" type="date" name="date" id="date">

      <!-- scores -->
      <!-- <label for="module1">Nota - módulo1</label>
      <input min="0" max="10" v-model="score_value.score1 " required class="w-full bg-slate-200 p-2 rounded" type="number" step="0.1" name="module1" id="module1">
      <label for="module2">Nota - módulo2</label>
      <input min="0" max="10" v-model="score_value.score2 " required class="w-full bg-slate-200 p-2 rounded" type="number" step="0.1" name="module2" id="module2">
      <label for="module3">Nota - módulo3</label>
      <input min="0" max="10" v-model="score_value.score3 " required class="w-full bg-slate-200 p-2 rounded" type="number" step="0.1" name="module3" id="module3"> -->

      <div class="space-x-2">
        <input class="bg-blue-500 text-white rounded-[7px] px-4 py-2 cursor-pointer hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300" type="submit" value="Cadastrar">
        <RouterLink class="bg-red-400 text-white rounded-[7px] px-4 py-[10px] cursor-pointer hover:shadow-lg hover:shadow-red-400/40 transition-all duration-300" to="/dashboard">
          Cancelar
        </RouterLink>
      </div>
    </form>
    <div v-if="formError" class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-3 rounded w-[90%]  max-w-[600px]">
      Erro: {{ formError }}
    </div>
    <div v-if="formSuccess" class="bg-teal-400 text-white border-4 border-teal-500/60 p-2 m-3 rounded w-[90%]  max-w-[600px]">
     {{ formSuccess }}
    </div>
  </main>
</template>

<script>

import axios from 'axios';

export default {
  data () {
    return {
      student : null,
      name_value: '',
      date_value: null,
      cpf_value: '',
      score_value : {},
      formError : '',
      formSuccess: ''
    }
  },
  methods : {
    async handleSubmit (e){

      e.preventDefault()
      const url = 'http://localhost:9001/students/create'

      this.student = {
        name : this.name_value,
        cpf : this.cpf_value.toString(),
        date : new Date(this.date_value),
      }

      console.log(this.student)

      // validations --start

      if(this.cpf_value.toString().length !== 11){
        this.formError = 'Digite um CPF válido'
        return
      }
      // validations --end

        axios.post(url, this.student)
        .then(response => {
          console.log(response.data)
          this.formSuccess = 'Aluno registrado com sucesso'
          this.formError = ''

          this.name_value =''
          this.date_value = ''
          this.cpf_value = ''
        })
        .catch(error => {
          this.formError = error.message
          this.formSuccess = ''
        });
      }
  }
}
</script>
