<template>
      <p class="text-lg text-center text-bold text-zinc-50 p-2 bg-[#22487b]">Pontuações</p>
      <div class="p-3 pb-0">
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
              <span v-if="data.media <5" class="font-medium text-red-950">{{ Number(data.media).toFixed(1) }}</span>
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

          <div :class="{'hidden' : isMobile}">
            <q-circular-progress
            v-if="data.media >=5"
              show-value
              reverse
              :value="data.media"
              size="50px"
              :thickness="0.3"
              color="green-3"
              track-color="green-8"
              class="q-ma-md"
            >
              <span class="font-extrabold text-lime-900">{{Number(data.media).toFixed(1)}}</span>
            </q-circular-progress>
            <q-circular-progress
            v-if="data.media < 5"
              show-value
              reverse
              :value="data.media"
              size="50px"
              :thickness="0.3"
              color="grey-4"
              track-color="red-9"
              class="q-ma-md"
            >
              <span class="font-extrabold text-red-950">{{Number(data.media).toFixed(1)}}</span>
            </q-circular-progress>
          </div>
        </div>
        <hr class="my-3">
        <div :class="{'w-full flex justify-center': true, 'flex-col justify-center items-center': isMobile}">
          <div class="flex flex-col justify-center items-center" v-for="score, index in data.score">
            <p class="text-center font-medium text-zinc-800">{{ index + 1}}° unidade</p>
            <q-circular-progress
            show-value
            font-size="18px"
            :value="score*10"
            size="80px"
            :thickness="0.25"
            :color="score >= 5 ? 'primary' : 'orange-9'"
            :track-color="score >= 5 ? 'blue-2' : 'orange-2'"
            class="q-ma-md"
          >
            <span v-if="score >= 5" class="text-bold text-[#22487b]">{{ score.toFixed(1) }}</span>
            <span v-if="score < 5" class="text-bold text-orange-700">{{ score.toFixed(1) }}</span>
          </q-circular-progress>
            </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios';
import { useQuasar } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ShowScore',
  data(){
    return {
      data : [],
      student : {},
      module : {},
      quasar : useQuasar(),
    }
  },

  props : {
    connectionId : {
      type: String
    }
  },

  methods : {

    async fetchData(){

      const url = 'http://localhost:3000/modules/score/' + this.connectionId
      const response = await axios.get(url)
      console.log(response)
      this.data = response.data
      this.student = response.data.student
      this.module = response.data.module

    }

  },
  computed :{
    screenW(){
      return this.quasar.screen.width
    },

    isMobile(){
      return this.screenW < 350
    }
  },

  mounted(){
    this.fetchData()
  }
})
</script>
