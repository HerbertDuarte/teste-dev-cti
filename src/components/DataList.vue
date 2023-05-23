<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="flex items-center justify-center p-2 max-w-[600px] 2xs:mx-auto w-full">
      <div class="flex flex-col 2xs:flex-row 2xs:items-center gap-3 justify-between p-3 border m-2 w-full rounded" v-if="!single" v-for="student in students">
        <div>
          <p><span class="font-semibold">Nome :</span> {{ student.name }}</p>
          <p><span class="font-semibold">Data de nascimento : </span>({{ (student.date).substring(0,10) }})</p>
          <p><span class="font-semibold">CPF :</span> {{ student.cpf }}</p>
        </div>
        <div>
          <RouterLink :to="`/visualizer/${student.id }`" v-if="method == 'visualizer'" class="bg-blue-500 text-white p-2 xs:ml-4 rounded">
            Ver mais
          </RouterLink>
          <RouterLink :to="`/edit/confirm/${student.id }`" v-if="method == 'edit'" class="bg-blue-500 text-white p-2 xs:ml-4 rounded">
            Editar
          </RouterLink>
          <RouterLink :to="`/delete/confirm/${student.id }`" v-if="method == 'delete'" class="bg-red-400 text-white p-2 xs:ml-4 rounded">
            Excluir
          </RouterLink>
        </div>
      </div>

      <div class="flex flex-col gap-3 justify-between p-3 border m-2 w-full rounded" v-if="singleStudent">
        <div>
          <p class="font-semibold">{{ singleStudent.name }}</p>
          <p><span class="font-semibold">Data de nascimento : </span>({{ singleStudent.date.substring(0,10) }})</p>
          <p><span class="font-semibold">CPF :</span> {{ singleStudent.cpf }}</p>
          <p><span class="font-semibold">ID :</span> {{ singleStudent.id }}</p>
        </div>
        <div>
            <p class="font-semibold text-xl text-center bg-slate-400 text-white px-3 mb-1">Notas</p>
            <p v-if="singleStudent.score.module1" class=" xs:px-3"><span class="font-semibold">Módulo 1 : </span> {{ (singleStudent.score.module1).toFixed(1) }}</p>
            <p v-if="!singleStudent.score.module1" class=" xs:px-3">
              <span class="font-semibold">Módulo 1 : </span> Sem nota</p>
            <hr>
            <p  v-if="singleStudent.score.module2" class=" xs:px-3"><span class="font-semibold">Módulo 2 : </span> {{ (singleStudent.score.module2).toFixed(1) }}</p>
            <p v-if="!singleStudent.score.module1" class=" xs:px-3">
              <span class="font-semibold">Módulo 2 : </span> Sem nota</p>
            <hr>
            <p  v-if="singleStudent.score.module3" class=" xs:px-3"><span class="font-semibold">Módulo 3 : </span> {{ (singleStudent.score.module3).toFixed(1) }}</p>
            <p v-if="!singleStudent.score.module1" class=" xs:px-3">
              <span class="font-semibold">Módulo 3 : </span>Sem nota</p>

            <hr v-if="singleStudent.score.module1 && singleStudent.score.module2 && singleStudent.score.module3 ">
            <p  v-if="singleStudent.score.module1 && singleStudent.score.module2 && singleStudent.score.module3 " class=" xs:px-3"><span class="font-semibold">Média : </span> {{
              ((
                (singleStudent.score.module1) +
                (singleStudent.score.module2) +
                (singleStudent.score.module3)
              ) / 3).toFixed(1)
            }}</p>
            <hr>
        </div>
        <div class="w-full flex flex-col gap-1 justify-between xs:w-auto">
          <RouterLink :to="`/edit/confirm/${singleStudent.id }`" class="min-w-[80px] text-center bg-blue-500 text-white p-2  rounded">
            Editar
          </RouterLink>
          <RouterLink :to="`/delete/confirm/${singleStudent.id }`"  class="min-w-[80px] text-center bg-red-400 text-white p-2 rounded">
            Excluir
          </RouterLink>
          <RouterLink to="/dashboard"  class="min-w-[80px] text-center bg-teal-600 text-white p-2 rounded">
            Voltar
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
        singleStudent : null,
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

        this.students = response

        if(this.single){
          const filter = response.filter(item => item.id == this.single)
          this.singleStudent = filter[0]
        }
      }
    },
    mounted(){
      this.fetchData()
    }
  }
</script>
