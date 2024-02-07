<template>
  <q-form class="q-ma-md row" @submit="onSubmit">
    <q-card class="full-width">
      <q-card-section class="row bg-primary text-white justify-between">
        <div class="text-h6">{{ action }} Fila</div>
        <q-btn icon="close" unelevated @click="router.push({ name: 'GerenciarFilas' })" />
      </q-card-section>

      <q-card-section class="bg-white">
        <q-input class="q-mb-md" filled v-model="fila.name" label="Nome" />

        <select-autocomplete class="q-mb-md" filled v-model="fila.doctor" :options="doctorOptions" option-label="name"
          label="Médico" />

        <select-autocomplete class="q-mb-md" filled v-model="fila.room" :options="roomOptions" option-label="name"
          label="Sala" />

        <q-input class="q-mb-md" filled v-model="fila.code" label="Código da fila" />

        <q-table v-if="action === 'Editar'" title="Prontuários" :rows="fila.medicalRecords" />



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
import QueueStatusToggle from 'components/Filas/QueueStatusToggle.vue'
import SelectAutocomplete from 'components/Inputs/SelectAutocomplete.vue'
import { Fila, QueueStatus, Room, User } from 'components/models'
import { useQuasar } from 'quasar'
import { useQueueApi } from 'src/services/QueueAPI'
import { useReadOnlyApi } from 'src/services/crudService'
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'


const route = useRoute()
const router = useRouter()
const q = useQuasar()
const queueApi = useQueueApi()
const roomApi = useReadOnlyApi('room')
const userApi = useReadOnlyApi('user')

const action = route.name === 'NovaFila' ? 'Nova' : 'Editar'

const fila: Fila = reactive({
  name: '',
  queueStatus: QueueStatus.OPEN,
  doctor: { name: '' },
  room: { name: '' },
  medicalRecords: [],
  userCode: '',
  code: ''
})

const roomOptions: Room[] = reactive([])
const doctorOptions: User[] = reactive([])
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
  console.log(fila)
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
    const filas = (await roomApi.findAll()).data.data
    console.log(filas)
    roomOptions.push(...filas);

    const medicos = (await userApi.findAll()).data.data;
    console.log(medicos)
    doctorOptions.push(...medicos);

    if (action === 'Editar') {
      const { data } = await queueApi.findById(route.params.id)
      Object.assign(fila, data?.data)
    }

  } catch (error: any) {
    q.notify({ message: error.response.data.message, color: 'negative' })
  }
})
</script>
