<script setup>
import '../index.css'
import { RouterLink } from 'vue-router';
</script>

<template>
  <main v-if="student">
    <h1 class="sm:text-3xl text-2xl text-slate-700 py-4">Atualize os dados de <span class="font-bold">{{ student.name
    }}</span></h1>
    <form v-on:submit="handleSubmit"
      class="flex flex-col justify-center items-start gap-3 border-2 p-4 w-[90%] max-w-[600px] mx-auto rounded ">
      <q-input class="min-w-full" required v-model="name_value" type='text' label="Nome" />
      <q-input class="min-w-full" required v-model="cpf_value" type='text' pattern="\d{3}[.\s]?\d{3}[.\s]?\d{3}-?\d{2}"
        label="CPF" />
      <q-input class="min-w-full" required v-model="date_value" type='date' label="Data de nascimento" />
      <!-- <q-input class="min-w-full" required v-model="score_value.module1"  type='text' label="Nota - módulo 1" />
      <q-input class="min-w-full" required v-model="score_value.module2"  type='text' label="Nota - módulo 2" />
      <q-input class="min-w-full" required v-model="score_value.module3"  type='text' label="Nota - módulo 3" /> -->
      <div class="space-x-2">
        <q-btn color="primary" type="submit">
          Atualizar
        </q-btn>

        <q-btn @click="$router.back" color="negative">
          Voltar
        </q-btn>

      </div>
    </form>
    <div v-if="formError"
      class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-3 rounded w-[90%]  max-w-[600px]">
      Erro: {{ formError }}
    </div>
    <div v-if="formSuccess"
      class="bg-teal-400 text-white border-4 border-teal-500/60 p-2 m-3 rounded w-[90%]  max-w-[600px]">
      {{ formSuccess }}
    </div>
  </main>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      student: null,
      name_value: '',
      date_value: '',
      cpf_value: '',

      formError: '',
      formSuccess: '',
    }
  },
  methods: {

    async fetchData() {

      const url = 'http://localhost:3000/students/list/' + this.$route.params.id

      const data = await fetch(url)
      const response = await data.json()

      this.student = response

      this.name_value = this.student.name
      this.cpf_value = this.student.cpf
      this.date_value = this.student.date.substring(0, 10)
      // this.score_value = this.student.score
    },


    async handleSubmit(e) {

      e.preventDefault()

      const url = 'http://localhost:3000/students/update/' + this.$route.params.id

      this.student = {
        name: this.name_value,
        cpf: this.cpf_value.toString(),
        date: new Date(this.date_value),
        // score : this.score_value,
      }

      console.log(this.student)

      // validations --start

      if (this.cpf_value.toString().length !== 11) {
        this.formError = 'Digite um CPF válido'
        return
      }
      // validations --end


      axios.put(url, this.student)
        .then(response => {
          console.log(response.data)
          this.formSuccess = 'Registro atualizado com sucesso'
          this.formError = ''
        })
        .catch(error => {
          this.formError = error.message
          this.formSuccess = ''
        });

      this.textButton = 'Voltar'
    }
  },
  mounted() {
    this.fetchData()
  }
}

</script>
