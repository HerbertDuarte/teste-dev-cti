<template>
  <main>
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">
      Criar um módulo
    </h1>
    <form @submit="handleSubmit" class="flex gap-2">
      <q-input required type="text" v-model="module_name" dense="dense" class="flex-1" label="Nome do módulo" />
      <q-btn type="submit" color="primary">
        Criar
      </q-btn>
    </form>

    <div v-if="formError" class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 m-3 rounded w-[90%]  max-w-[300px]">
      Erro: {{ formError }}
    </div>
    <div v-if="formSuccess" class="bg-teal-400 text-white border-4 border-teal-500/60 p-2 m-3 rounded w-[90%]  max-w-[300px]">
     {{ formSuccess }}
    </div>
  </main>
</template>

<script>
import axios from 'axios';

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
      const url = 'http://localhost:3000/modulo/create'
      await axios.post(url, newModule).
        then(response =>{
          console.log(response)
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
