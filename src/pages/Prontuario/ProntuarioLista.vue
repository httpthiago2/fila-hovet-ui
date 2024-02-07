<template>
  <div class="q-ma-md row">
    <q-card class="full-width">
      <q-card-section class="row bg-primary text-white justify-between">
        <div class="text-h6">Gerenciar Prontuários</div>
        <q-btn icon="close" unelevated @click="router.back()" />
      </q-card-section>

      <q-card-section class="bg-white q-">
        <div class="row q-mb-xl">
          <q-btn color="secondary" label="Novo Prontuário" @click="router.push({ name: 'NovoProntuario' })" />
        </div>
        <div>
          <q-table flat bordered class="text-start" :columns="columns" :rows="salas"></q-table>
        </div>

      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { Fila, MedicalRecord, Room } from 'components/models'
import { useQuasar } from 'quasar'
import { useMedicalRecordApi } from 'src/services/MedicalRecordAPI'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const q = useQuasar()
const router = useRouter()
const columns = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left'
  },
  {
    name: 'petName',
    label: 'Nome do PET',
    field: 'petName',
    align: 'left'
  },
  {
    name: 'tutor',
    label: 'Tutor',
    field: 'tutor',
    align: 'center'
  },
  {
    name: 'weight',
    label: 'Peso',
    field: 'weight',
    align: 'center'
  },
  {
    name: 'complaint',
    label: 'Queixa',
    field: 'complaint',
    align: 'center'
  },
  {
    name: 'queue',
    label: 'Fila',
    field: (row): MedicalRecord => row.queue?.name,
    align: 'center'
  },
]
const salas = ref<Room[]>([])
const api = useMedicalRecordApi();
const getProntuarios = async () => {
  try {
    const { data } = await api.findAll()
    salas.value = data?.data
  } catch (error: any) {
    q.notify({
      color: 'negative',
      message: error.response.data.message
    })
  }


}

onMounted(async () => {
  await getProntuarios()
})
</script>
