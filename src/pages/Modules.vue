<script setup>
import '../index.css'
import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="p-5">
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Gerenciador de módulos</h1>
    <div class="space-y-3 flex flex-col w-full max-w-md">
      <div class="q-pa-md" v-if="data">

        <q-table :rows="data" :columns="columns" row-key="name">
          <template v-slot:body-cell-actions="scope">
            <q-td class="flex justify-end">
              <q-btn color="primary" size="sm">
                <RouterLink :to="'/modules/view/' + scope.row.id">
                  detalhes
                </RouterLink>
              </q-btn>
            </q-td>
          </template>
        </q-table>

      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      data: undefined,
      columns: [
        {
          name: 'name',
          required: true,
          field: 'name',
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
          field: 'actions',
          label: 'Ações',
          align: 'right',
        },
      ]
    }
  },

  methods: {
    async fetchAPi() {
      const url = 'http://localhost:3000/modulo/list'

      const response = await fetch(url)
      const data = await response.json()

      this.data = data
    }
  },

  mounted() {
    this.fetchAPi()
  }
}

</script>
