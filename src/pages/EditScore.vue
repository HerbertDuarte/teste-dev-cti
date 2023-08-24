<script setup>
import SpanMsg from 'src/components/SpanMsg.vue';
import Loading from 'src/components/Loading.vue';
</script>

<template>
  <main v-if="loading">
    <Loading />
  </main>
  <main v-if="!loading && data" class="p-4">
    <!-- <h1 v-if="data">Edite a pontuação do aluno(a) {{ data.student.name}} no módulo {{ data }}</h1> -->
    <q-card class="w-full max-w-xl rounded-lg overflow-hidden">
      <q-form>
        <div class="bg-primary px-2 py-3 text-lg text-white">
          Edite as notas de <span class="font-bold">{{ student }}</span> no módulo <span class="font-bold">{{ module
          }}</span>
        </div>
        <div class="p-2 space-y-2">
          <div v-if="scores.length == 0">
            Adicione a primeira nota para esse(a) aluno(a)
          </div>
          <div v-for="(score, index) in scores">
            <q-input step="0.0" resize="no" class="px-1" v-model="scores[index]"
            :rules="[
              val => !!val || 'Preencha esse campo ou remova-o.',
              val => !(val > 10) || 'O valor máximo é 10.',
              val => !(val > 10) || 'O valor mínimo é 0.'
            ]"
              :label="(index + 1) + '° unidade'" type="number">
              <q-btn flat color="primary" @click="removeFloat(index)">
                <q-icon size="xs" name="delete" />
              </q-btn>
            </q-input>
          </div>

          <q-btn color="primary" @click="addFloat">
            <q-icon name="add" />
          </q-btn>

          <div class="text-right pt-5 space-x-2">
            <q-btn @click="$router.back" color="secondary">
              Voltar
            </q-btn>
            <q-btn :disable="!isActive" @click="updateData" color="primary">
              Salvar
            </q-btn>
          </div>
        </div>
      </q-form>
    </q-card>
    <div class="w-full flex justify-center max-w-xl my-2">
      <SpanMsg v-if="formError" :error="formError" />
      <SpanMsg v-if="formSuccess" :succes="formSuccess" />
    </div>
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
        vl.map((value)=>{
          if(String(value).length == 0 || Number(value) > 10 || Number(value) < 0){
            this.isActive = false
          }else{
            this.isActive = true
          }
        })
        return vl.map(e => Number(e).toFixed(1))
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
