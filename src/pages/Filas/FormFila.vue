<template>
  <q-form class="q-ma-md row" @submit="onSubmit">
    <q-card class="full-width">
      <q-card-section class="row bg-primary text-white justify-between">
        <div class="text-h6">{{ action }} Fila</div>
        <q-btn icon="close" unelevated @click="router.push({ name: 'GerenciarFilas' })" />
      </q-card-section>

      <q-card-section class="bg-white">
        <q-input class="q-mb-md" filled v-model="fila.name" label="Nome" />

        <select-autocomplete class="q-mb-md" filled v-model="fila.room" :options="roomOptions" option-label="name" label="Sala" />

        <q-table title="Prontuários" :rows="fila.medicalRecords" />



      </q-card-section>

      <q-card-section class="text-white row justify-between items-center">
          <div class="col justify-center items-center">

            <queue-status-toggle class="q-mb-md text-black" @toggle="onToggle" @init="onToggle" />

          </div>



        <q-btn type="submit" color="positive" label="Salvar" />

      </q-card-section>
    </q-card>
  </q-form>
</template>

<script setup lang="ts">
import SelectAutocomplete from 'components/Inputs/SelectAutocomplete.vue'
import QueueStatusToggle from 'components/Filas/QueueStatusToggle.vue'
import { Fila, QueueStatus, Room } from 'components/models'
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQueueApi } from 'src/services/QueueAPI'
import { useReadOnlyApi } from 'src/services/crudService'
import { useQuasar } from 'quasar'


const route = useRoute()
const router = useRouter()
const q = useQuasar()
const queueApi = useQueueApi()
const roomApi = useReadOnlyApi('room')

const action = route.name === 'NovaFila' ? 'Nova' : 'Editar'

const fila: Fila = reactive({
  name: '',
  queueStatus: QueueStatus.OPEN,
  room: { name: '' },
  medicalRecords: [],
  userCode: ''
})

const roomOptions: Room[] = reactive([])

const badge = reactive({
  color: '',
  label: ''
})

const onToggle = (status: QueueStatus, color: string, label: string) => {
  fila.queueStatus = status
  badge.color = color
  badge.label = label
}

const onSubmit = async () => {
  try {
    if (action === 'Nova') await queueApi.create(fila)
    if (action === 'Editar') await queueApi.update(fila.id, fila)

    await router.push({ name: 'GerenciarFilas' })
  } catch (error: any) {
    q.notify({ message: error.response.data.message, color: 'negative' })
  }
}

onMounted(async () => {
  try {
    const { data } = await roomApi.findAll()
    roomOptions.push(...data?.data)

    if (action === 'Editar') {
        const { data } = await queueApi.findById(route.params.id)
        Object.assign(fila, data?.data)
    }

  } catch (error: any) {
    q.notify({ message: error.response.data.message, color: 'negative' })
  }
})
</script>
