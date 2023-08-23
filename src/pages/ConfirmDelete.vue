<script setup>
import SpanMsg from 'src/components/SpanMsg.vue';
</script>
<template>
  <div v-if="student">
    <q-card-section class="space-y-3 p-3">

      <p class="text-lg font-medium text-zinc-900">
        Confirmação de exlusão de registro global de registro
      </p>
      <p v-if="student" class="text-slate-900 max-w-[600px] text-start">Tem certeza que deseja excluir o
        cadastro de <span class="font-bold">{{ student.name }}</span>?
      </p>
    </q-card-section>

    <!-- <q-card-actions class="flex justify-end" v-if="deleteFormSuccess">
      <q-btn @click="closedeleteStudentDialog" color="primary">
        voltar
      </q-btn>
    </q-card-actions> -->
    <div class="w-[90%]">
      <SpanMsg v-if="fetchError" :error="fetchError" />
      <SpanMsg v-if="deleteFormError" :error="deleteFormError" />
    </div>
    <q-card-actions v-if="!deleteFormError" class="flex justify-end p-3">
      <!-- <q-btn @click="closedeleteStudentDialog" color="secondary">
        Cancelar
      </q-btn> -->
      <q-btn color="negative" @click="deleteStudent">
        Excluir
      </q-btn>
    </q-card-actions>
  </div>
</template>

<script>
import verifyToken from 'src/boot/VerifyToken';

export default {
  props: ['id'],
  data() {
    return {
      student: null,
      fetchError: '',
      deleteFormError: false
    }
  },
  methods: {

    async fetchData() {

      const url = 'students/list/' + this.id

      try {
        const response = await verifyToken({
          method: 'get',
          url
        })
        this.student = response.data
        this.fetchError = ''
      } catch (error) {
        this.fetchError = 'Houve um erro inesperado. Tente novamente mais tarde!'
      }
    },
    deleteStudent() {

      const url = 'students/delete/' + this.id

      verifyToken({
        method: 'delete',
        url
      })
        .then(() => {
          location.reload()
        })
        .catch(error => {
          this.deleteFormError = 'Erro ao excluir o aluno! Verifique sua conexão e tente novamente mais tarde.'
        });

      // this.$router.push('/delete/success')
    }

  },
  mounted() {
    this.fetchData()
  }
}

</script>
