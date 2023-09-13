<script setup>
import Loading from 'src/components/Loading.vue';
import SpanMsg from 'src/components/SpanMsg.vue';
import CTICard from 'src/components/CTI-Card.vue';
</script>

<template>
  <main v-if="loading">
    <Loading />
  </main>
  <main v-if="!loading && student">
    <CTICard :title="`Atualize os dados de ${student.name}`" icon="manage_accounts">

      <form v-on:submit="handleSubmit"
        class="flex flex-col justify-center items-start gap-3 border-2 p-4  mx-auto rounded ">
        <q-input class="min-w-full" required v-model="name_value" type='text' label="Nome" />

        <q-input class="min-w-full" required v-model="cpf_value" type='text' pattern="\d{3}[.\s]?\d{3}[.\s]?\d{3}-?\d{2}"
          label="CPF" hint="Ex : 123.456.789-10" mask="###.###.###-##" unmasked-value />

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
      <SpanMsg v-if="formError" :error="formError" />
      <SpanMsg v-if="formSuccess" :success="formSuccess" />
    </CTICard>
  </main>
</template>

<script>
import {api} from 'src/boot/axios';
import { api } from 'src/boot/axios';

export default {
  data() {
    return {
      student: null,
      name_value: '',
      date_value: '',
      cpf_value: '',
      loading: true,
      formError: '',
      formSuccess: '',
    }
  },
  methods: {

    async fetchData() {
      this.loading = true
      const url = 'students/list/' + this.$route.params.id

      const response = await api({
        method: 'get',
        url
      })

      this.student = response.data
      const date = new Date(this.student.date)
      date.setDate(date.getDate() - 1)


      this.name_value = this.student.name
      this.cpf_value = this.student.cpf
      this.date_value = date.toISOString().substring(0, 10)

      this.loading = false
    },

    async handleSubmit(e) {
      e.preventDefault()

      this.formError = ''
      this.formSuccess = ''

      // verificar se alterou alguma coisa
      let dateTwo = new Date(this.student.date)

      dateTwo.setDate(dateTwo.getDate() - 1)
      dateTwo = dateTwo.toISOString().substring(0, 10)
      if (this.student.name == this.name_value && this.student.cpf == this.cpf_value && dateTwo == this.date_value) {
        this.formError = 'Você não alterou nenhuma dado no registro do aluno.'
        this.formSuccess = ''
        // ####################

      } else {

        const url = 'students/update/' + this.$route.params.id

        // fix day value
        const date = new Date(this.date_value)
        date.setDate(date.getDate() + 1)
        //

        this.student = {
          name: this.name_value,
          cpf: this.cpf_value.toString(),
          date,
          username : this.student.username
          // score : this.score_value,
        }

        // validations --start

        if (this.cpf_value.toString().length !== 11) {
          this.formError = 'Digite um CPF válido'
          return
        }
        // validations --end

        this.loading = true
        api({
          method: 'put',
          data: this.student,
          url
        })
          .then(response => {
            if (!response.data) {
              this.formSuccess = ''
              this.formError = 'Esse CPF já está registrado!'
            } else {
              this.formSuccess = 'Registro atualizado com sucesso'
              this.formError = ''
            }
            this.loading = false
          })
          .catch(error => {
            this.formError = error.message
            this.formSuccess = ''
            this.loading = false
          });


      }
    }
  },
  mounted() {
    this.fetchData()
  }
}

</script>
