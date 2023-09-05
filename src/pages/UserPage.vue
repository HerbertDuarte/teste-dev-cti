<template>
  <main class="justify-start">
    <SpanMsg v-if="pageError" :error="pageError" />

    <q-card class="w-full" v-if="userData">

      <q-card-section>
        <h2 class="text-xl pb-4">Meus dados</h2>
        <p>
          <span class="font-medium">
            Nome :
          </span>
          <span>
            {{ userData.name }}
          </span>
        </p>

        <p>
          <span class="font-medium">
            CPF :
          </span>
          <span>
            {{ userData.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/,
              "$1.$2.$3-$4") }}
          </span>
        </p>


        <p>
          <span class="font-medium">
            ID :
          </span>
          <span>
            {{ userData.id }}
          </span>
        </p>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <h2 class="text-xl pb-4">Minhas notas</h2>

        <div v-if="userDataModule" v-for="mod in userDataModule">

          <q-separator></q-separator>
          <p class="text-lg my-4">{{ mod.module.name }}</p>
          <p>{{ mod }}</p>

          <div class="flex justify-center">

            <!-- MAP CIRCLE PROGRESS -->
            <div class="flex flex-col justify-center items-center" v-for="score, index in mod.score">
              <p class="text-center font-medium text-zinc-800">{{ index + 1 }}° unidade</p>
              <q-circular-progress show-value font-size="18px" :value="score * 10" size="80px" :thickness="0.25"
                :color="score >= 5 ? 'primary' : 'orange-9'" :track-color="score >= 5 ? 'blue-2' : 'orange-2'"
                class="q-ma-md">
                <span v-if="score >= 5" class="text-bold text-[#22487b]">{{ score.toFixed(1) }}</span>
                <span v-if="score < 5" class="text-bold text-orange-700">{{ score.toFixed(1) }}</span>
              </q-circular-progress>
            </div>

          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-btn class="m-4" @click="logout" color="negative">
      Finalizar sessão
    </q-btn>
  </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import SpanMsg from 'src/components/SpanMsg.vue';
import { api } from 'src/boot/axios';
import { useTokenStore } from 'src/stores/token';


const store = useTokenStore()

const { logout } = store

const props = defineProps(['user'])
const username = props.user
const pageError = ref('')
const userData = ref(undefined)
const userDataModule = ref(undefined)
const body = ref({
  username,
  hash: sessionStorage.getItem('access_token')
})

async function fetchData() {

  try {
    const res = await api({
      method: 'post',
      url: `user/data/`,
      data: body.value
    })
    userData.value = res.data
    userDataModule.value = res.data.StudentModule
  } catch (error) {
    console.log(error)
    pageError.value = error.response.data.errorMessage
  }
}

onBeforeMount(() => {

  fetchData()

})
</script>
