<template>
  <main class="p-4">
    <!-- <h1 v-if="data">Edite a pontuação do aluno(a) {{ data.student.name}} no módulo {{ data }}</h1> -->
    <q-card class="w-full max-w-xl rounded-lg overflow-hidden">
      <form>
        <div class="bg-primary px-2 py-3 text-lg text-white">
          Edite as notas de <span class="font-bold">{{ student }}</span> no módulo <span class="font-bold">{{ module }}</span>
        </div>
        <div class="p-2 space-y-2">
          <div v-if="scores.length == 0">
            Adicione a primeira nota para esse(a) aluno(a)
          </div>
          <div v-for="(score, index) in scores">
            <q-input resize="no" class="px-1" v-model="scores[index]" :label="(index + 1) + '° unidade'" type="number">
              <q-btn flat color="negative" @click="removeFloat(index)">
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
            <q-btn @click="updateData" color="primary">
              Salvar
            </q-btn>
          </div>
        </div>
      </form>
    </q-card>
    <div class="w-full flex justify-center max-w-xl my-2">
      <div v-if="formError" class="bg-red-400 text-white/80 border-4 border-red-500/60 p-2 rounded w-full">
        Erro: {{ formError }}
      </div>
      <div v-if="formSuccess" class="bg-teal-400 text-white border-4 border-teal-500/60 p-2 rounded w-full">
       {{ formSuccess }}
      </div>
    </div>
  </main>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      data: {},
      student: undefined,
      module : undefined,
      formError: '',
      formSuccess: '',
      scores: []
    }
  },
  methods: {

    async updateData(e) {
      e.preventDefault()
      const url = 'http://localhost:3000/modules/update/score/' + this.$route.params.id

      const {id_student, id_module} = this.data
      const newScores = this.scores.map(e=> Number(e))
      const body = {
        id_student,
        id_module,
        score : [...newScores]
      }

      try {
        const res = await axios.put(url, body)
        this.formSuccess = res.data
        this.formSuccess = 'Pontuação atualizada com sucesso!'
      } catch (error) {
        this.formError = 'Erro ao atualizar a pontuação do aluno\n' + error.message
      }
    },

    async fetchData() {
      const url = 'http://localhost:3000/modules/student/list/' + this.$route.params.id
      const response = await axios.get(url)
      console.log(response.data.student)
      this.data = response.data
      this.student = response.data.student.name
      this.module = response.data.module.name
      this.scores = response.data.score
    },

    addFloat() {
      this.scores.push(0.0);
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
