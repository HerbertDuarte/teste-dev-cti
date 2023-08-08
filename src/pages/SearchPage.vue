<script setup>
import axios from 'axios';
import '../index.css'

</script>

<template>
  <main class="sm:p-4 p-2">
    <!-- search bar -->
    <form class="flex flex-row justify-center items-start gap-3 p-4 w-full max-w-[600px] mx-auto">
      <q-input class="flex-1 px-2" dense="dense" required placeholder="Pesquise usando o nome" type="text" name="query" id="query" v-model="query" />
      <q-btn color="primary" type="submit">Pesquisar</q-btn>
    </form>
    <!-- search bar -->
    <h1 class="sm:text-3xl text-2xl text-slate-700 py-4 px-3">
      Resultados de pesquisa para :
      <span class="font-semibold">{{ this.$route.query.query }}</span>
    </h1>
    <div v-if="error" class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-3 rounded w-[90%]  max-w-[600px]">
      Erro: {{ error }}
    </div>
      <section class="flex items-center justify-center p-2 max-w-[600px] 2xs:mx-auto w-full">
        <q-card class="my-card bg-white text-black w-full my-3 mx-4" v-if="students" v-for="student in students">
        <q-card-section>
          <div class="text-h6"> {{ student.name }}</div>
          <!-- <p class="font-semibold text-green-600" v-if="student.media >= 5">Aprovado(a)</p>
          <p class="font-semibold text-red-600" v-if="student.media < 5">Reprovado(a)</p>
          <p class="font-semibold text-purple-800" v-if="isNaN(student.media)">Sem notas</p> -->
        </q-card-section>

        <q-card-section>
          <p class="max-w-[290px]"><span class="font-semibold">Nome : </span>{{ student.name }}</p>
          <p><span class="font-semibold">Data de nascimento : </span>{{ new Date(student.date).toLocaleDateString("pt-BR") }}</p>
          <p><span class="font-semibold">CPF :</span> {{ student.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4") }}</p>
        </q-card-section>

        <q-card-actions class="space-x-2">
          <RouterLink :to="`/visualizer/${student.id}`" >
          <q-btn color="positive">Ver mais</q-btn>
        </RouterLink>
        <RouterLink :to="`/edit/confirm/${student.id}`" >
          <q-btn color="primary">Editar</q-btn>
        </RouterLink>
        <RouterLink :to="`/delete/confirm/${student.id}`">
          <q-btn color="negative">Excluir</q-btn>
        </RouterLink>
        </q-card-actions>
      </q-card>
      <div class="flex flex-col xs:flex-row xs:items-center gap-3 justify-between p-3 border m-2 w-full rounded" v-if="students && students.length == 0">
        <p>Nada encontrado!</p>
      </div>
    </section>
  </main>
</template>

<script>

  export default {
    name : 'DataList',
    data(){
      return{
        media : null,
        students : null,
        situation: null,
        error : '',
        query : '',
        input_value : ''
      }
    },
    props : [
      'method',
      'single',
    ],
    methods : {
      async fetchData() {
        const url = `http://localhost:3000/students/find?name=${this.$route.query.query}`;

        try {
          const response = await axios.get(url);
          // console.log(response.data)
          this.students = response.data
          this.error = '';
        } catch (error) {
          this.error = 'Nenhum usuário encontrado! ' + error.message;
        }
      },

    },
    mounted(){
      this.fetchData()
      this.query = this.$route.params.name
    }
  }
</script>
