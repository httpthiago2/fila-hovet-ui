<template>
  <q-card bordered class="q-pa-md rounded-borders rounded">
    <div class="row text-body1 text-weight-bold items-center justify-between">
        {{ props.name }}
      <q-btn
          icon="fa-solid fa-pen-to-square"
          unelevated
          @click="router.push({ name: 'EditarFila', params: { id: props.id } })"
      />
    </div>
    <div class="row">
      {{ props.room.name }}
    </div>
    <div class="row">

    </div>
    <div class="row justify-between items-center">
      <q-badge :color="badge.color" :label="badge.label" />
      <queue-status-toggle @toggle="onToggle" @init="onToggle" />
    </div>

  </q-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Fila } from 'components/models'
import QueueStatusToggle from 'components/Filas/QueueStatusToggle.vue'
import { QueueStatus } from 'components/models'
import { reactive } from 'vue';


const router = useRouter()


const props = defineProps<Fila>()
const emit = defineEmits(['block', 'unblock'])
const badge = reactive({
  color: '',
  label: ''
})

const onToggle = (status: QueueStatus, color: string, label: string) => {
  status === QueueStatus.OPEN ? emit('unblock') : emit('block')
  badge.color = color
  badge.label = label
}

</script>
