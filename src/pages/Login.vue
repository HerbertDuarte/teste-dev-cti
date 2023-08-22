<template>
  <main v-if="auth == 'false' || !auth" v-show="!loading">
    <h1 class="sm:text-4xl text-3xl text-center py-4 text-slate-700">Olá seja bem vindo ao <span
        class="text-[#22487b] font-semibold">Gestor Escolar</span></h1>
    <form v-on:submit="handleSubmit"
      class="flex flex-col justify-center items-start gap-3 border-2 p-4 w-[90%] max-w-[600px] mx-auto rounded">
      <h1 class="sm:text-3xl text-2xl w-full bg-blue-50 text-center py-2 text-blue-900/60">Entre na sua conta</h1>
      <q-input class="min-w-full" type="text" v-model="inputUser" label="Usuário" id="user" />
      <q-input class="min-w-full" type="password" v-model="inputPassword" required aria-label="Senha" label="Senha"
        id="password" />
      <q-btn tabindex="2" type="submit" color="primary">
        Entrar
      </q-btn>
    </form>
    <SpanMsg v-if="error" :error="error" />
  </main>

  <main v-if="loading">
    <Loading />
  </main>
  <main v-if="auth == 'true' && user && user.id">
    <Loading />
  </main>
</template>
<script setup>
import '../index.css'
import Loading from 'src/components/Loading.vue';
import SpanMsg from 'src/components/SpanMsg.vue';
import { useTokenStore } from 'src/stores/token';
import { storeToRefs } from 'pinia';
import { api } from 'src/boot/axios';
import { onMounted, ref, watch } from 'vue';

const inputUser = ref('')
const inputPassword = ref('')
const error = ref('')
const auth = ref(null)
const loading = ref(false)

const store = useTokenStore()
const {setToken} = store

function reloadPage() {
  location.reload();
}

async function handleSubmit(e) {

  e.preventDefault()
  loading.value = true
  error.value = ''
  const user = {
    username: inputUser.value,
    password: inputPassword.value
  }

  try {
    const res = await api.post('auth/login', user)

    loading.value = false
    setToken(res.data.access_token)
    reloadPage()
  } catch (err) {

    loading.value = false
    if(err.response.data.message) error.value = err.response.data.message

  }

  watch(inputUser, () =>{
    error.value = ''
  })
  watch(inputPassword, () =>{
    error.value = ''
  })
}
</script>

  // methods: {

  //   cleanError() {
  //     this.error = ''
  //   },
  //   reloadPage() {
  //     location.reload();
  //   },
  //   navigateToRoute() {
  //     this.$router.push('/')
  //   }
  // },
  // watch: {
  //   user_value(nv, ov) {
  //     this.error = ''
  //   }
  // }

