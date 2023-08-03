<script setup>
import Loading from 'src/components/Loading.vue';
import '../index.css'
</script>

<template>
  <main class="p-4">
    <Loading v-if="!data"/>
    <div class="border m-2 w-full mx-auto max-w-[700px] rounded" v-if="data">
      <h1 class="sm:text-2xl text-xl p-2 bg-slate-600 text-white/80">
        Tabela de notas - Módulo {{ $route.params.id }}
      </h1>
      <q-table
        :rows="data"
        :columns="columns"
        row-key="name"
        hide-no-data
        :loading="loading"
        >
        <template v-slot:body-cell-actions>
        <q-td class="flex justify-end">
          <q-btn size="sm">
            button
          </q-btn>
          <q-btn size="sm">
            button
          </q-btn>
          <q-btn size="sm">
            button
          </q-btn>
        </q-td>
      </template>
      </q-table>

<!--
      <div>
        <p class="flex justify-between items-center border-t p-2 font-semibold bg-slate-50">
          <span class="w-[40%]">
            Nome
          </span> <span>Nota</span> <span class="sm:px-2 sxs:px-3 px-4">Ação</span>
        </p>
        <p class="flex justify-between items-center border-t p-2" v-for="student in data">
          <span class="w-[45%]">{{ student.name }}</span>
          <span v-if="student.score">{{ student.score }}</span>
          <span v-if="!student.score">Sem nota</span>
          <q-btn color="primary">
            <RouterLink :to="`/edit/confirm/${student.id}/${$route.params.id}`">
              Editar
            </RouterLink>
          </q-btn>
        </p>
      </div> -->

    </div>

    <div v-if="formError"
      class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-3 rounded w-[90%]  max-w-[600px]">
      {{ formError }}
    </div>
  </main>
</template>
<script >

export default {
  data() {
    return {
      data: [],
      formError: '',
      textButton: 'Cancelar',
      loading : true,
      columns: [
        {
          name: 'name',
          required: true,
          field: 'name',
          label: 'Nome',
          align: 'left',
        },
        {
          name: 'score',
          required: true,
          field:'score',
          label: 'Nota',
          align: 'center',
        },
        {
          name: 'actions',
          required: true,
          field:'actions',
          label: 'Ações',
          align: 'right',
        },
      ]
    }
  },
  methods: {

    async fetchData() {
      const url = 'http://localhost:3000/students/list'

      const data = await fetch(url)
      const response = await data.json()


      if (this.$route.params.id == 1) {
        console.log('route 1')
        this.data = response.map((student) => {
          if(!student.score.module1){
            return { name: student.name, score: 'sem nota', id: student.id }
          }
           return { name: student.name, score: student.score.module1, id: student.id }
        })
      }
      if (this.$route.params.id == 2) {
        console.log('route 2')
        this.data = response.map((student) => {
          if(!student.score.module2){
            return { name: student.name, score: 'sem nota', id: student.id }
          }
           return { name: student.name, score: student.score.module2, id: student.id }
        })
      }
      if (this.$route.params.id == 3) {
        console.log('route 3')
        this.data = response.map((student) => {
          if(!student.score.module3){
            return { name: student.name, score: 'sem nota', id: student.id }
          }
           return { name: student.name, score: student.score.module3, id: student.id }
        })
      }
      this.loading = false
    },
  },
  mounted() {
    this.fetchData()
  }
}
</script>
