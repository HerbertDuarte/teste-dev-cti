<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title>
          Painel do aluno
        </q-toolbar-title>
        <q-toolbar-title class="text-[18px] text-center bem-vindo">
          Bem vindo <b>{{ displayName }}</b>
        </q-toolbar-title>
        <q-toolbar-title class="text-end">
          <q-btn @click="exit" flat round dense>
            <q-icon name="logout" />
            <q-tooltip>
              Sair
            </q-tooltip>
          </q-btn>
        </q-toolbar-title>
      </q-toolbar>

    </q-header>

    <q-page-container class="max-h-screen">
      <slot />
    </q-page-container>
  </q-layout>
</template>
<style scoped>
@media (max-width: 500px) {
  .bem-vindo {
    display: none;
  }
}
</style>
<script>
import { defineComponent } from 'vue'
import { useTokenStore } from 'src/stores/token'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      displayName: '',
      logout: null,
    }
  },

  methods: {
    exit() {
      this.logout()
      location.reload()
    }
  },

  beforeMount() {

    const store = useTokenStore()
    const { logout } = store
    this.logout = logout
    const { displayName: name } = storeToRefs(store)
    const arrayName = String(name.value).split(' ')
    const firstName = arrayName[0]
    this.displayName = firstName
  }

})
</script>
