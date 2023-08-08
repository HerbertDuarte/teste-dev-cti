<script setup>
import { RouterLink } from 'vue-router';
import Loading from './Loading.vue';
import SearchBar from 'src/components/SearchBar.vue';
</script>

<template>
  <section class="flex items-center justify-center p-2 max-w-[600px] 2xs:mx-auto w-full">
    <h1 v-if="method == 'visualizer'" class="sm:text-4xl text-3xl text-slate-700 py-4">Pesquise por alunos</h1>
    <h1 v-if="method == 'edit'" class="sm:text-4xl text-3xl text-slate-700 py-4">Edite o cadastro de um aluno</h1>
    <h1 v-if="method == 'delete'" class="sm:text-4xl text-3xl text-slate-700 py-4">Delete o cadastro de um aluno</h1>
    <SearchBar />

      <q-card class="my-card bg-white text-black w-full my-3 mx-4" v-if="students" v-for="student in students">

        <q-card-section>
          <p class="max-w-[290px]"><span class="font-semibold">Nome : </span>{{ student.name }}</p>
          <p><span class="font-semibold">Data de nascimento : </span>{{ new Date(student.date).toLocaleDateString("pt-BR") }}</p>
          <p><span class="font-semibold">CPF :</span> {{ student.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4") }}</p>
        </q-card-section>

        <q-card-actions>
          <RouterLink :to="`/visualizer/${student.id}`" v-if="method == 'visualizer'">
          <q-btn color="primary">Ver mais</q-btn>
        </RouterLink>
        <RouterLink :to="`/edit/confirm/${student.id}`" v-if="method == 'edit'">
          <q-btn color="primary">Editar</q-btn>
        </RouterLink>
        <RouterLink :to="`/delete/confirm/${student.id}`" v-if="method == 'delete'">
          <q-btn color="negative">Excluir</q-btn>
        </RouterLink>
        </q-card-actions>
      </q-card>
    <Loading v-if="loading" />
    <div v-if="fetchError"
      class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-2 rounded w-full  max-w-[600px]">
      Erro: {{ fetchError }}
    </div>
  </section>
</template>

<script>

export default {
  name: 'DataList',
  data() {
    return {
      students: null,
      media: null,
      fetchError: '',
      loading: false
    }
  },
  props: [
    'method',
    'single',
  ],
  methods: {
    async fetchData() {

      const url = 'http://localhost:3000/students/list'
      let response
      this.loading = true

      try {
        const data = await fetch(url)
        response = await data.json()
        this.fetchError = ''
        this.students = response
      } catch (error) {
        this.fetchError = 'Houve um erro inesperado! Tente novamente mais tarde!'
      }
      this.loading = false
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
