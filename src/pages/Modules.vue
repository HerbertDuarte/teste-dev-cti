<script setup>
import '../index.css'
</script>

<template>
  <main class="p-">
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Gerenciador de módulos</h1>
    <div class="space-y-3 flex flex-col w-full max-w-md">
      <div class="q-pa-md" v-if="data">
        <q-table :rows="data" :columns="columns" row-key="name" flat bordered>
          <template v-slot:body-cell-actions="scope">
            <q-td class="flex justify-end">
                <q-btn id="btn_name" :to="'/modules/view/' + scope.row.id" color="primary" size="sm">
                  detalhes
                </q-btn>
                <q-btn id="btn_icon" :to="'/modules/view/' + scope.row.id" color="primary" size="sm">
                  <q-icon name="visibility"/>
                </q-btn>
            </q-td>
          </template>
        </q-table>
        <div class="flex justify-center mt-5">
        <q-btn to="/modules/create" color="primary">
          Criar módulo
        </q-btn>
      </div>
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
      const url = 'http://localhost:3000/modules/list'

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


<style scoped>

#btn_icon{
  display: none;
}

@media (max-width: 380px) {
  #btn_name{
    display: none;
  }
  #btn_icon{
    display: flex;
  }
}
</style>
