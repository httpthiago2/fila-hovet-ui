import SockJS from 'sockjs-client/dist/sockjs';
import Stomp from 'stompjs';

class WebSocketService {
    constructor() {
        this.webSocketUrl = 'http://localhost:8080/ws';
        this.socket = new SockJS(this.webSocketUrl);
        this.stompClient = Stomp.over(this.socket);
        this.isConnected = false; // Novo estado para indicar se a conexão está estabelecida
    }

    connect() {
        this.stompClient.connect({}, (frame) => {
            console.log('Conectado ao WebSocket');
            this.isConnected = true; // Atualiza o estado ao conectar
        });
    }

    connectAndSubscribeToTopic(topic, callback) {
        this.stompClient.connect({}, async (frame) => {
            console.log('Conectado ao WebSocket');
            this.isConnected = true;
            this.stompClient.subscribe(topic, (message) => {
                callback(message.body);
            });
        });
    }

    sendMessageToTopic(topic, message) {
        if (this.isConnected) {
            this.stompClient.send(topic, {}, JSON.stringify(message));
        } else {
            console.error('A conexão WebSocket ainda não foi estabelecida.');
        }
    }

    disconnect() {
        if (this.stompClient.connected) {
            this.stompClient.disconnect();
            this.isConnected = false; // Atualiza o estado ao desconectar
        }
    }
}

export default WebSocketService;