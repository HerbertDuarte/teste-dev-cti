<template>
  <main class="p-3">
    <h1 class="text-bold text-2xl text-zinc-800 pb-4">{{ module.name }}</h1>
    <q-card bordered class="rounded-lg overflow-hidden w-full max-w-lg">
      <p class="text-lg text-center text-bold text-zinc-50 p-2 bg-[#22487b]">Pontuações</p>
      <div class="p-3 pb-0">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-lg"><span class="text-bold">ALuno : </span>{{ student.name }}</p>
            <p class="text-lg">
              <span class="text-bold">Media : </span>
              <span v-if="data.media >= 5" class="font-medium text-green-800">{{ Number(data.media).toFixed(1) }}</span>
              <span v-if="data.media <5" class="font-medium text-red-700">{{ Number(data.media).toFixed(1) }}</span>
              <span v-if="!data.media" class="font-medium text-purple-800">Sem média</span>
            </p>
            <p v-if="data.media >= 5" class="text-lg font-medium">
              <span class="font-bold">Status : </span><span class="text-green-800">Aprovado</span>
            </p>
            <p v-if="data.media < 5" class="text-lg font-medium">
              <span class="font-bold">Status : </span><span class="text-red-700">Reprovado</span>
            </p>
            <p v-if="!data.media" class="text-lg font-medium">
              <span class="font-bold">Status : </span><span class="text-purple-800">Irregular</span>
            </p>
          </div>

          <q-circular-progress
          v-if="data.media >=5"
            show-value
            reverse
            :value="data.media"
            size="60px"
            :thickness="0.3"
            color="grey-4"
            track-color="green-8"
            class="q-ma-md"
          >
          <span class="font-extrabold text-green-800">{{Number(data.media).toFixed(1)}}</span>
        </q-circular-progress>
          <q-circular-progress
          v-if="data.media < 5"
            show-value
            reverse
            :value="data.media"
            size="60px"
            :thickness="0.3"
            color="grey-4"
            track-color="red-9"
            class="q-ma-md"
          >
          <span class="font-extrabold text-red-800">{{Number(data.media).toFixed(1)}}</span>
        </q-circular-progress>
        </div>
        <hr class="my-3">
        <div :class="{'w-full p-3 flex justify-between gap-2': true, 'flex-col justify-center items-center': isMobile}">
          <div class="flex flex-col justify-center items-center" v-for="score, index in data.score">
            <p class="text-center font-medium text-zinc-800">{{ index + 1}}° unidade</p>
            <q-circular-progress
            show-value
            font-size="18px"
            :value="score*10"
            size="80px"
            :thickness="0.25"
            :color="score >= 5 ? 'primary' : 'orange-9'"
            track-color="grey-4"
            class="q-ma-md"
          >
            <span v-if="score >= 5" class="text-bold text-[#22487b]">{{ score.toFixed(1) }}</span>
            <span v-if="score < 5" class="text-bold text-orange-700">{{ score.toFixed(1) }}</span>
          </q-circular-progress>
            </div>
        </div>
      </div>
      <div class="text-right m-3">
        <q-btn color="primary">
          Editar
        </q-btn>
      </div>
    </q-card>
  </main>
</template>

<script>
import axios from 'axios';
import { useQuasar } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ShowScore',
  data(){
    return {
      connectionId : this.$route.params.id,
      data : [],
      student : {},
      module : {},
      quasar : useQuasar(),
    }
  },

  methods : {

    async fetchData(){

      const url = 'http://localhost:3000/modules/score/' + this.connectionId
      const response = await axios.get(url)
      console.log(response.data)

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
      return this.screenW < 345
    }
  },

  mounted(){
    this.fetchData()
  }
})
</script>
