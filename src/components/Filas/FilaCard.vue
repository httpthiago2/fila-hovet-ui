<template>
  <q-card bordered class="q-pa-md rounded-borders rounded">
    <div class="row text-body1 text-weight-bold items-center justify-between">
        {{ props.cirurgia }}
      <q-btn
          icon="fa-solid fa-pen-to-square"
          unelevated
      />
    </div>
    <div class="row">
      {{ props.sala }}
    </div>
    <div class="row">

    </div>
    <div class="row justify-end items-center">
      {{ toggle ? 'Fechada' : 'Aberta' }}
      <q-toggle
          v-model="toggle"
          size="lg"
          checked-icon="fa-solid fa-lock "
          :color="toggle ? 'negative' : 'positive'"
          unchecked-icon="fa-solid fa-lock-open"
          keep-color
      />
    </div>

  </q-card>
</template>

<script setup lang="ts">

import { ref } from 'vue';
const toggle = ref(false)
export type FilaCardProps = {
  cirurgia: string;
  sala: string;
  aberta: string;
}

const props = defineProps<FilaCardProps>()
</script>
