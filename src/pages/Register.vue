<script setup>
import SpanMsg from 'src/components/SpanMsg.vue';
</script>
<template>
  <main class="p-4">
    <h1 class="sm:text-4xl text-3xl text-slate-700 py-4">Cadastre um aluno</h1>
    <form v-on:submit="handleSubmit"
      class="w-full flex flex-col justify-center items-start gap-3 border-2 p-4 w-[90%] max-w-[600px] rounded ">
      <q-input class="min-w-full" required v-model="name_value" type='text' label="Nome" />
      <q-input class="min-w-full" hint="Ex : 123.456.789-10" mask="###.###.###-##" unmasked-value required
        v-model="cpf_value" type='text' pattern="\d{3}[.\s]?\d{3}[.\s]?\d{3}-?\d{2}" label="CPF" />
      <q-input class="min-w-full" required v-model="date_value" type='date' label="Data de nascimento" />
      <div class="space-x-2">
        <!-- <input class="bg-blue-500 text-white rounded-[7px] px-4 py-2 cursor-pointer hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300" type="submit" value="Cadastrar"> -->
        <q-btn type="submit" color="primary">
          Cadastrar
        </q-btn>
        <q-btn @click="$router.back()" color="secondary">
          Cancelar
        </q-btn>
      </div>
    </form>
    <SpanMsg v-if="formError" :error="formError" />
    <SpanMsg v-if="formSuccess" :success="formSuccess" />
  </main>
</template>

<script>
import verifyToken from 'src/boot/VerifyToken';

export default {
  data() {
    return {
      student: null,
      name_value: '',
      date_value: null,
      cpf_value: '',
      score_value: {},
      formError: '',
      formSuccess: ''
    }
  },
  watch: {
    date_value(ov, nv) {
      if ((!ov == '')) {
        this.formError = ''
        this.formSuccess = ''

      }
    },
    name_value(ov, nv) {
      if ((!ov == '')) {
        this.formError = ''
        this.formSuccess = ''
      }
    },
    cpf_value(ov, nv) {
      if ((!ov == '')) {
        this.formError = ''
        this.formSuccess = ''
      }
    }
  },

  methods: {
    async handleSubmit(e) {

      e.preventDefault()
      const url = 'students/create'

      this.student = {
        name: this.name_value,
        cpf: this.cpf_value.replace(/[.\-]/g, ""),
        date: new Date(this.date_value),
      }


      verifyToken({
        method: 'post',
        data: this.student,
        url
      }).then(() => {
        this.formSuccess = 'Aluno registrado com sucesso.'
        this.formError = ''

        this.name_value = ''
        this.date_value = ''
        this.cpf_value = ''
        console.log('success')
      }).catch((error) => {

        this.formError = error.response.data.message.toString()
        this.formSuccess = ''
        console.log('error')
      })

    }
  }
}
</script>
