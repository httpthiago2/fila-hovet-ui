<template>
    <div>
        <h1>Atualizar Status</h1>
        <input v-model="newStatus" />
        <button @click="updateStatus">Atualizar</button>
    </div>
</template>
  
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import WebSocketService from '../../service/webSocketService';

const newStatus = ref('');
const webSocketService = new WebSocketService();
webSocketService.connect();
const updateStatus = () => {
    webSocketService.sendMessageToTopic('/app/updateStatus', newStatus.value);
    newStatus.value = null;
}

onBeforeUnmount(() => {
    webSocketService.disconnect();
})
</script>
  
<style scoped>
/* Seu estilo CSS aqui */
</style>
  