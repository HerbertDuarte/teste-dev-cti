-
<template>
  <main class="p-0 flex flex-row flex-nowrap min-h-screen bg-[#e4f0ff]" v-if="!loading">

    <img class="absolute w-32 sm:w-40 mx-auto top-0 right-0 float-logo" src="https://www.pmvc.ba.gov.br/wp-content/uploads/logo-pmvc.jpg" alt="logo PMVC">

    <div class="flex-1 h-screen relative imagem">
      <img class="absolute w-44 bottom-[50%] right-[50%] translate-x-24 translate-y-10" src="https://www.pmvc.ba.gov.br/wp-content/uploads/logo-pmvc.jpg"
        alt="logo PMVC">
      <img class="object-cover h-full" src="https://www.pmvc.ba.gov.br/wp-content/uploads/pan-vitoria-da-conquista.jpg" alt="Vitoria da conquista">
    </div>
    <div class="max-w-[600px] w-full mx-auto rounded">
      <h1 class="text-xl xs:text-2xl sm:text-3xl text-center pb-4 text-slate-700">
        Olá seja bem vindo ao <span class="text-[#22487b] font-semibold">Gestor Escolar</span>
      </h1>

      <form v-on:submit="handleSubmit"
        class="flex flex-col justify-center items-end px-4 bg-white w-[90%] max-w-[600px] mx-auto rounded-xl shadow-lg py-6">
        <h1 class="sm:text-3xl text-2xl w-full text-center p-0 py-2 text-[#22487b] font-medium">Entre com sua conta</h1>
        <label class="text-start w-full mt-3 text-zinc-600 pl-1" for="user">Usuário</label>
        <input class="min-w-full bg-[#22487b10] text-[#22487b] focus:bg-[#22487be3] focus:text-white font-medium text-md p-3 rounded border-[#22487b]/30" type="text" v-model="inputUser" id="user" required />
        <label class="text-start w-full mt-3 text-zinc-600 pl-1" for="password">Senha</label>
        <input class="min-w-full bg-[#22487b10] text-[#22487b] focus:bg-[#22487be3] focus:text-white  font-medium text-md p-3 rounded border-[#22487b]/30" type="password" v-model="inputPassword" id="password" required />
          <q-btn class="mt-7" tabindex="2" type="submit" color="primary">
            Entrar
          </q-btn>
      </form>
      <div class="w-[90%] flex justify-center items-center mx-auto">
          <SpanMsg v-if="error" :error="error" />
        </div>
    </div>

  </main>

  <main v-if="loading">
    <Loading />
  </main>
</template>

<style scoped>

.float-logo{
    display: none;
  }

@media (max-width : 1050px) {
  .imagem {
    display: none;
  }

  .float-logo{
    display: block;
  }
}

</style>
<script setup>
import SpanMsg from 'src/components/SpanMsg.vue';
import '../index.css'
import Loading from 'src/components/Loading.vue';
import { useTokenStore } from 'src/stores/token';
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios';
const router = useRouter()
const inputUser = ref('')
const inputPassword = ref('')
const error = ref('')
const loading = ref(false)
const store = useTokenStore()

const { setToken, setRole, setUserName, setDisplayName } = store

function reloadPage() {
  location.reload();
}

async function handleSubmit(e) {

  e.preventDefault()
  loading.value = true
  error.value = ''
  const url = process.env.LOGIN_URL

  const user = {
    username: inputUser.value,
    password: inputPassword.value
  }

  try {
    try {
      const res = await api({
      method: 'post',
      url,
      data: user
    })

    // console.log(res)

    const { user : username} = res.data.user
    const token = res.data.access_token

    const userData = await api({
      method: 'get',
      url: `user/find/${username}`,
      headers :{
        Authorization : `Bearer ${token}`
      }
    })



    setToken(token)
    setRole(userData.data.role)
    setUserName(userData.data.user)
    setDisplayName(userData.data.displayName)
    reloadPage()
    } catch (err) {
      console.log(err)
      error.value = err
      loading.value = false
    }



  } catch (err) {
    console.log(err)
    if(err.response.data.message){error.value = err.response.data.message}
    else{error.value = err}
    loading.value = false

  }
}
onMounted(() => {
  router.push({ path: '/' })
})

watch(inputUser, () => {
  error.value = ''
})
watch(inputPassword, () => {
  error.value = ''
})
</script>


