import { io } from 'socket.io-client';

class WebSocketService {
    constructor() {
        this.socket = null;
        this.callbacks = new Map();
    }

    connect(userId) {
        if (this.socket) return;

        this.socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080', {
            auth: { userId },
            withCredentials: true,
            transports: ['websocket', 'polling'], // Try WebSocket first, fallback to polling
            extraHeaders: {
                'Access-Control-Allow-Origin': '*'
            }
        });

        // Add connection event handlers
        this.socket.on('connect', () => {
            console.log('WebSocket connected successfully');
        });

        this.socket.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error);
        });

        // Listen for project updates
        this.socket.on('projectUpdate', (data) => {
            console.log('Received project update:', data);
            this.callbacks.forEach(callback => callback(data));
        });

        this.socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });
    }

    onProjectUpdate(id, callback) {
        this.callbacks.set(id, callback);
    }

    removeProjectUpdateCallback(id) {
        this.callbacks.delete(id);
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export default new WebSocketService();