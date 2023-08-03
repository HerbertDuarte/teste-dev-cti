<template>
  <main>
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">
      Criar um módulo
    </h1>
    <form class="flex gap-2">
      <q-input dense="dense" class="flex-1" label="Nome do módulo" />
      <q-btn color="primary">
        Criar
      </q-btn>
    </form>
  </main>
</template>

<script>
import axios from 'src/boot/axios';

export default {
  data() {
    return{
      module_name : '',
      formError : '',
      formSuccess: ''
    }
  },

  methods : {
    handleSubmit(e){
      e.preventDefault()
      const newModule = this.module_name
      const url = 'http://localhost:3000/modules/create'
      axios.post(url, newModule).
        then(response =>{
          console.log(response)
          this.formSuccess = 'Módulo criado com sucesso'
          this.module_name = ''
          this.formError = ''
        })
        .catch(error => {
          this.formError = error.response.data.message
          this.formSuccess = ''
        });


    }
  }
}
</script>
