<script setup>
import Loading from 'src/components/Loading.vue';
import '../index.css'

</script>

<template>
  <main class="p-4">

    <Loading v-if="!dataStudents" />
    <div class="w-full max-w-[700px]" v-if="dataStudents">
      <h1 class="sm:text-2xl text-xl p-2 bg-[#22487b] text-white">
        Alunos não registrados no módulo {{ data.name }}
      </h1>
      <q-table :rows="studentsWithOutModule" :columns="columns" row-key="name">
        <template v-slot:body-cell-actions="props">
          <q-td class="flex justify-end gap-2">
            <q-btn @click="addStudent(props.row.id)" color="secondary" size="sm">
              <q-icon name="add" />
            </q-btn>
          </q-td>
        </template>
      </q-table>
      <p class="text-green-500 text-xl" v-if="addStudentsSuccess">
        {{ addStudentsSuccess }}
      </p>
      <p class="text-red-500 text-xl" v-if="addStudentsError">
        {{ addStudentsError }}
      </p>
    </div>
    <Loading v-if="!data" />
    <div class="border m-2 w-full mx-auto max-w-[700px] rounded" v-if="dataStudentsModule">
      <h1 class="sm:text-2xl text-xl p-2 bg-[#22487b] text-white">
        Tabela de alunos - {{ data.name }}
      </h1>
      <q-table :rows="dataStudentsModule" :columns="columns" row-key="name">
        <template v-slot:body-cell-actions="props">
          <q-td class="flex justify-end gap-2">
            <q-btn @click="addStudent(props.row.id)" color="primary" size="sm">
              <q-icon name="visibility" />
            </q-btn>
            <q-btn @click="addStudent(props.row.id)" color="negative" size="sm">
              <q-icon name="delete" />
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
      loadingStudents: true,
      dataStudentsModule: [],
      dataStudents: [],
      addStudentsError: '',
      addStudentsSuccess: '',
      data: [],
      formError: '',
      textButton: 'Cancelar',
      loading: true,
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

      this.data = response
      const arrayFilted = response.StudentModule.filter((e) => e.student !== null)
      this.dataStudentsModule = arrayFilted.map((e) => e.student)
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
      // const singleStudent = await axios.get('http://localhost:3000/students/list/' + studentId)
      // console.log(singleStudent)

      // const newData = this.data
      // console.log(newData)

      // if(!newData.id_student){
      //   console.log('if')
      //   newData.id_student = [studentId]
      // }else{
      //   console.log('else')
      //   newData.id_student = [...newData.id_student ,studentId]
      // }

      // console.log(newData)
      // const url = 'http://localhost:3000/modulo/register/student/' + this.$route.params.id
      // console.log(url)
      // axios.post(url, studentId)
      // .then(()=>{
      //   this.addStudentsSuccess = 'Aluno adicionado com sucesso!'
      // })
      // .catch(err =>{
      //   console.log(err)
      //   this.addStudentsError = 'Erro ao adicionar o aluno. \n' + err.message
      // })
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
    }
  },
  mounted() {
    this.fetchData()
    this.fetchDataStudentes()
  }
}
</script>
