<script setup>
import '../index.css'
import ShowScore from './ShowScore.vue';
import SpanMsg from 'src/components/SpanMsg.vue';
</script>

<template>
  <q-card class="flex flex-col justify-between w-full max-w-[700px] overflow-hidden rounded-lg" v-if="student">
    <div>
      <div>
        <p class="text-center text-lg bg-[#22487b5d] font-medium text-[#22487b] py-2 px-5">{{ student.name }}</p>
        <div class="p-3">
          <p><span class="font-semibold">Data de nascimento : </span>{{ new Date(student.date).toLocaleDateString("pt-BR")
                      }}</p>
          <p><span class="font-semibold">CPF :</span> {{ student.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/,
                      "$1.$2.$3-$4") }}</p>
          <p><span class="font-semibold">ID :</span> {{ student.id }}</p>
        </div>
        <div>
          <p class="bg-gray-300 text-[#22487b] text-center p-2 m-2">Módulos</p>
          <div class="px-2" v-if="studentModules.length == 0">
            <p>Nenhum módulo registrado!</p>
            <RouterLink class="text-[#22487b] font-medium hover:underline" to="/modules">
              Ver módulos disponíveis
            </RouterLink>
          </div>
          <div v-if="studentModules.length > 0" v-for="e in studentModules" class="px-3">
            <b class=" cursor-pointer hover:underline" @click="openScoreDialog(e)">
              {{ e.module.name }} :
            </b>
            <span v-if="e.media >= 5" class="font-medium text-green-900">Aprovado(a)</span>
            <span v-if="e.media < 5" class="font-medium text-red-950">Reprovado(a)</span>
            <span v-if="!e.media" class="font-medium text-violet-900">Irregular</span>

          </div>
        </div>
      </div>
    </div>
    <SpanMsg v-if="formError" :error="formError" />
    <q-dialog class="w-full" v-model="scoreDialog">
      <q-card bordered class="rounded-lg overflow-hidden w-full max-w-md">
        <ShowScore :connectionId="currentModule.id" />
        <q-card-actions class="flex justify-end p-3">
          <q-btn @click="closeScoreDialog" color="secondary">
            Voltar
          </q-btn>
          <q-btn :to="'/modules/edit/score/' + currentModule.id" color="primary">
            Editar
          </q-btn>
          <q-btn @click="openDeleteDialog" color="negative">
            Remover
          </q-btn>
        </q-card-actions>
      </q-card>

      <!-- DELETE DIALOG -->
      <q-dialog v-model="deleteDialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Confirmação de exclusão de registro</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Tem certeza que deseja excluir os registros de <b>{{ student.name }}</b> no módulo {{
                        currentModule.module.name
                        }}?
          </q-card-section>

          <q-card-actions class="p-3">
            <q-btn label="Cancelar" color="secondary" @click="closeDeleteDialog" />
            <q-btn label="Excluir" color="negative" @click="removeStudent" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-dialog>

  </q-card>
</template>

<script>

import verifyToken from 'src/boot/VerifyToken';

export default {
  name: 'DataList',
  props: ['idStudent'],
  data() {
    return {
      studentModules: [],
      student: null,
      formError: null,
      scoreDialog: false,
      currentModule: {},
      deleteDialog: false,
    }
  },
  methods: {
    async fetchData() {

      const url = 'students/list/' + this.idStudent

      try {
        const response = await verifyToken({
          method : 'get',
          url
        })
        this.student = response.data
        const hawStModule = response.data.StudentModule
        this.studentModules = hawStModule.map(element => {
          const sum = element.score.reduce((acumulador, nota) => acumulador + nota, 0);
          const media = (sum / element.score.length.toFixed(1))
          return {
            ...element,
            media
          }
        })

        this.formError = ''
      } catch (err) {
        this.formError = 'Ops! Houver um erro inesperado. Tente novamente mais tarde! ' + err.message
      }
    },
    async removeStudent() {

      const url = 'modules/delete/student/'

      const body = {
        id_module: this.currentModule.module.id,
        id_student: this.idStudent
      }

      try {
        await verifyToken({
          method : 'post',
          data: body,
          url
        })
        location.reload()
      } catch (error) {
        this.formError = 'Erro ao remover o aluno. \nErro : ' + error
      }

    },
    openScoreDialog(myModule) {

      this.currentModule = myModule
      this.scoreDialog = true

    },
    closeScoreDialog() {

      this.currentModule = undefined
      this.scoreDialog = false
    },
    openDeleteDialog() {

      this.deleteDialog = true

    },
    closeDeleteDialog() {

      this.deleteDialog = false
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

