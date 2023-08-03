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
      <div>
        <p class="font-semibold text-xl text-center bg-slate-400 text-white px-3 mb-1">Notas</p>
        <p v-if="student.score.module1"><span class="font-semibold">Módulo 1 : </span> {{
          (student.score.module1).toFixed(1) }}</p>
        <p v-if="!student.score.module1">
          <span class="font-semibold">Módulo 1 : </span> Sem nota
        </p>
        <hr>
        <p v-if="student.score.module2"><span class="font-semibold">Módulo 2 : </span> {{
          (student.score.module2).toFixed(1) }}</p>
        <p v-if="!student.score.module1">
          <span class="font-semibold">Módulo 2 : </span> Sem nota
        </p>
        <hr>
        <p v-if="student.score.module3"><span class="font-semibold">Módulo 3 : </span> {{
          (student.score.module3).toFixed(1) }}</p>
        <p v-if="!student.score.module1">
          <span class="font-semibold">Módulo 3 : </span>Sem nota
        </p>

        <hr v-if="media !== NaN">
        <p v-if="media !== NaN" class="flex justify-between"><span>
            <span>
              <span class="font-semibold">
                Média : </span> {{ media }}</span>
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
      media: null,
      student: null,
      situation: null,
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

        if (response.score != {}) {
          const media = (((response.score.module1) + (response.score.module2) + (response.score.module3)) / 3).toFixed(1)

          if (media >= 5) {
            this.situation = 'Aprovado(a)'
            this.media = media
          }
          else if (media < 5) {
            this.situation = 'Reprovado(a)'
            this.media = media
          } else {
            this.media = 'Sem média'
          }

        }

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
