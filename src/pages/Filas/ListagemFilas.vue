<template>
  <div class="q-ma-md row">
    <q-card class="full-width">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Gerenciar Filas</div>
      </q-card-section>

      <q-card-section class="bg-white q-">
        <div class="row q-mb-xl">
          <q-btn color="secondary" label="Nova Fila"/>
        </div>
        <div>
          <div class="row justify-start q-gutter-md" v-if="filas.length > 0">
            <fila-card class="col-xxl-1 col-xl-2 col-lg-3 col-md-4 col-sm-12" v-for="fila in filas" :key="fila.id" v-bind="fila"/>
          </div>
          <div v-else class="text-h6 text-center"><q-icon name="fa-solid fa-paw"/> Não há filas cadastradas no momento.</div>
        </div>


      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FilaCard from 'components/Filas/FilaCard.vue';

const filas = ref([
    {id: 1, cirurgia: 'Demartologia', sala: 'Sala de Cirurgia1', aberta: 'Aberta'},
  {id: 2, cirurgia: 'Raio-X', sala: 'Sala 2', aberta: 'Aberta'}
])
</script>
