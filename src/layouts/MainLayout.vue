<template>
  <q-layout view='hHh lpR lfr'>

    <q-header elevated class='bg-primary text-white'>
      <q-toolbar>
        <q-btn dense flat round icon='menu' @click='toggleLeftDrawer' />

        <q-toolbar-title>
          <q-avatar>
            <img src='https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg'>
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model='leftDrawerOpen' side='left' bordered>

      <q-list>

        <EssentialLink
          v-for='link in linksList'
          :key='link.title'
          v-bind='link'
        />
      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EssentialLink from 'src/components/EssentialLink.vue'
import { EssentialLinkProps } from 'src/components/EssentialLink.vue'

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value

const linksList: EssentialLinkProps[] = [
  {
    title: 'Gerenciar Fila',
    icon: 'description',
    routeName: 'GerenciarFilas'
  },
  {
    title: 'Gerenciar Prontuários',
    icon: 'person',
    link: '/gerenciar-prontuario'
  },
  {
    title: 'Gerenciar Sala',
    icon: 'fact_check',
    link: '/gerenciar-sala'
  },
  {
    title: 'Monitorar Fila',
    icon: 'help_outline',
    link: '/monitorar-fila'
  },
  {
    routeName: 'login',
    link: '/#/login',
  }
]

</script>
