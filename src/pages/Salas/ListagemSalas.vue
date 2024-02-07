<template>
  <div class="q-ma-md row">
    <q-card class="full-width">
      <q-card-section class="row bg-primary text-white justify-between">
        <div class="text-h6">Gerenciar Salas</div>
        <q-btn icon="close" unelevated @click="router.back()" />
      </q-card-section>

      <q-card-section class="bg-white q-">
        <div class="row q-mb-xl">
          <q-btn color="secondary" label="Nova Sala" @click="router.push({ name: 'NovaSala' })" />
        </div>
        <div>
          <q-table flat bordered class="text-start" :columns="columns" :rows="salas"></q-table>
        </div>

      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { Fila, Room } from 'components/models'
import { useQuasar } from 'quasar'
import { useRoomApi } from 'src/services/RoomAPI'
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
    name: 'name',
    label: 'Nome',
    field: 'name',
    align: 'left'
  },
  {
    name: 'operacoes',
    label: 'Operações',
    field: 'operacoes',
    align: 'center'
  },
]
const salas = ref<Room[]>([])
const api = useRoomApi();
const getSalas = async () => {
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
  await getSalas()
})
</script>
