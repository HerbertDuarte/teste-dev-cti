<script setup>
import '../index.css'
</script>

<template>
  <main>
    <h1 class="sm:text-4xl text-3xl text-center py-4 text-slate-700">Entre na sua conta</h1>
    <form v-on:submit="onSubmit" class="flex flex-col justify-center items-start gap-3 border-2 p-4 w-[90%] max-w-[600px] mx-auto rounded">
      <label for="user">Usuário</label>
      <input v-model="user_value" required class="w-full bg-slate-200 p-2 rounded" type="text" name="user" id="user">
      <label for="password">Senha</label>
      <input v-model="password_value" required class="w-full bg-slate-200 p-2 rounded" type="password" name="password" id="password">
      <input class="bg-blue-500 text-white rounded-[7px] px-4 py-2 cursor-pointer" type="submit" value="Entrar">
    </form>
  </main>
</template>

<script>

export default {
    data (){
      return{
        user_value : '',
        password_value: '',
        error: null,
        loading : null,
      }
    },
    methods : {
      onSubmit(e){
        e.preventDefault()
      }
    }
  }
</script>
