<script setup>
import SpanMsg from 'src/components/SpanMsg.vue';
</script>

<template>
  <main v-if="student">
    <h1 class="sm:text-3xl text-2xl text-slate-700 py-4">Atualize os dados de <span class="font-bold">{{ student.name
    }}</span></h1>
    <form v-on:submit="handleSubmit"
      class="flex flex-col justify-center items-start gap-3 border-2 p-4 w-[90%] max-w-[600px] mx-auto rounded ">
      <q-input class="min-w-full" required v-model="name_value" type='text' label="Nome" />
      <q-input class="min-w-full" required v-model="cpf_value" type='text' pattern="\d{3}[.\s]?\d{3}[.\s]?\d{3}-?\d{2}"
        label="CPF" />
      <q-input class="min-w-full" required v-model="date_value" type='date' label="Data de nascimento" />
      <div class="space-x-2">
        <q-btn color="primary" type="submit">
          Atualizar
        </q-btn>

        <q-btn @click="$router.back" color="secondary">
          Voltar
        </q-btn>

      </div>
    </form>
    <SpanMsg v-if="formError" :error="formError"/>
    <SpanMsg v-if="formSuccess" :success="formSuccess"/>
  </main>
</template>

<script>
import verifyToken from 'src/boot/VerifyToken';

export default {
  data() {
    return {
      student: null,
      name_value: '',
      date_value: '',
      cpf_value: '',

      formError: '',
      formSuccess: '',
    }
  },
  methods: {

    async fetchData() {

      const url = 'students/list/' + this.$route.params.id

      const response = await verifyToken({
          method : 'get',
          url
        })

      this.student = response.data

      this.name_value = this.student.name
      this.cpf_value = this.student.cpf
      this.date_value = this.student.date.substring(0, 10)
      // this.score_value = this.student.score
    },


    async handleSubmit(e) {

      e.preventDefault()

      const url = 'students/update/' + this.$route.params.id

      this.student = {
        name: this.name_value,
        cpf: this.cpf_value.toString(),
        date: new Date(this.date_value),
        // score : this.score_value,
      }

      // validations --start

      if (this.cpf_value.toString().length !== 11) {
        this.formError = 'Digite um CPF válido'
        return
      }
      // validations --end


      await verifyToken({
          method : 'put',
          data : this.student,
          url
        })
        .then(response => {
          this.formSuccess = 'Registro atualizado com sucesso'
          this.formError = ''
        })
        .catch(error => {
          this.formError = error.message
          this.formSuccess = ''
        });

      this.textButton = 'Voltar'
    }
  },
  mounted() {
    this.fetchData()
  }
}

</script>
