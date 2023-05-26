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
    <SearchBar/>
      <div class="flex flex-col sxs:flex-row sxs:items-center gap-3 justify-between p-3 border m-2 w-full rounded" v-if="students" v-for="student in students">
        <div>
          <p class="max-w-[290px]"><span class="font-semibold">Nome :</span> {{ student.name }}</p>
          <p><span class="font-semibold">Data de nascimento: </span>({{ (student.date).substring(0,10) }})</p>
          <p><span class="font-semibold">CPF :</span> {{ student.cpf }}</p>
          <p class="font-semibold text-teal-600" v-if="student.media >= 5">Aprovado(a)</p>
          <p class="font-semibold text-red-600" v-if="student.media < 5">Reprovado(a)</p>
          <p class="font-semibold text-purple-800" v-if="isNaN(student.media)">Sem notas</p>
        </div>
        <div>
          <RouterLink :to="`/visualizer/${student.id }`" v-if="method == 'visualizer'" class="bg-teal-700/10 border border-teal-500 text-teal-600 p-2 rounded inline-block w-full sxs:w-auto hover:bg-teal-600 hover:text-white hover:shadow-lg hover:shadow-teal-700/40">
            Ver mais
          </RouterLink>
          <RouterLink :to="`/edit/confirm/${student.id }`" v-if="method == 'edit'" class="bg-blue-100 border border-blue-500 text-blue-600 p-2 rounded inline-block w-full sxs:w-auto hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40">
            Editar
          </RouterLink>
          <RouterLink :to="`/delete/confirm/${student.id }`" v-if="method == 'delete'" class="bg-red-100 border border-red-500 text-red-600 p-2 rounded inline-block w-full sxs:w-auto hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/40">
            Excluir
          </RouterLink>
        </div>
      </div>
      <Loading v-if="loading"/>
      <div v-if="fetchError" class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-2 rounded w-full  max-w-[600px]">
        Erro: {{ fetchError }}
      </div>
    </section>
</template>

<script>

  export default {
    name : 'DataList',
    data(){
      return{
        students : null,
        media : null,
        fetchError : '',
        loading : false
      }
    },
    props : [
      'method',
      'single',
    ],
    methods : {
      async fetchData (){

        const url = 'http://localhost:9001/students/list'
        let response
        this.loading = true

        try {
          const data = await fetch(url)
          response = await data.json()
          this.fetchError = ''
          this.students = response.map(student => {
          if(Object.keys(student).length !== 0){
            const media = Number((((student.score.module1)+(student.score.module2) +(student.score.module3)) / 3).toFixed(1))
            student.media = media
            return student
          }
        })
        } catch (error) {
          this.fetchError = 'Houve um erro inesperado! Tente novamente mais tarde!'
        }
        this.loading = false
      }
    },
    mounted(){
      this.fetchData()
    }
  }
</script>
