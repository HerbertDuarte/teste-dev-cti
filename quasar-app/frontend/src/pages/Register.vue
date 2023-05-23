<script setup>
import '../index.css'
import { RouterLink } from 'vue-router';
</script>

<template>
  <main>
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Cadastre um aluno</h1>
    <form v-on:submit="onSubmit" class="flex flex-col justify-center items-start gap-3 border-2 p-4 w-[90%] max-w-[600px] mx-auto rounded ">
      <label for="user">Nome</label>
      <input placeholder="Digite o nome do aluno" v-model="name_value" required class="w-full bg-slate-200 p-2 rounded" type="text" name="user" id="user">
      <label for="cpf">CPF</label>
      <input  placeholder="Digite o CPF do aluno" v-model="cpf_value" required class="w-full bg-slate-200 p-2 rounded" type="number" name="cpf" id="cpf">
      <label for="date">Data de nascimento</label>
      <input v-model="date_value" required class="w-full bg-slate-200 p-2 rounded" type="date" name="date" id="date">
      <div class="space-x-2">
        <input class="bg-blue-500 text-white rounded-[7px] px-4 py-2 cursor-pointer hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300" type="submit" value="Cadastrar">
        <RouterLink class="bg-red-400 text-white rounded-[7px] px-4 py-[10px] cursor-pointer hover:shadow-lg hover:shadow-red-400/40 transition-all duration-300" to="/dashboard">
          Cancelar
        </RouterLink>
      </div>
    </form>
  </main>
</template>
