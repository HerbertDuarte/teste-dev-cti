<script setup>
import Loading from 'src/components/Loading.vue';
import ShowScore from './ShowScore.vue';
import ViewStudent from './ViewStudent.vue';
import '../index.css'

</script>

<template>
  <main class="p-4">

    <Loading v-if="!dataStudents" />
    <div class="w-full max-w-[700px]" v-if="dataStudents">
      <h1 class="sm:text-2xl text-xl p-2 bg-[#22487b] text-white">
        Alunos não registrados no módulo {{ dataModule.name }}
      </h1>
      <q-table :rows="studentsWithOutModule" :columns="columns" row-key="name" :filter="filter">
        <template v-slot:top-left>
          <p class="text-zinc-600 text-lg">
            Alunos
          </p>
        </template>
        <template v-slot:top-right>
          <q-input dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td class="flex justify-end gap-2">
            <q-btn @click="openViewStudentDialog(props.row)" color="secondary" size="sm">
              <q-icon name="person" />
            </q-btn>
            <q-btn @click="addStudent(props.row.id)" color="primary" size="sm">
              <q-icon name="add" />
            </q-btn>
          </q-td>
        </template>
      </q-table>
      <p class="text-red-500 text-xl" v-if="addStudentsError">
        {{ addStudentsError }}
      </p>
    </div>
    <Loading v-if="!dataStudentsModule" />
    <div class="border m-2 w-full mx-auto max-w-[700px] rounded" v-if="dataStudentsModule">
      <h1 class="sm:text-2xl text-xl p-2 bg-[#22487b] text-white">
        Tabela de alunos - {{ dataModule.name }}
      </h1>
      <q-table :filter="moduleFilter" :rows="dataStudentsModule" :columns="columns2" row-key="name"
        no-data-label="Nenhum aluno registrado nesse módulo">
        <template v-slot:top-left>
          <p class="text-zinc-600 text-lg">
            Alunos
          </p>
        </template>
        <template v-slot:top-right>
          <q-input dense debounce="300" v-model="moduleFilter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td class="text-right space-x-2">
            <q-btn @click="openViewStudentDialog(props.row)" color="secondary" size="sm">
              <q-icon name="person" />
            </q-btn>
            <q-btn @click="confirmEdit(props.row)" color="primary" size="sm">
              <q-icon name="visibility" />
            </q-btn>
            <q-btn @click="confirmDelete(props.row)" color="negative" size="sm">
              <q-icon name="delete" />
            </q-btn>
          </q-td>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge :color="props.row.media ? props.row.media >= 5 ? 'green-8' : 'red-8' : 'purple-8'">
              {{ props.row.status }}
            </q-badge>
          </q-td>
        </template>
      </q-table>
    </div>

    <div v-if="formError"
      class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-3 rounded w-[90%]  max-w-[600px]">
      {{ formError }}
    </div>
    <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirmação de exclusão de registro</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Tem certeza que deseja excluir os registros de <b>{{ currentStudent.name }}</b> no módulo {{ dataModule.name }}?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" color="primary" @click="closeDeleteDialog" />
          <q-btn label="Excluir" color="negative" @click="removeStudent(currentStudent.id)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog class="w-full" v-model="editDialog">
      <q-card bordered class="rounded-lg overflow-hidden w-full max-w-md">
        <ShowScore :connectionId="currentStudent.idConnection" />
        <q-card-actions class="flex justify-end p-3">
          <q-btn @click="editDialog = false" color="secondary">
            Voltar
          </q-btn>
          <q-btn :to="'/modules/edit/score/' + currentStudent.idConnection" color="primary">
            Editar
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
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
  </main>
</template>
<script >

import axios from 'axios';
import ShowScore from './ShowScore.vue';
import { ref } from 'vue';

export default {
  data() {
    return {
      loadingStudents: true,
      dataStudentsModule: [],
      dataStudents: [],
      dataModule: [],
      addStudentsError: '',
      addStudentsSuccess: '',
      formError: '',
      textButton: 'Cancelar',
      loading: true,
      deleteDialog: false,
      editDialog: false,
      viewStudentDialog: false,
      currentStudent: {},
      filter: ref(''),
      moduleFilter: ref(''),
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
      ],
      columns2: [
        {
          name: 'name',
          required: true,
          field: 'name',
          label: 'Nome',
          align: 'left',
        },
        {
          name: 'status',
          required: true,
          field: 'status',
          label: 'Situação',
          align: 'center',
        },
        {
          name: 'actions',
          required: true,
          field: 'actions',
          label: 'Ações',
          align: 'right',
        },
      ],
    }
  },

  computed: {
    studentsWithOutModule() {
      return this.listStudentsWithOutModules(this.dataStudents, this.dataStudentsModule)
    }
  },

  methods: {

    async fetchData() {
      const url = 'http://localhost:3000/modules/list/' + this.$route.params.id

      const data = await fetch(url)
      const response = await data.json()
      // console.log(response)
      this.dataModule = response
      const arrayFilted = response.filter((e) => e.student !== null)
      // const newArray = arrayFilted.map((e) => e.student)
      this.dataStudentsModule = arrayFilted.map((element, index) => {

        return {
          ...element.student,
          idConnection: arrayFilted[index].id,
          status: element.media ? element.media >= 5 ? 'Aprovado(a)' : 'Reprovado(a)' : 'Irregular',
          media : element.media
        }
      })

      // console.log(this.dataStudentsModule)
      this.loading = false
    },
    async fetchDataStudentes() {
      const url = 'http://localhost:3000/students/list/'

      const data = await fetch(url)
      const response = await data.json()

      this.dataStudents = response

      this.loadingStudents = false
    },
    async addStudent(studentId) {

      const url = 'http://localhost:3000/modules/register/student/'

      const body = {
        id_module: this.$route.params.id,
        id_student: studentId
      }

      try {
        await axios.post(url, body)
        this.$router.go()
      } catch (error) {
        this.addStudentsError = 'Erro ao adicionar o aluno. \nErro : ' + error
      }

    },
    async removeStudent(studentId) {

      const url = 'http://localhost:3000/modules/delete/student/'

      const body = {
        id_module: this.$route.params.id,
        id_student: studentId
      }

      try {
        await axios.post(url, body)
        this.$router.go()
      } catch (error) {
        this.addStudentsError = 'Erro ao remover o aluno. \nErro : ' + error
      }

      this.currentStudent = {}

    },
    listStudentsWithOutModules(listaCompleta, listaReduzida) {
      if (listaReduzida === null || listaReduzida.length === 0) {
        return listaCompleta;
      }

      const idsReduzidos = new Set();
      for (const aluno of listaReduzida) {
        if (aluno !== null) {
          idsReduzidos.add(aluno.id);
        }
      }

      const alunosNaoReduzidos = listaCompleta.filter(aluno => !idsReduzidos.has(aluno.id));
      return alunosNaoReduzidos;
    },
    confirmDelete(student) {
      this.currentStudent = student
      this.deleteDialog = true
    },
    closeDeleteDialog() {
      this.currentStudent = {}
      this.deleteDialog = false
    },
    confirmEdit(student) {
      this.currentStudent = student
      this.editDialog = true
    },
    closeEditDialog() {
      this.currentStudent = {}
      this.editDialog = false
    },
    openViewStudentDialog(student) {
      // console.log(student)
      this.currentStudent = student
      this.viewStudentDialog = true
    },
    closeViewStudentDialog() {
      this.currentStudent = null
      this.viewStudentDialog = false
    },
  },
  mounted() {
    this.fetchData()
    this.fetchDataStudentes()
  }
}
</script>
