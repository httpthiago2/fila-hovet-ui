<template>
  <q-form class="q-ma-md row" @submit="onSubmit">
    <q-card class="full-width">
      <q-card-section class="row bg-primary text-white justify-between">
        <div class="text-h6">{{ action }} Prontuário</div>
        <q-btn icon="close" unelevated @click="router.push({ name: 'GerenciarProntuario' })" />
      </q-card-section>

      <q-card-section class="bg-white">
        <q-input class="q-mb-md" filled v-model="prontuario.petName" label="Nome do PET">
          <template #prepend>
            <q-icon name="pets" />
          </template>
        </q-input>
        <q-input class="q-mb-md" filled v-model="prontuario.tutor" label="Nome do tutor">
          <template #prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input type="number" class="q-mb-md" filled v-model="prontuario.weight" label="Peso">
          <template #prepend>
            <q-icon name="fitness_center" />
          </template>
        </q-input>
        <q-input class="q-mb-md" filled v-model="prontuario.complaint" label="Queixa">
          <template #prepend>
            <q-icon name="emergency" />
          </template>
        </q-input>
        <q-select emit-value map-options lazy-rules
          :rules="[value => value !== null && value !== undefined || 'Selecione uma espécie.']" class="q-mb-md" filled
          v-model="prontuario.species" :options="speciesOptions" label="Espécie" option-value="value"
          option-label="description">
          <template #prepend>
            <q-icon name="medical_information" />
          </template>
        </q-select>
        <q-select map-options emit-value lazy-rules
          :rules="[value => value !== null && value !== undefined || 'Selecione um gênero.']" class="q-mb-md" filled
          v-model="prontuario.gender" :options="genderOptions" label="Sexo" option-value="value"
          option-label="description">
          <template #prepend>
            <q-icon name="wc" />
          </template>
        </q-select>
        <q-select class="q-mb-md" filled v-model="prontuario.queue" :options="filasOptions" label="Fila"
          option-label="name">
          <template #prepend>
            <q-icon name="tv" />
          </template>
        </q-select>



      </q-card-section>

      <q-card-section class="text-white row justify-between items-center">
        <q-btn type="submit" color="positive" label="Salvar" />
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script setup lang="ts">
import { MedicalRecord } from 'components/models'
import { useQuasar } from 'quasar'
import { useMedicalRecordApi } from 'src/services/MedicalRecordAPI'
import { useReadOnlyApi } from 'src/services/crudService'
import dadosExtrasService from 'src/services/dadosExtrasService'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const q = useQuasar()


const action = route.name === 'NovoProntuario' ? 'Novo' : 'Editar'


const medicalRecordApi = useMedicalRecordApi();
const queueApi = useReadOnlyApi('queue');
const filasOptions = ref([]);

const prontuario: MedicalRecord = reactive({
  petName: '',
  tutor: '',
  weight: null,
  complaint: '',
  species: null,
  gender: null,
  medicalRecordStatus: null,
  queue: null
})
const speciesOptions = dadosExtrasService.buscarEspecies();
const statusOptions = dadosExtrasService.buscarStatus();
const genderOptions = dadosExtrasService.buscarGeneros();

const onSubmit = async () => {
  try {
    console.log(prontuario)
    if (action === 'Novo') await medicalRecordApi.create(prontuario)
    if (action === 'Editar') await medicalRecordApi.update(prontuario.id, prontuario)

    await router.push({ name: 'GerenciarProntuario' })
  } catch (error: any) {
    q.notify({ message: error.response.data.message, color: 'negative' })
  }
}

onMounted(async () => {
  try {

    filasOptions.value = (await queueApi.findAll()).data.data;


    if (action === 'Editar') {
      const { data } = await queueApi.findById(route.params.id)
      Object.assign(fila, data?.data);
    }

  } catch (error: any) {
    q.notify({ message: error.response.data.message, color: 'negative' })
  }
})
</script>
