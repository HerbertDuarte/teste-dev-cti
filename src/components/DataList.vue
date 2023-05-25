<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="flex items-center justify-center p-2 max-w-[600px] 2xs:mx-auto w-full">
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
          <RouterLink :to="`/visualizer/${student.id }`" v-if="method == 'visualizer'" class="bg-blue-500 text-white p-2 rounded inline-block w-full sxs:w-auto">
            Ver mais
          </RouterLink>
          <RouterLink :to="`/edit/confirm/${student.id }`" v-if="method == 'edit'" class="bg-blue-500 text-white p-2 rounded inline-block w-full sxs:w-auto">
            Editar
          </RouterLink>
          <RouterLink :to="`/delete/confirm/${student.id }`" v-if="method == 'delete'" class="bg-red-400 text-white p-2 rounded inline-block w-full 2sxs:w-auto">
            Excluir
          </RouterLink>
        </div>
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
      }
    },
    props : [
      'method',
      'single',
    ],
    methods : {
      async fetchData (){

        const url = 'http://localhost:9001/students/list'

        const data = await fetch(url)
        const response = await data.json()

        this.students = response.map(student => {
          if(Object.keys(student).length !== 0){
            const media = Number((((student.score.module1)+(student.score.module2) +(student.score.module3)) / 3).toFixed(1))
            student.media = media
            return student
          }
        })
        console.log(this.students)
      }
    },
    mounted(){
      this.fetchData()
    }
  }
</script>
