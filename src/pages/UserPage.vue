<template>
  <main class="justify-start 2xs:p-4 px-1">
    <SpanMsg v-if="pageError" :error="pageError" />

    <q-card class="w-full" v-if="userData">
      <q-card-section class="row bg-grey-2 q-py-sm">
        <div class="text-h6 q-ml-sm">
          <q-icon class="pb-2" size="md" name="group" />
          Meus dados
        </div>
      </q-card-section>

      <q-card-section>
        <p>
          <span class="font-medium"> Nome : </span>
          <span>
            {{ userData.name }}
          </span>
        </p>

        <p>
          <span class="font-medium"> CPF : </span>
          <span>
            {{
              userData.cpf.replace(
                /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
                "$1.$2.$3-$4"
              )
            }}
          </span>
        </p>

        <p>
          <span class="font-semibold">Data de nascimento : </span
          >{{ new Date(userData.date).toLocaleDateString("pt-BR") }}
        </p>

        <p>
          <span class="font-medium"> ID : </span>
          <span>
            {{ userData.id }}
          </span>
        </p>
      </q-card-section>
    </q-card>

    <q-card class="w-full mt-5" v-if="userData">
      <q-card-section class="row bg-grey-2 q-py-sm">
        <div class="text-h6 q-ml-sm">
          <q-icon class="pb-2" size="md" name="format_list_numbered" />
          Minhas notas
        </div>
      </q-card-section>

      <q-card-section v-if="userDataModule.length > 0" class="flex justify-around gap-8">
        <div
          class="p-4 bg-zinc-100/80 rounded-lg flex-1 min-w-[300px] md:min-w-[400px]"
          v-for="mod in userDataModule"
          :key="mod.name"
        >
          <p class="text-xl mb-2 font-medium">{{ mod.module.name }}</p>
          <p>
            <span class="font-medium"> ID de matrícula : </span>
            <span>
              {{ mod.id }}
            </span>
          </p>
          <p>
            <span class="font-medium"> Média : </span>
            <span
              :class="
                mod.media == 'NaN'
                  ? 'text-purple-800'
                  : mod.media >= 5
                  ? 'text-green-800'
                  : 'text-red-900'
              "
            >
              {{ mod.media == "NaN" ? "Sem notas" : mod.media }}
            </span>
          </p>

          <p>
            <span class="font-medium"> Situação : </span>
            <span class="text-green-800" v-if="mod.media >= 5">
              Aprovado(a)
            </span>
            <span class="text-red-900" v-if="mod.media < 5">
              Reprovado(a)
            </span>
            <span class="text-purple-900" v-if="mod.media == 'NaN'">
              Irregular
            </span>
          </p>

          <div class="flex flex-wrap justify-center mt-5">
            <!-- MAP CIRCLE PROGRESS -->
            <div
              class="flex flex-col justify-center items-center my-4"
              v-for="(score, index) in mod.score"
              :key="index"
            >
              <p class="text-center font-medium text-zinc-800 mb-3">
                {{ index + 1 }}° unidade
              </p>
              <q-circular-progress
                show-value
                font-size="18px"
                :value="score * 10"
                size="80px"
                :thickness="0.25"
                :color="score >= 5 ? 'primary' : 'orange-9'"
                :track-color="score >= 5 ? 'blue-2' : 'orange-2'"
                class="mx-4"
              >
                <span v-if="score >= 5" class="text-bold text-[#22487b]">{{
                  score.toFixed(1)
                }}</span>
                <span v-if="score < 5" class="text-bold text-orange-700">{{
                  score.toFixed(1)
                }}</span>
              </q-circular-progress>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <span v-if="userDataModule.length == 0">Não há registros de módulos para esse aluno!</span>
      </q-card-section>
    </q-card>
  </main>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import SpanMsg from "src/components/SpanMsg.vue";
import { api } from "src/boot/axios";

const props = defineProps(["user"]);
const username = props.user;
const pageError = ref("");
const userData = ref(undefined);
const userDataModule = ref(undefined);
const body = ref({
  username,
  hash: sessionStorage.getItem("access_token"),
});

async function fetchData() {
  try {
    const res = await api({
      method: "post",
      url: `user/data/`,
      data: body.value,
    });

    userData.value = res.data;
    userDataModule.value = res.data.StudentModule;
  } catch (error) {
    console.log(error);
    pageError.value = error.response.data.errorMessage;
  }
}

onBeforeMount(() => {
  fetchData();
});
</script>
