<script setup>
import '../index.css'
</script>

<template>
  <SpanMsg v-if="fetchError" :error="fetchError"/>
    <q-card-section class="space-y-3 p-3" v-if="student">
      <p class="text-lg font-medium text-zinc-900">
        Confirmação de exlusão de registro global de registro
      </p>
      <p v-if="student" class="text-slate-900 max-w-[600px] text-start">Tem certeza que deseja excluir o
        cadastro de <span class="font-bold">{{ student.name }}</span>?
      </p>
    </q-card-section>

</template>

<script>
import { api } from 'src/boot/axios';

export default {
  props: ['id'],
  data() {
    return {
      student: null,
      fetchError: ''
    }
  },
  methods: {

    async fetchData() {


      try {
        const response = await api.get('students/list/' + this.id)
        this.student = response.data
        this.fetchError = ''
      } catch (error) {
        this.fetchError = 'Houve um erro inesperado. Tente novamente mais tarde!'
      }


    },

  },
  mounted() {
    this.fetchData()
  }
}

</script>
