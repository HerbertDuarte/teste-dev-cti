<script setup>
import SpanMsg from 'src/components/SpanMsg.vue';
import Loading from 'src/components/Loading.vue';
import CTICard from 'src/components/CTI-Card.vue';
</script>

<template>
  <main v-if="loading">
    <Loading />
  </main>
  <main v-if="!loading" class="p-6">
    <CTICard title="Criar um módulo" icon="create_new_folder">
      <p class="text-zinc-600 max-w-md text-justify">Registre seu módulo aqui e controle as notas e alunos registrados
        nesse módulo através da página de gestão de módulos.</p>
      <form @submit="handleSubmit">
        <q-input required type="text" v-model="module_name" class="flex-1" label="Nome do módulo" />
        <q-btn class="my-3" type="submit" color="primary">
          Criar
        </q-btn>
      </form>

      <SpanMsg v-if="formError" :error="formError" />

    </CTICard>
  </main>
</template>

<script>
import {api} from 'src/boot/axios';

export default {
  data() {
    return {
      module_name: '',
      formError: '',
      loading: ''
    }
  },

  methods: {
    handleSubmit(e) {

      this.loading = true
      e.preventDefault()
      const newModule = { name: this.module_name }
      const url = 'modules/create'
      api({
        method: 'post',
        data: newModule,
        url
      }).
        then(response => {

          this.module_name = ''
          this.formError = ''
          this.$router.back()
        })
        .catch(error => {
          this.formError = error.response.data.message
          this.loading = false
        });


    }
  }
}
</script>
