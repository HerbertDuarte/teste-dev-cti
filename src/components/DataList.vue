<script setup>
import Loading from './Loading.vue';
import SearchBar from 'src/components/SearchBar.vue';
import ConfirmDelete from 'src/pages/ConfirmDelete.vue';
import ViewStudent from 'src/pages/ViewStudent.vue';
</script>

<template>
  <Loading v-if="loading" />
  <section v-if="!loading" class="flex items-center justify-center p-2 max-w-[600px] 2xs:mx-auto w-full">
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Painel de alunos</h1>
    <SearchBar />
    <div class="w-full q-pa-md">
      <q-table :rows="students" :columns="columns" row-key="name">

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
            <q-btn @click="openViewStudentDialog(props.row)" color="secondary" size="sm">
              <q-icon name="visibility" />
              <q-tooltip>
                visualizar
              </q-tooltip>
            </q-btn>
            <q-btn :to="`/edit/confirm/${props.row.id}`" color="primary" size="sm">
              <q-icon name="edit" />
              <q-tooltip>
                editar
              </q-tooltip>
            </q-btn>
            <q-btn @click="openDeleteStudentDialog(props.row)" color="negative" size="sm">
              <q-icon name="delete" />
              <q-tooltip>
                deletar
              </q-tooltip>
            </q-btn>
          </q-td>
          <q-dialog v-model="viewStudentDialog">
            <q-card>
              <ViewStudent :idStudent="currentStudent.id" />
              <q-card-actions class="flex justify-end">
                <q-btn @click="closeViewStudentDialog" color="secondary">
                  Voltar
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-model="deleteStudentDialog">
            <q-card>
              <ConfirmDelete :id="currentStudent.id" />
              <div v-if="deleteFormSuccess && !deleteFormError" class="max-w-[600px] w-full flex justify-center ">
                <div class="bg-green-500 text-white/80 border-4 border-green-600/60 p-2 m-3 rounded w-[90%]">
                  {{ deleteFormSuccess }}
                </div>
              </div>
              <div v-if="!deleteFormSuccess && deleteFormError"
                class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-3 rounded w-[90%]  max-w-[600px]">
                Erro: {{ formError }}
              </div>
              <q-card-actions v-if="!deleteFormSuccess" class="flex justify-center">
                <q-btn color="negative" @click="deleteStudent">
                  Excluir
                </q-btn>
                <q-btn @click="closedeleteStudentDialog" color="secondary">
                  Cancelar
                </q-btn>
              </q-card-actions>
              <q-card-actions class="flex justify-end" v-if="deleteFormSuccess">
                <q-btn @click="closedeleteStudentDialog" color="primary">
                  voltar
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>
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
import axios from 'axios'
export default {
  name: 'DataList',
  data() {
    return {
      students: [],
      media: null,
      fetchError: '',
      loading: false,
      viewStudentDialog: false,
      deleteStudentDialog: false,
      currentStudent: undefined,
      deleteFormError: null,
      deleteFormSuccess: null,
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
    'id',
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
    },
    openViewStudentDialog(student) {
      this.currentStudent = student
      this.viewStudentDialog = true
    },
    closeViewStudentDialog() {
      this.currentStudent = null
      this.viewStudentDialog = false
    },
    openDeleteStudentDialog(student) {
      this.currentStudent = student
      this.deleteStudentDialog = true
    },
    closedeleteStudentDialog() {
      this.currentStudent = null
      this.deleteStudentDialog = false

      if(this.deleteFormSuccess){
        this.deleteFormSuccess = null
        this.$router.go()
      }
    },
    deleteStudent() {

      const url = 'http://localhost:3000/students/delete/' + this.currentStudent.id

      axios.delete(url)
        .then(() => {
          this.deleteFormSuccess = 'Registro excluído com sucesso. Clique em voltar para recarregar a página!'
        })
        .catch(error => {
          this.deleteFormError = error.message
        });

      // this.$router.push('/delete/success')
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
