<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="">
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

    <q-drawer
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
    title: 'Cadastrar',
    caption: 'Registre um aluno',
    icon: 'storage',
    link: '/register'
  },
  {
    title: 'Visualizar',
    caption: 'Veja os registro dos alunos',
    icon: 'visibility',
    link: '/visualizer'
  },
  {
    title: 'Editar',
    caption: 'Edite um registro',
    icon: 'edit',
    link: '/edit'
  },
  {
    title: 'Deletar',
    caption: 'Apague o registro de um aluno',
    icon: 'delete',
    link: '/delete'
  },
  {
    title: 'Gerir Módulos',
    caption: 'Visualize as nota por módulos',
    icon: 'topic',
    link: '/modules'
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
