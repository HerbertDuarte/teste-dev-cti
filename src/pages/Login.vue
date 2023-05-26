<script setup>
  import '../index.css'
  import { RouterLink } from 'vue-router';
  import Loading from 'src/components/Loading.vue';
</script>

<template>
  <main v-if="auth == 'false' || !auth" >
    <h1 class="sm:text-4xl text-3xl text-center py-4 text-slate-700">Entre na sua conta</h1>
    <form v-on:submit="handleSubmit" class="flex flex-col justify-center items-start gap-3 border-2 p-4 w-[90%] max-w-[600px] mx-auto rounded">
      <label for="user">Usuário</label>
      <input v-model="user_value" required class="w-full bg-slate-200 p-2 rounded" type="text" name="user" id="user">
      <label for="password">Senha</label>
      <input v-model="password_value" required class="w-full bg-slate-200 p-2 rounded" type="password" name="password" id="password">
      <input class="bg-blue-500 text-white rounded-[7px] px-4 py-2 cursor-pointer" type="submit" value="Entrar">
    </form>
    <div v-if="error" class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-3 rounded w-[90%]  max-w-[600px]">
      Erro: {{ error }}
    </div>
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
        user : null
      }
    },
    methods : {
      async handleSubmit(e){
        e.preventDefault()
        const url = 'http://localhost:9001/auth/login'

        const user = {
          user :this.user_value,
          password : this.password_value
        }
        try {
          const response = await axios.post(url, user)
          console.log(response.data)
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
            this.error = 'Dados incorretos, tente novamente!'
            this.auth = 'false'
          }

        } catch (error) {
          localStorage.setItem('auth', 'false')
          localStorage.setItem('user', 'null')
          this.auth = 'false'
          this.error = 'Dados incorretos, tente novamente!'
          console.log(error.message)
        }
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
