<script setup>
import '../index.css'
</script>

<template>
  <main class="sm:p-4 p-2">
    <div class="flex flex-col gap-3 justify-between p-3 border m-2 w-full mx-auto max-w-[700px] rounded" v-if="student">
        <div>
          <p><span class="font-semibold">Nome : </span>{{ student.name }}</p>
          <p><span class="font-semibold">Data de nascimento : </span>({{ student.date.substring(0,10) }})</p>
          <p><span class="font-semibold">CPF :</span> {{ student.cpf }}</p>
          <p><span class="font-semibold">ID :</span> {{ student.id }}</p>
        </div>
        <div>
            <p class="font-semibold text-xl text-center bg-slate-400 text-white px-3 mb-1">Notas</p>
            <p v-if="student.score.module1" class=" xs:px-3"><span class="font-semibold">Módulo 1 : </span> {{ (student.score.module1).toFixed(1) }}</p>
            <p v-if="!student.score.module1" class=" xs:px-3">
              <span class="font-semibold">Módulo 1 : </span> Sem nota</p>
            <hr>
            <p  v-if="student.score.module2" class=" xs:px-3"><span class="font-semibold">Módulo 2 : </span> {{ (student.score.module2).toFixed(1) }}</p>
            <p v-if="!student.score.module1" class=" xs:px-3">
              <span class="font-semibold">Módulo 2 : </span> Sem nota</p>
            <hr>
            <p  v-if="student.score.module3" class=" xs:px-3"><span class="font-semibold">Módulo 3 : </span> {{ (student.score.module3).toFixed(1) }}</p>
            <p v-if="!student.score.module1" class=" xs:px-3">
              <span class="font-semibold">Módulo 3 : </span>Sem nota</p>

            <hr v-if="media !== NaN">
            <p v-if="media !== NaN" class="flex justify-between xs:px-3"><span>
            <span>
                <span class="font-semibold">Média : </span> {{media}}</span>
            </span>
            <span class="font-bold text-teal-600" v-if="situation == 'Aprovado(a)'">
              {{ situation }}
            </span>
            <span class="font-bold text-red-600" v-if="situation == 'Reprovado(a)'">
              {{ situation }}
            </span>
          </p>
            <hr>
        </div>
        <div class="w-full flex flex-col gap-1 justify-between xs:w-auto">
          <RouterLink :to="`/edit/confirm/${student.id }`" class="min-w-[80px] text-center bg-blue-500 text-white p-2  rounded">
            Editar
          </RouterLink>
          <RouterLink :to="`/delete/confirm/${student.id }`"  class="min-w-[80px] text-center bg-red-400 text-white p-2 rounded">
            Excluir
          </RouterLink>
          <RouterLink to="/dashboard"  class="min-w-[80px] text-center bg-teal-600 text-white p-2 rounded">
            Voltar
          </RouterLink>
        </div>
      </div>
  </main>
</template>

<script>

  export default {
    name : 'DataList',
    data(){
      return{
        media : null,
        student : null,
        situation: null,
      }
    },
    props : [
      'method',
      'single',
    ],
    methods : {
      async fetchData (){

        const url = 'http://localhost:9001/students/list/' + this.$route.params.id

        const data = await fetch(url)
        const response = await data.json()
        this.student = response

        if(response.score != {}){
          const media = (((response.score.module1)+(response.score.module2) +(response.score.module3)) / 3).toFixed(1)

          if(media >= 5){
            this.situation = 'Aprovado(a)'
            this.media = media
          }
          else if(media < 5){
            this.situation = 'Reprovado(a)'
            this.media = media
          }else{
            this.media = 'Sem média'
          }

        }



      }
    },
    mounted(){
      this.fetchData()
    }
  }
</script>
