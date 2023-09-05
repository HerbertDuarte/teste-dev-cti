<script setup>
import Loading from 'src/components/Loading.vue';
</script>

<template>
  <p class="text-lg text-center text-bold text-zinc-50 p-2 bg-[#22487b]">
    <span v-if="!loading">
      Pontuações - {{ module.name }}
    </span>
    <span v-if="loading">
      Carregando...
    </span>
  </p>
  <div v-if="loading" class="w-full flex justify-center items-center h-40">
    <Loading />
  </div>
  <div v-if="!loading" class="p-3 pb-0">
    <div class="flex justify-between items-start">
      <div class="flex-1">
        <p class="text-lg">
          <span class="text-bold">Aluno : </span>
          {{ student.name }}
        </p>
        <p class="text-lg">
          <span class="text-bold">Módulo : </span>
          {{ module.name }}
        </p>
        <p class="text-lg">
          <span class="text-bold">Media : </span>
          <span v-if="data.media >= 5" class="font-medium text-green-900">{{ Number(data.media).toFixed(1) }}</span>
          <span v-if="data.media < 5" class="font-medium text-red-950">{{ Number(data.media).toFixed(1) }}</span>
          <span v-if="!data.media" class="font-medium text-purple-900">Sem média</span>
        </p>
        <p v-if="data.media >= 5" class="text-lg font-medium">
          <span class="font-bold">Status : </span><span class="text-green-800">Aprovado(a)</span>
        </p>
        <p v-if="data.media < 5" class="text-lg font-medium">
          <span class="font-bold">Status : </span><span class="text-red-950">Reprovado(a)</span>
        </p>
        <p v-if="!data.media" class="text-lg font-medium">
          <span class="font-bold">Status : </span><span class="text-purple-900">Irregular</span>
        </p>
      </div>

      <div :class="{ 'hidden': isMobile }">
        <q-circular-progress v-if="data.media >= 5" show-value :value="data.media * 10" size="50px" :thickness="0.3"
          color="green-8" track-color="green-3" class="q-ma-md">
          <span class="font-extrabold text-lime-900">{{ Number(data.media).toFixed(1) }}</span>
        </q-circular-progress>
        <q-circular-progress v-if="data.media < 5" show-value :value="data.media * 10" size="50px" :thickness="0.3"
          color="red-9" track-color="red-2" class="q-ma-md">
          <span class="font-extrabold text-red-950">{{ Number(data.media).toFixed(1) }}</span>
        </q-circular-progress>
      </div>
    </div>
    <hr class="my-3">
    <div :class="{ 'w-full flex justify-center': true, 'flex-col justify-center items-center': isMobile }">
      <div class="flex flex-col justify-center items-center" v-for="score, index in data.score">
        <p class="text-center font-medium text-zinc-800">{{ index + 1 }}° unidade</p>
        <q-circular-progress show-value font-size="18px" :value="score * 10" size="80px" :thickness="0.25"
          :color="score >= 5 ? 'primary' : 'orange-9'" :track-color="score >= 5 ? 'blue-2' : 'orange-2'" class="q-ma-md">
          <span v-if="score >= 5" class="text-bold text-[#22487b]">{{ score.toFixed(1) }}</span>
          <span v-if="score < 5" class="text-bold text-orange-700">{{ score.toFixed(1) }}</span>
        </q-circular-progress>
      </div>
    </div>
    <div class="p-3 text-right space-x-2">
      <q-btn :to="'/modules/edit/score/' + connectionId" color="primary">
        Editar
      </q-btn>
      <q-btn @click="openDeleteDialog" color="negative">
        Remover
      </q-btn>
    </div>
  </div>

  <!-- DELETE DIALOG -->
  <q-dialog v-model="deleteDialog">
    <q-card class="w-full">
      <q-card-section>
        <div class="text-h6">Confirmação de exclusão de registro</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Tem certeza que deseja excluir os registros de <b>{{ student.name }}</b> no módulo {{
          module.name
        }}?
      </q-card-section>

      <q-card-actions class="p-3">
        <q-btn label="Cancelar" color="secondary" @click="closeDeleteDialog" />
        <q-btn label="Excluir" color="negative" @click="removeStudent" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import verifyToken from 'src/boot/VerifyToken';
import { useQuasar } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ShowScore',
  data() {
    return {
      data: [],
      student: {},
      module: {},
      quasar: useQuasar(),
      deleteDialog: false,
      loading: false
    }
  },

  props: {
    connectionId: {
      type: String
    }
  },

  methods: {

    async fetchData() {
      this.loading = true
      const url = 'modules/score/' + this.connectionId
      const response = await verifyToken({
        method: 'get',
        url
      })

      this.data = response.data
      this.student = response.data.student
      this.module = response.data.module
      this.loading = false
    },
    async removeStudent() {

      const url = 'modules/delete/student/'

      const body = {
        id_module: this.module.id,
        id_student: this.student.id
      }
      this.closeDeleteDialog()

      try {
        await verifyToken({
          method: 'post',
          url,
          data: body,
        })
        location.reload()
      } catch (error) {
        this.addStudentsError = 'Erro ao remover o aluno. \nErro : ' + error
      }

    },
    openDeleteDialog() {

      this.deleteDialog = true

    },
    closeDeleteDialog() {

      this.deleteDialog = false
    }

  },
  computed: {
    screenW() {
      return this.quasar.screen.width
    },

    isMobile() {
      return this.screenW < 350
    }
  },

  mounted() {
    this.fetchData()
  }
})
</script>
