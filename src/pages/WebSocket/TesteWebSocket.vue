<template>
  <div>
    <h1>Status em Tempo Real</h1>
    <p>{{ status }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import WebSocketService from '../../service/webSocketService';
const status = ref('nada ainda');
const webSocketService = new WebSocketService();

webSocketService.connectAndSubscribeToTopic('/topic/status', (message) => {
  status.value = message;
});

</script>

<style scoped></style>