<template>
  <div class="q-ma-md row">
    <q-card class="full-width">
      <q-card-section class="row bg-primary text-white justify-between">
        <div class="text-h6">Gerenciar Filas</div>
        <q-btn icon="close" unelevated @click="router.back()" />
      </q-card-section>

      <q-card-section class="bg-white q-">
        <div class="row q-mb-xl">
          <q-btn color="secondary" label="Nova Fila" @click="router.push({ name: 'NovaFila' })"/>
        </div>
        <div>
          <div class="row justify-start q-gutter-md" v-if="filas.length > 0">
            <fila-card class="col-xxl-1 col-xl-2 col-lg-3 col-md-4 col-sm-12" v-for="fila in filas" :key="fila.id" v-bind="fila" @block="() => console.log(`block ${fila.id}`)" @unblock="() => console.log(`unblock ${fila.id}`)" />
          </div>
          <div v-else class="text-h6 text-center"><q-icon name="fa-solid fa-paw"/> Não há filas cadastradas no momento.</div>
        </div>

      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FilaCard from 'components/Filas/FilaCard.vue'
import { useRouter } from 'vue-router'
import { Fila } from 'components/models'
import { useQuasar } from 'quasar'
import { useQueueApi } from 'src/services/QueueAPI'

const q = useQuasar()
const router = useRouter()

const filas = ref<Fila[]>([])
const api = useQueueApi()
const getFilas = async () => {
  try {
    const { data } = await api.findAll()
    filas.value = data?.data
  } catch (error: any) {
    q.notify({
      color: 'negative',
      message: error.response.data.message
    })
  }


}

onMounted(async () => {
  await getFilas()
})
</script>
