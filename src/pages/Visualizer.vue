<script setup>
import Loading from 'src/components/Loading.vue';
import ConfirmDelete from './ConfirmDelete.vue';
import ViewStudent from './ViewStudent.vue';
import SpanMsg from 'src/components/SpanMsg.vue';
</script>

<template>
  <main v-if="loading">
    <Loading />
  </main>
  <section v-if="!loading" class="flex items-center justify-center p-2 max-w-[600px] 2xs:mx-auto w-full">
    <h1 class="sm:text-3xl text-2xl text-slate-700 py-4">Painel de alunos</h1>
    <div class="w-full q-pa-md">
      <q-table :filter="filter" :rows="students" :columns="columns" row-key="name">
        <template v-slot:top-left>
          <div class="space-x-3">
            <span class="text-zinc-600 text-lg">
              Alunos
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

        <template v-slot:body-cell-actions="props">
          <q-td class="text-right space-x-2">
            <q-btn @click="openViewStudentDialog(props.row)" color="secondary" size="sm">
              <q-icon name="visibility" />
            </q-btn>
            <q-btn :to="`/edit/confirm/${props.row.id}`" color="primary" size="sm">
              <q-icon name="edit" />
            </q-btn>
            <q-btn @click="openDeleteStudentDialog(props.row)" color="negative" size="sm">
              <q-icon name="delete" />
            </q-btn>
          </q-td>

          <!-- VIEW STUDENT DIALOG -->
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

          <!-- DELETE DIALOG -->
          <q-dialog v-model="deleteStudentDialog">
            <q-card>
              <ConfirmDelete :id="currentStudent.id" />
              <SpanMsg v-if="formError" :error="formError" />
              <SpanMsg v-if="formSuccess" :succes="formSuccess" />
              <div v-if="deleteFormSuccess && !deleteFormError" class="max-w-[600px] w-full flex justify-center ">
                <SpanMsg :succes="formSuccess" />
              </div>
              <div v-if="!deleteFormSuccess && deleteFormError" class="max-w-[600px] w-full flex justify-center ">
                <SpanMsg :error="deleteFormError" />
              </div>
              <q-card-actions v-if="!deleteFormSuccess" class="flex justify-start p-3">
                <q-btn @click="closedeleteStudentDialog" color="secondary">
                  Cancelar
                </q-btn>
                <q-btn color="negative" @click="deleteStudent">
                  Excluir
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
      <div class="flex justify-end pt-2 gap-2">
        <q-btn to="/register" color="primary">
          Novo aluno
        </q-btn>
      </div>
    </div>
    <SpanMsg :error="fetchError" />
  </section>
</template>

<script>
import { ref } from 'vue';
import verifyToken from 'src/boot/VerifyToken';

export default {
  name: 'Visualizer',
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
      filter: ref(''),
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

      const url = 'students/list'
      this.loading = true

      try {
        const response = await verifyToken({
          method : 'get',
          url
        })
        this.fetchError = ''
        this.students = response.data
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

      if (this.deleteFormSuccess) {
        this.deleteFormSuccess = null
        location.reload()
      }
    },
    deleteStudent() {

      const url = 'students/delete/' + this.currentStudent.id

      verifyToken({
          method : 'delete',
          url
        })
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
