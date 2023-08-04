<script setup>
import Loading from 'src/components/Loading.vue';
import '../index.css'
</script>

<template>
  <main class="p-4">
    <Loading v-if="!data"/>
    
    <div class="border m-2 w-full mx-auto max-w-[700px] rounded" v-if="data">
      <h1 class="sm:text-2xl text-xl p-2 bg-slate-600 text-white/80">
        Tabela de notas - Módulo {{ data.name }}
      </h1>
      <q-table
        v-if="data.id_student"
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
        </q-td>
      </template>
      </q-table>
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
          name: 'id_student',
          required: true,
          field: 'id_student',
          label: 'Nome',
          align: 'left',
        },
        // {
        //   name: 'score',
        //   required: true,
        //   field:'score',
        //   label: 'Nota',
        //   align: 'center',
        // },
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
      const url = 'http://localhost:3000/modulo/list/' + this.$route.params.id

      const data = await fetch(url)
      const response = await data.json()

      this.data = response

      this.loading = false
    },
  },
  mounted() {
    this.fetchData()
  }
}
</script>
