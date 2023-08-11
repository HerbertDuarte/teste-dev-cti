<script setup>
import Loading from './Loading.vue';
import SearchBar from 'src/components/SearchBar.vue';
</script>

<template>
  <Loading v-if="loading" />
  <section  v-if="!loading" class="flex items-center justify-center p-2 max-w-[600px] 2xs:mx-auto w-full">
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Painel de alunos</h1>
    <SearchBar />
    <div class="w-full q-pa-md">
      <q-table
        :rows="students"
        :columns="columns"
        row-key="name">

        <template v-slot:top="props">
          <div class="w-full flex justify-between">
            <p class="text-xl">Alunos</p>
            <q-btn to="/register" color="primary">
              Cadastrar
            </q-btn>
          </div>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td class="text-right space-x-2">
            <q-btn :to="`/visualizer/${props.row.id}`" color="secondary" size="sm">
              <q-icon name="visibility" />
              <q-tooltip>
                visualizar
              </q-tooltip>
            </q-btn>
            <q-btn :to="`/edit/confirm/${props.row.id}`"  color="primary" size="sm">
              <q-icon name="edit" />
              <q-tooltip>
                editar
              </q-tooltip>
            </q-btn>
            <q-btn :to="`/delete/confirm/${props.row.id}`" color="negative" size="sm">
              <q-icon name="delete" />
              <q-tooltip>
                deletar
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <div v-if="fetchError"
      class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-2 rounded w-full  max-w-[600px]">
      Erro: {{ fetchError }}
    </div>
  </section>
</template>

<script>

export default {
  name: 'DataList',
  data() {
    return {
      students: [],
      media: null,
      fetchError: '',
      loading: false,
      columns: [
        {
          name: 'name',
          required: true,
          field: 'name',
          label: 'Nome',
          align: 'left',
          sortable: true
        },
        {
          name: 'cpf',
          required: true,
          field: 'cpf',
          label: 'CPF',
          align: 'center',
        },
        {
          name: 'actions',
          required: true,
          field: 'actions',
          label: 'Ações',
          align: 'right',
        },
      ]
    }
  },
  props: [
    'single',
  ],
  methods: {
    async fetchData() {

      const url = 'http://localhost:3000/students/list'
      let response
      this.loading = true

      try {
        const data = await fetch(url)
        response = await data.json()
        this.fetchError = ''
        this.students = response
      } catch (error) {
        this.fetchError = 'Houve um erro inesperado! Tente novamente mais tarde!'
      }
      this.loading = false
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
