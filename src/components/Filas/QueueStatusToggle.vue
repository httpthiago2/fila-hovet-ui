<template>
    <q-toggle
        v-bind="$attrs"
        v-model="queueStatus"
        :color="color"
        :true-value="QueueStatus.OPEN"
        :false-value="QueueStatus.CLOSED"
        checked-icon="fa-solid fa-lock"
        unchecked-icon="fa-solid fa-lock-open"
        size="lg"
        keep-color
        @update:model-value="emit('toggle', queueStatus, color, queueStatuslabel)"
    >
      <q-tooltip anchor="bottom middle" self="top middle">
        <span class="text-body2">Situação da fila</span>
      </q-tooltip>
    </q-toggle>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { QueueStatus } from 'components/models'



const props = defineProps<{queueStatus?: QueueStatus}>()
const queueStatus =  ref<QueueStatus>(props.queueStatus ?? QueueStatus.OPEN)


const emit = defineEmits<{
  (e: 'toggle', value: QueueStatus, color: string, label: string): void,
  (e: 'init', value: QueueStatus, color: string, label: string): void }
>()

const queueStatuslabel = computed(() => queueStatus.value ? 'Aberta' : 'Fechada')
const color = computed(() => queueStatus.value ? 'positive' : 'negative')

emit('init', queueStatus.value, color.value, queueStatuslabel.value)
</script>
