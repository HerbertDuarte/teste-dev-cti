<template>
  <main class="p-4">
    <!-- <h1 v-if="data">Edite a pontuação do aluno(a) {{ data.student.name}} no módulo {{ data }}</h1> -->
    <q-card class="w-full max-w-xl rounded-lg overflow-hidden">
      <form>
        <div class="bg-primary px-2 py-3 text-lg font-medium text-white">
          Edite as notas
        </div>
        <div class="p-2 space-y-2">
          <div v-for="(score, index) in scores">
            <q-input resize="no" class="px-1" v-model="scores[index]" :label="(index + 1) + '° unidade'" type="number" >
              <q-btn flat color="negative" @click="removeFloat(index)" >
                <q-icon size="xs" name="delete"/>
              </q-btn></q-input>
          </div>

          <q-btn color="primary" @click="addFloat">
            <q-icon name="add"/>
          </q-btn>

          <div class="text-right pt-5 space-x-2">
            <q-btn color="negative">
              Cancelar
            </q-btn>
            <q-btn color="primary">
              Salvar
            </q-btn>
          </div>
        </div>
      </form>
    </q-card>
  </main>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      data: {},
      formError: '',
      formSuccess: '',
      scores: []
    }
  },
  methods: {

    async updateData() {
      const url = 'http://localhost:3000/modules/update/score/' + this.$route.params.id

      try {
        axios.get(url)
        this.formSuccess = 'Pontuação atualizada com sucesso!'
      } catch (error) {
        this.formError = 'Erro ao atualizar a pontuação do aluno\n' + error.message
      }
    },

    async fetchData() {
      const url = 'http://localhost:3000/modules/student/list/' + this.$route.params.id
      const response = await axios.get(url)
      this.data = response.data
      this.scores = response.data.score
      console.log(this.data)
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
