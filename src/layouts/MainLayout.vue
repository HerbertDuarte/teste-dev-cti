<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Gestor escolar
        </q-toolbar-title>
        <q-toolbar-title class="text-[18px] bem-vindo">
          Bem vindo <b>{{ displayName }}</b>
        </q-toolbar-title>
      </q-toolbar>

    </q-header>

    <q-drawer class="bg-cyan-50" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Navegação
        </q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>
    <q-page-container class="max-h-screen">
      <router-view />
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
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
// import { store } from 'src/store'
import { useTokenStore } from 'src/stores/token'
import { storeToRefs } from 'pinia'

const linksList = [

  {
    title: 'Painel de Controle',
    caption: 'Tela inicial do gestor escolar',
    icon: 'dashboard',
    link: '/'
  },
  {
    title: 'Alunos',
    caption: 'Veja os registro dos alunos',
    icon: 'group',
    link: '/visualizer'
  },
  {
    title: 'Módulos',
    caption: 'Gerencie e registre módulos',
    icon: 'folder',
    link: '/modules/'
  },
  {
    title: 'Sair',
    caption: 'Sair da sua conta',
    icon: 'login',
    link: '/exit'
  },
]

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      displayName : ''
    }
  },
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  components: {
    EssentialLink
  },

  beforeMount(){
    const store = useTokenStore()
    const { displayName : name } = storeToRefs(store)
    const arrayName = String(name.value).split(' ')
    const firstName = arrayName[0]
    this.displayName = firstName
  }

})
</script>
