<script setup>
  import '../index.css'
  import Loading from 'src/components/Loading.vue';
</script>

<template>
  <main v-if="auth == 'false' || !auth " v-show="!loading" >
  <h1 class="sm:text-4xl text-3xl text-center py-4 text-slate-700">Olá seja bem vindo ao <span class="text-blue-500 font-semibold">Gestor Escolar</span></h1>
  <form v-on:submit="handleSubmit" class="flex flex-col justify-center items-start gap-3 border-2 p-4 w-[90%] max-w-[600px] mx-auto rounded">
    <h1 class="sm:text-3xl text-2xl w-full bg-blue-50 text-center py-2 text-blue-900/60">Entre na sua conta</h1>
    <q-input class="min-w-full" type="text" v-model="user_value" label="Usuário" />
    <q-input class="min-w-full" type="password" v-model="password_value" required label="Senha"/>
      <q-btn type="submit" color="primary">
        Entrar
      </q-btn>
      <!-- <input  type="submit"  value="login" class="bg-blue-500 text-white rounded-[7px] px-4 py-2 cursor-pointer" > -->
    </form>
    <div v-if="error" class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-3 rounded w-[90%]  max-w-[600px]">
      Erro: {{ error }}
    </div>
  </main>
  <main v-if="loading">
    <Loading/>
  </main>
  <main v-if="auth == 'true' && user && user.id" >
    <Loading/>
  </main>
</template>

<script>
import { inject } from 'vue';
import axios from 'axios';

export default {
    data (){
      return{
        user_value : '',
        password_value: '',
        error: '',
        auth : null,
        user : null,
        loading : false
      }
    },
    methods : {
      async handleSubmit(e){
        e.preventDefault()
        const url = 'http://localhost:3000/auth/login'
        this.loading = true

        const user = {
          user :this.user_value,
          password : this.password_value
        }
        try {
          const response = await axios.post(url, user)
          if(response.data.id){
            localStorage.setItem('auth', 'true')
            localStorage.setItem('user', JSON.stringify(response.data))
            this.auth = 'true'
            this.user = response.data
            this.error = ''
            this.navigateToRoute()
            this.reloadPage()
          }else{
            localStorage.setItem('auth', 'false')
            localStorage.setItem('user', 'null')
            this.error = 'Usuário ou senha incorretos, tente novamente!'
            this.auth = 'false'
          }

        } catch (error) {
          localStorage.setItem('auth', 'false')
          localStorage.setItem('user', 'null')
          this.auth = 'false'
          if(error.response.data.message == 'Unauthorized'){
            this.error = 'Usuário ou senha incorretos, tente novamente!'
          }else{
            this.error = 'Houve um erro inesperado, tente novamente mais tarde!'
          }
        }
        this.loading = false
      },
      reloadPage() {
        location.reload();
      },
      navigateToRoute() {
      this.$router.push('/')
      }
    },
    mounted(){
      const store = inject('store')
      this.auth = store.auth
      const storeUser = store.user
      if(storeUser !== 'null' && JSON.parse(storeUser)){
        const user = JSON.parse(storeUser)
        this.user = user
      }

      this.navigateToRoute()
    }
  }
</script>
