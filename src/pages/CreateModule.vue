<script setup>
import SpanMsg from 'src/components/SpanMsg.vue';
import Loading from 'src/components/Loading.vue';
</script>

<template>
  <main v-if="loading">
    <Loading/>
  </main>
  <main v-if="!loading" class="p-6">
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

  </main>
</template>

<script>
import verifyToken from 'src/boot/VerifyToken';

export default {
  data() {
    return{
      module_name : '',
      formError : '',
      loading: ''
    }
  },

  methods : {
    handleSubmit(e){

      this.loading = true
      console.log('submit')
      e.preventDefault()
      const newModule = {name : this.module_name}
      const url = 'modules/create'
      verifyToken({
          method : 'post',
          data : newModule,
          url
        }).
        then(response =>{
          console.log(response.data)
          this.module_name = ''
          this.formError = ''
          this.$router.back()
        })
        .catch(error => {
          console.log(error.message)
          this.formError = error.response.data.message
          this.loading = false
        });


    }
  }
}
</script>
