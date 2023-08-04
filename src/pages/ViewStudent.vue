<script setup>
import '../index.css'
</script>

<template>
  <main class="sm:p-4 p-2">
    <div class="flex flex-col gap-3 justify-between p-3 border m-2 w-full mx-auto max-w-[700px] rounded" v-if="student">
      <div>
        <p><span class="font-semibold">Nome : </span>{{ student.name }}</p>
        <p><span class="font-semibold">Data de nascimento : </span>{{ new Date(student.date).toLocaleDateString("pt-BR") }}</p>
        <p><span class="font-semibold">CPF :</span> {{ student.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4") }}</p>
        <p><span class="font-semibold">ID :</span> {{ student.id }}</p>
      </div>
      <div class="w-full flex flex-row gap-1 justify-between xs:w-auto">
        <q-btn class="w-full" color="primary">
          <RouterLink :to="`/edit/confirm/${student.id}`">
            Editar
          </RouterLink>
        </q-btn>
        <q-btn class="w-full" color="negative">
          <RouterLink :to="`/delete/confirm/${student.id}`">
            Excluir
          </RouterLink>
        </q-btn>
        <q-btn class="w-full" color="positive">
          <RouterLink to="/visualizer/">
            Voltar
          </RouterLink>
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
        this.student = response
        this.formError = ''

        // if (response.score != {}) {
        //   const media = (((response.score.module1) + (response.score.module2) + (response.score.module3)) / 3).toFixed(1)

        //   if (media >= 5) {
        //     this.situation = 'Aprovado(a)'
        //     this.media = media
        //   }
        //   else if (media < 5) {
        //     this.situation = 'Reprovado(a)'
        //     this.media = media
        //   } else {
        //     this.media = 'Sem média'
        //   }

        // }

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
