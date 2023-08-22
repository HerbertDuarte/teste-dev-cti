<script>
import SpanMsg from 'src/components/SpanMsg.vue';
</script>

<template>
  <main class="p-6">
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-3">
      Criar um módulo
    </h1>
    <p class="text-zinc-600 max-w-md text-justify">Registre seu módulo aqui e controle as notas e alunos registrados nesse módulo através da página de gestão de módulos.</p>
    <form @submit="handleSubmit" class="flex gap-2 my-4 w-full max-w-md">
      <q-input required type="text" v-model="module_name" dense="dense" class="flex-1" label="Nome do módulo" />
      <q-btn type="submit" color="primary">
        Criar
      </q-btn>
    </form>

    <SpanMsg v-if="formError" :error="formError"/>
    <SpanMsg v-if="formSuccess" :success="formSuccess"/>

    <q-btn @click="$router.back" color="primary">
      Voltar
    </q-btn>
  </main>
</template>

<script>
import { api } from 'src/boot/axios';

export default {
  data() {
    return{
      module_name : '',
      formError : '',
      formSuccess: ''
    }
  },

  methods : {
    async handleSubmit(e){
      console.log('submit')
      e.preventDefault()
      const newModule = {name : this.module_name}
      const url = 'modules/create'
      await api.post(url, newModule).
        then(response =>{
          console.log(response.data)
          this.formSuccess = 'Módulo criado com sucesso'
          this.module_name = ''
          this.formError = ''
        })
        .catch(error => {
          console.log(error.message)
          this.formError = error.response.data.message
          this.formSuccess = ''
        });


    }
  }
}
</script>
