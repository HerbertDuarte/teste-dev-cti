<script setup>
import '../index.css'
</script>

<template>
  <main class="sm:p-4 p-2">

    <div class="flex flex-col gap-3 justify-between border m-2 w-full mx-auto max-w-[700px] rounded" v-if="student">
      <div>
        <div class="p-3">
          <p><span class="font-semibold">Nome : </span>{{ student.name }}</p>
          <p><span class="font-semibold">Data de nascimento : </span>{{ new Date(student.date).toLocaleDateString("pt-BR")
          }}</p>
          <p><span class="font-semibold">CPF :</span> {{ student.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/,
            "$1.$2.$3-$4") }}</p>
          <p><span class="font-semibold">ID :</span> {{ student.id }}</p>
        </div>
        <div v-if="studentModules.length > 0">
          <p class="bg-gray-300 text-[#22487b] text-center text-bold p-2 m-2">Módulos</p>
          <div v-for="module in studentModules" class="px-3" >
            <RouterLink :to="`/modules/show/${module.id}`" class="text-bold">{{ module.module.name }} : </RouterLink>
            <span>Aprovado</span>
          </div>
        </div>
      </div>


      <div class="w-full flex flex-row gap-1 justify-between xs:w-auto p-3">
        <q-btn @click="$router.back" class="flex-1" color="secondary">
          Voltar
        </q-btn>
        <q-btn :to="`/edit/confirm/${student.id}`" class="flex-1" color="primary">
          Editar
        </q-btn>
        <q-btn :to="`/delete/confirm/${student.id}`" class="flex-1" color="negative">
          Excluir
        </q-btn>
      </div>
    </div>
    <div v-if="formError"
      class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-3 rounded w-[90%]  max-w-[600px]">
      Erro: {{ formError }}
    </div>
  </main>
</template>

<script>

export default {
  name: 'DataList',
  data() {
    return {
      // media: null,
      studentModules: [],
      student: null,
      // situation: null,
      formError: null
    }
  },
  props: [
    'method',
    'single',
  ],
  methods: {
    async fetchData() {

      const url = 'http://localhost:3000/students/list/' + this.$route.params.id

      try {
        const data = await fetch(url)
        const response = await data.json()
        console.log(response)
        this.student = response
        this.studentModules = response.StudentModule
        this.formError = ''
      } catch (err) {
        this.formError = 'Ops! Houver um erro inesperado. Tente novamente mais tarde! ' + err.message
      }
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

