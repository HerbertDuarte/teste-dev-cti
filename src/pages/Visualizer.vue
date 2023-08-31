<script setup>
import Loading from 'src/components/Loading.vue';
import ViewStudent from './ViewStudent.vue';
import SpanMsg from 'src/components/SpanMsg.vue';
import CTICard from 'src/components/CTI-Card.vue';
</script>

<template>
  <main v-if="loading">
    <Loading />
  </main>
  <main v-if="!loading" class="flex items-center justify-center 2xs:mx-auto w-full">
    <CTICard title="Alunos" icon="person">
      <!-- <span v-if="screenH">{{ screenH }}</span> -->
      <div class="w-full">
        <q-table :filter="filter" :rows="students" :columns="columns" row-key="name" flat
          :pagination="{ rowsPerPage: rowsPerPage }">
          <template v-slot:top-left>
            <q-btn to="/register" color="primary">
              <q-icon v-if="$q.screen.width < 500" name="add" />
              <span v-if="$q.screen.width >= 500">Registrar Aluno</span>
            </q-btn>
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
              <q-card class="w-full">
                <div @click="closeViewStudentDialog" class="bg-[#20447480] p-1">
                  <div class="w-4 h-4 rounded-full bg-red-500 cursor-pointer hover:bg-red-600" />
                </div>
                <ViewStudent :idStudent="currentStudent.id" />
              </q-card>
            </q-dialog>
            <!-- ###################### -->

            <!-- DELETE DIALOG -->
            <q-dialog v-model="deleteStudentDialog">
              <q-card class="w-full">
                <div @click="closedeleteStudentDialog" class="bg-[#22487b5d] p-1">
                  <div class="cursor-pointer w-4 h-4 rounded-full bg-red-500 hover:bg-red-600" />
                </div>
                <q-card-section class="space-y-3 p-3">
                  <p class="text-lg font-medium text-zinc-900">
                    Confirmação de exlusão de registro global de registro
                  </p>
                  <p class="text-slate-900  text-start">Tem certeza que deseja excluir o
                    cadastro de <span class="font-bold">{{ currentStudent.name }}</span>?
                  </p>
                </q-card-section>
                <div class="w-[90%]">
                  <SpanMsg v-if="confirmDeleteFetchError" :error="confirmDeleteFetchError" />
                  <SpanMsg v-if="deleteFormError" :error="deleteFormError" />
                </div>
                <q-card-actions v-if="!deleteFormError" class="flex justify-end p-3">
                  <q-btn color="negative" @click="deleteStudent">
                    Excluir
                  </q-btn>
                </q-card-actions>

                <div v-if="deleteFormSuccess && !deleteFormError" class=" w-full flex justify-center ">
                  <SpanMsg :succes="formSuccess" />
                </div>
                <div v-if="!deleteFormSuccess && deleteFormError" class=" w-full flex justify-center ">
                  <SpanMsg :error="deleteFormError" />
                </div>
              </q-card>
            </q-dialog>
            <!-- #################### -->

          </template>
        </q-table>
      </div>
    </CTICard>
    <SpanMsg :error="fetchError" />
  </main>
</template>

<script>
import { ref } from 'vue';
import verifyToken from 'src/boot/VerifyToken';
import { useQuasar } from 'quasar';

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
      confirmDeleteStudent: null,
      confirmDeleteFetchError: '',
      deleteFormError: false,
      screenH: null,
      rowsPerPage: null,
      columns: [
        {
          name: 'name',
          required: true,
          field: 'name',
          label: 'Nome',
          align: 'left',
          sortable: true,

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
          method: 'get',
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
      this.loading = true
      this.currentStudent = student
      this.deleteStudentDialog = true
      this.loading = false
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
      this.loading = true
      const url = 'students/delete/' + this.currentStudent.id

      verifyToken({
        method: 'delete',
        url
      })
        .then(() => {
          location.reload()
        })
        .catch(error => {
          this.loading = false
          this.deleteFormError = 'Erro ao excluir o aluno! Verifique sua conexão e tente novamente mais tarde.'
        });
    }


  },

  mounted() {
    this.fetchData()
    this.screenH = useQuasar().screen.height
    if (this.screenH >= 995) { this.rowsPerPage = 14 }
    else if (this.screenH > 950) { this.rowsPerPage = 13 }
    else if (this.screenH > 850) { this.rowsPerPage = 10 }
    else if (this.screenH > 675) { this.rowsPerPage = 7 }
    else this.rowsPerPage = 5
  },
}
</script>
