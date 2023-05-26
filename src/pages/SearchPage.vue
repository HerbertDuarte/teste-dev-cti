<script setup>
import axios from 'axios';
import '../index.css'

</script>

<template>
  <main class="sm:p-4 p-2">
    <!-- search bar -->
    <form class="flex flex-row justify-center items-start gap-3 p-4 w-full max-w-[600px] mx-auto">
      <input required placeholder="Pesquise usando o nome" type="text" name="query" id="query" v-model="input_value" class="flex-1 l bg-slate-200 p-2 rounded">
      <input type="submit" value='Pesquisar' class="bg-blue-500 text-white rounded-[7px] px-4 py-2 cursor-pointer hover:shadow-lg hover:shadow-blue-500/40">
    </form>
    <!-- search bar -->
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4 px-3">
      Resultados de pesquisa para :
      <span class="font-semibold">{{ this.$route.query.query }}</span>
    </h1>
    <div v-if="error" class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-3 rounded w-[90%]  max-w-[600px]">
      Erro: {{ error }}
    </div>
      <section class="flex items-center justify-center p-2 max-w-[600px] 2xs:mx-auto w-full">
      <div class="flex flex-col xs:flex-row xs:items-center gap-3 justify-between p-3 border m-2 w-full rounded" v-if="students" v-for="student in students">
        <div>
          <p class="max-w-[290px]"><span class="font-semibold">Nome :</span> {{ student.name }}</p>
          <p><span class="font-semibold">Data de nascimento: </span>({{ (student.date).substring(0,10) }})</p>
          <p><span class="font-semibold">CPF :</span> {{ student.cpf }}</p>
          <p class="font-semibold text-teal-600" v-if="student.media >= 5">Aprovado(a)</p>
          <p class="font-semibold text-red-600" v-if="student.media < 5">Reprovado(a)</p>
          <p class="font-semibold text-purple-800" v-if="isNaN(student.media)">Sem notas</p>
        </div>
        <div class="flex flex-col gap-2 justify-center">
          <RouterLink :to="`/edit/confirm/${student.id }`" class="bg-blue-100 border border-blue-500 text-blue-600 p-2 rounded inline-block w-full text-center xs:w-auto hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40">
            Editar
          </RouterLink>
          <RouterLink :to="`/delete/confirm/${student.id }`" class="bg-red-100 border border-red-500 text-red-600 p-2 rounded inline-block w-full text-center xs:w-auto hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/40">
            Excluir
          </RouterLink>
          <RouterLink :to="`/visualizer/${student.id }`" class="bg-teal-700/10 border border-teal-500 text-teal-600 p-2 rounded inline-block w-full text-center xs:w-auto hover:bg-teal-600 hover:text-white hover:shadow-lg hover:shadow-teal-700/40">
            Ver mais
          </RouterLink>
        </div>
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
        const url = `http://localhost:9001/students/find?name=${this.$route.query.query}`;

        try {
          const response = await axios.get(url);
          this.students = response.data.map(student => {
            const media = Number((((student.score.module1) + (student.score.module2) + (student.score.module3)) / 3).toFixed(1));
            student.media = media;
            return student;
          });
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
