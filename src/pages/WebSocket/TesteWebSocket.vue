<template>
  <div>
    <h1>Status em Tempo Real</h1>
    <p>{{ status }}</p>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue';
import WebSocketService from '../../service/webSocketService';
const status = ref('nada ainda');
const webSocketService = new WebSocketService();

webSocketService.connectAndSubscribeToTopic('/topic/status', (message) => {
  status.value = message;
});

onBeforeUnmount(() => {
  webSocketService.disconnect();
})

</script>

<style scoped></style>