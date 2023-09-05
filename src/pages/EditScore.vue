<script setup>
import SpanMsg from 'src/components/SpanMsg.vue';
import Loading from 'src/components/Loading.vue';
import CTICard from 'src/components/CTI-Card.vue';
</script>

<template>
  <main v-if="loading">
    <Loading />
  </main>
  <main v-if="!loading && data" class="p-4">
    <CTICard icon="manage_accounts" :title="`Edição de notas`">
      <q-form>
        <div class="text-xl text-zinc-900">Edite as notas de {{ student }} no módulo {{ module }}</div>
        <div class="p-2 space-y-2">
          <div v-if="scores.length == 0">
            Adicione a primeira nota para esse(a) aluno(a)
          </div>
          <div v-for="(score, index) in scores">
            <q-input step="0.0" resize="no" class="px-1" v-model="scores[index]" :rules="[
              val => !!val || ('Preencha esse campo ou remova-o.'),
              val => !(val > 10) || 'O valor máximo é 10.',
              val => !(val < 0) || 'O valor mínimo é 0.'
            ]" :label="(index + 1) + '° unidade'" type="number">
              <q-btn flat color="primary" @click="removeFloat(index)">
                <q-icon size="xs" name="delete" />
              </q-btn>
            </q-input>
          </div>
          <div class="text-left pt-5 space-x-2">
            <q-btn color="secondary" @click="addFloat">
              <q-icon v-if="$q.screen.width <= 450" name="add" />
              <span v-if="$q.screen.width > 450">Adicionar unidade</span>
            </q-btn>
            <q-btn :disable="!isActive" @click="updateData" color="primary">
              Salvar
            </q-btn>
            <q-btn @click="$router.back" color="negative">
              Voltar
            </q-btn>
          </div>
        </div>
      </q-form>
      <div class="w-full flex justify-center max-w-xl my-2">
        <SpanMsg v-if="formError" :error="formError" />
        <SpanMsg v-if="formSuccess" :succes="formSuccess" />
      </div>
    </CTICard>
  </main>
</template>
<script>
import verifyToken from 'src/boot/VerifyToken';
export default {
  data() {
    return {
      data: {},
      student: undefined,
      module: undefined,
      formError: '',
      scores: [],
      errorMessage: false,
      loading: true,
      isActive: true
    }
  },

  watch: {

    scores: {
      handler(vl) {
        let validationArray = vl.find((value) => {
          if (String(value) == '' || Number(value) > 10 || Number(value) < 0) {
            return true
          }
        })

        this.isActive = (validationArray == undefined)
      },
      deep: true
      // }
    }
  },

  methods: {

    async updateData(e) {

      this.loading = true
      e.preventDefault()

      const url = 'modules/update/score/' + this.$route.params.id

      const { id_student, id_module } = this.data
      const newScores = this.scores.map(e => Number(e))
      const body = {
        id_student,
        id_module,
        score: [...newScores]
      }

      try {
        await verifyToken({
          method: 'put',
          data: body,
          url
        })
        this.$router.back()
      } catch (error) {
        this.formError = 'Erro ao atualizar a pontuação do aluno\n' + error.message
      }
      this.loading = false

    },


    async fetchData() {
      this.loading = true
      const url = 'modules/student/list/' + this.$route.params.id
      const response = await verifyToken({
        method: 'get',
        url
      })
      this.data = response.data
      this.student = response.data.student.name
      this.module = response.data.module.name
      this.scores = response.data.score
      this.loading = false
    },

    addFloat() {
      this.scores.push('0');
    },
    removeFloat(index) {
      this.scores.splice(index, 1);
    },
  },
  mounted() {
    this.fetchData()
  }
}
</script>
