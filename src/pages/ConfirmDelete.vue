<script setup>
import '../index.css'
import { RouterLink } from 'vue-router';
</script>

<template>
    <div v-if="!formSuccess" class="space-x-2 py-3 text-center">
      <h1 v-if="student" class="sm:text-3xl text-2xl text-slate-700 max-w-[600px]">Tem certeza que deseja excluir o
        cadastro de <span class="font-bold">{{ student.name }}</span>?
      </h1>
    </div>

</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      student: null,
      formError: '',
      formSuccess: ''
    }
  },
  methods: {

    async fetchData() {

      const url = 'http://localhost:3000/students/list/' + this.id

      const response = await axios.get(url)

      this.student = response.data

    },

  },
  mounted() {
    this.fetchData()
  }
}

</script>
