<script setup>
import { ref } from 'vue';
import '../index.css'
import SpanMsg from 'src/components/SpanMsg.vue';
import Loading from 'src/components/Loading.vue';
import CTICard from 'src/components/CTI-Card.vue';
</script>

<template>
  <main v-if="loading">
    <Loading />
  </main>
  <main v-if="data && !loading" class="p-4">
    <CTICard title="Módulos" icon="folder">
      <SpanMsg v-if="fetchError" :error="fetchError" />
      <div v-if="data">
        <q-table :filter="filter" :rows="data" :columns="columns" row-key="name" flat
          :pagination="{rowsPerPage: rowsPerPage}">
          <template v-slot:top-left>
            <div class="space-x-3">
              <q-btn to="/modules/create" color="primary">
                <q-icon v-if="$q.screen.width < 500" name="add" />
                <span v-if="$q.screen.width >= 500">Cadastrar módulo</span>
              </q-btn>
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
              <q-btn :to="'/modules/view/' + scope.row.id" color="secondary" size="sm">
                <q-icon name="visibility" />
              </q-btn>
              <q-btn @click="openEditModuleDialog(scope.row.id)" color="primary" size="sm">
                <q-icon name="edit" />
              </q-btn>
              <q-btn @click="openDeleteModuleDialog(scope.row.id)" color="negative" size="sm">
                <q-icon name="delete" />
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </CTICard>
  </main>

  <!-- DELETE MODULE DIALOG -->
  <q-dialog v-model="deleteDialog">
    <q-card class="w-full" v-if="!loading">
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
    <q-card class="w-full" v-if="!loading">
      <div @click="closeEditDialog" class="bg-[#1c3d68] p-1">
        <div class="w-4 h-4 rounded-full bg-red-500 cursor-pointer hover:bg-red-600" />
      </div>
      <q-card-section class="bg-[#22487b] text-white p-3">
        Confirmação de edição
      </q-card-section>
      <q-card-section>
        <p>Edite o nome do módulo selecionado:</p>
        <q-input label="Nome" v-model="currentModuleName" />
      </q-card-section>
      <div class="text-right p-3">
        <q-btn @click="updateModule" color="primary">
          Salvar
        </q-btn>
      </div>
    </q-card>
  </q-dialog>
  <!-- ##################### -->
</template>

<script>
import verifyToken from 'src/boot/VerifyToken';
import Loading from 'src/components/Loading.vue';
import { useQuasar } from 'quasar';

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
      screenH: null,
      rowsPerPage: null,
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
          data: {
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
  computed: {
    rowsPerPage() {
      if (this.screenH >= 995) { return 14 }
      else if (this.screenH > 950) { return 13 }
      else if (this.screenH > 850) { return 10 }
      else if (this.screenH > 675) { return 7 }
      else return 5
    }
  },

  mounted() {
    this.fetchAPi()
    this.screenH = useQuasar().screen.height
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
