<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Gestor escolar
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer class="bg-cyan-50"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Navegação
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [

  {
    title: 'Dashboard',
    caption: 'Painel de Controle',
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

  components: {
    EssentialLink
  },
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
