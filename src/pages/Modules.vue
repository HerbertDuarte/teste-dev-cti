<script setup>
import { ref } from 'vue';
import '../index.css'
import SpanMsg from 'src/components/SpanMsg.vue';
</script>

<template>

  <main class="p-">
    <h1 class="sm:text-3xl text-2xl text-slate-700 py-4">Gerenciador de módulos</h1>
    <div class="space-y-3 flex flex-col w-full max-w-md">

      <SpanMsg v-if="fetchError" :error="fetchError"/>
      <div class="q-pa-md" v-if="data">
        <q-table :filter="filter" :rows="data" :columns="columns" row-key="name" flat bordered>
          <template v-slot:top-left>
          <div class="space-x-3">
            <span class="text-zinc-600 text-lg">
              Módulos
            </span>
          </div>
        </template>
        <template v-slot:top-right>
          <q-input dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
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
          Cadastrar um módulo
        </q-btn>
      </div>
      </div>
    </div>
  </main>
</template>

<script>
import verifyToken from 'src/boot/VerifyToken';

export default {
  data() {
    return {
      data: undefined,
      filter: ref(''),
      fetchError: '',
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
      const url = 'modules/list'

      try {
        const response = await verifyToken({
          method : 'get',
          url
        })
        this.data = response.data
        this.fetchError = ''

      } catch (error) {
        this.fetchError = 'Houve um erro inesperado. Tente novamente mais tarde!'
      }

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
