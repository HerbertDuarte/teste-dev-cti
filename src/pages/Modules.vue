<script setup>
import { ref } from 'vue';
import '../index.css'
import SpanMsg from 'src/components/SpanMsg.vue';
import Loading from 'src/components/Loading.vue';
</script>

<template>
  <main v-if="loading">
    <Loading />
  </main>
  <main v-if="data && !loading" class="p-4">
    <h1 class="sm:text-3xl text-2xl text-slate-700 py-4">Gerenciador de módulos</h1>
    <div class="space-y-3 flex flex-col w-full max-w-md">

      <SpanMsg v-if="fetchError" :error="fetchError" />
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
            <q-td class="text-right space-x-2">
              <q-btn @click="openEditModuleDialog(scope.row.id)" color="primary" size="sm">
                <q-icon name="edit" />
              </q-btn>
              <q-btn @click="openDeleteModuleDialog(scope.row.id)" color="negative" size="sm">
                <q-icon name="delete" />
              </q-btn>
              <q-btn :to="'/modules/view/' + scope.row.id" color="secondary" size="sm">
                <q-icon name="visibility" />
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

  <!-- DELETE MODULE DIALOG -->
  <q-dialog v-model="deleteDialog">
    <q-card v-if="!loading">
      <div @click="closeDeleteDialog" class="bg-[#1c3d68] p-1">
        <div class="w-4 h-4 rounded-full bg-red-500 cursor-pointer hover:bg-red-600" />
      </div>
      <q-card-section class="bg-[#22487b] text-white p-3">
        Confirmação de exclusão
      </q-card-section>
      <q-card-section>
        <p>Tem certeza que deseja excluir o módulo <b>{{ currentModule.name }}</b>? Atenção, todas as notas de alunos
          registradas nesse módulo serão apagadas!</p>
      </q-card-section>
      <div class="text-right p-3">
        <q-btn @click="deleteModule" color="negative">
          Apagar
        </q-btn>
      </div>
    </q-card>
  </q-dialog>

  <!-- EDIT MODULE DIALOG -->
  <q-dialog v-model="editDialog">
    <q-card v-if="!loading">
      <div @click="closeEditDialog" class="bg-[#1c3d68] p-1">
        <div class="w-4 h-4 rounded-full bg-red-500 cursor-pointer hover:bg-red-600" />
      </div>
      <q-card-section class="bg-[#22487b] text-white p-3">
        Confirmação de edição
      </q-card-section>
      <q-card-section>
        <p>Edite o nome do módulo selecionado:</p>
        <q-input label="Nome" v-model="currentModuleName"/>
      </q-card-section>
      <div class="text-right p-3">
        <q-btn @click="updateModule" color="primary">
          Salvar
        </q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import verifyToken from 'src/boot/VerifyToken';
import Loading from 'src/components/Loading.vue';

export default {
  data() {
    return {
      data: undefined,
      filter: ref(''),
      fetchError: '',
      loading: true,
      currentModule: undefined,
      currentModuleName: '',
      deleteDialog: false,
      editDialog: false,
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
          method: 'get',
          url
        })
        this.data = response.data
        this.fetchError = ''
      } catch (error) {
        this.fetchError = 'Houve um erro inesperado. Tente novamente mais tarde!'
      }
      this.loading = false
    },

    openDeleteModuleDialog(id) {
      this.currentModule = this.data.find((element) => element.id === id)
      this.deleteDialog = true
    },
    closeDeleteDialog() {
      this.deleteDialog = false
    },
    openEditModuleDialog(id) {
      this.currentModule = this.data.find((element) => element.id === id)
      this.currentModuleName = this.currentModule.name
      this.editDialog = true
    },
    closeEditDialog() {
      this.editDialog = false
    },

    async deleteModule() {

      this.loading = true
      try {
        await verifyToken({
          method: 'delete',
          url: 'modules/delete/' + this.currentModule.id
        })

        location.reload()
      } catch (error) {
        this.fetchError = 'Houve um erro ao deletar o módulo'
        console.log(error)
        this.loading = false
      }

    },
    async updateModule() {

      this.loading = true
      try {
        await verifyToken({
          method: 'put',
          url: 'modules/update/' + this.currentModule.id,
          data : {
            ...this.currentModule,
            name: this.currentModuleName
          }
        })
        location.reload()
      } catch (error) {
        this.fetchError = 'Houve um erro ao editar o módulo'
        console.log(error)
        this.loading = false
      }

    },

  },

  mounted() {
    this.fetchAPi()
  }
}

</script>


<style scoped>
#btn_icon {
  display: none;
}

@media (max-width: 380px) {
  #btn_name {
    display: none;
  }

  #btn_icon {
    display: flex;
  }
}
</style>
