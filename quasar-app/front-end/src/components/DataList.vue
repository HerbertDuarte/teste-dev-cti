<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="flex items-center justify-center p-2 max-w-[600px] 2xs:mx-auto w-full">
      <div class="flex flex-col 2xs:flex-row 2xs:items-center gap-3 justify-between p-3 border m-2 w-full rounded" v-if="!single" v-for="student in students">
        <div>
          <p class="font-semibold">0{{student.id + 1}} - {{ student.name }}</p>
          <p><span class="font-semibold">Data de nascimento : </span>({{ student.date }})</p>
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

      <div class="flex flex-col gap-3 justify-between p-3 border m-2 w-full rounded" v-if="single">
        <div>
          <p class="font-semibold">0{{students[single].id + 1}} - {{ students[single].name }}</p>
          <p><span class="font-semibold">Data de nascimento : </span>({{ students[single].date }})</p>
          <p><span class="font-semibold">CPF :</span> {{ students[single].cpf }}</p>
        </div>
        <div>
            <p class="font-semibold text-xl text-center bg-slate-400 text-white px-3 mb-1">Notas</p>
            <p class=" xs:px-3"><span class="font-semibold">Módulo 1 : </span> {{ (students[single].score.module1).toFixed(1) }}</p>
            <hr>
            <p class=" xs:px-3"><span class="font-semibold">Módulo 2 : </span> {{ (students[single].score.module2).toFixed(1) }}</p>
            <hr>
            <p class=" xs:px-3"><span class="font-semibold">Módulo 3 : </span> {{ (students[single].score.module3).toFixed(1) }}</p>
            <hr>
            <p class=" xs:px-3"><span class="font-semibold">Média : </span> {{
              (
                (students[single].score.module1).toFixed(1) +
                (students[single].score.module2).toFixed(1) +
                (students[single].score.module3).toFixed(1)
              ) / 3
            }}</p>
            <hr>
        </div>
        <div class="w-full flex flex-col gap-1 justify-between xs:w-auto">
          <RouterLink :to="`/edit/confirm/${students[single].id }`" class="min-w-[80px] text-center bg-blue-500 text-white p-2  rounded">
            Editar
          </RouterLink>
          <RouterLink :to="`/delete/confirm/${students[single].id }`"  class="min-w-[80px] text-center bg-red-400 text-white p-2 rounded">
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

  import { students } from 'src/Students';

  export default {
    name : 'DataList',
    data(){
      return{
        students,
        media : null,
      }
    },
    props : [
      'method',
      'single',
    ],
  }
</script>
