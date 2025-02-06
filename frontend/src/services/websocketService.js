import { io } from 'socket.io-client';

class WebSocketService {
    constructor() {
        this.socket = null;
        this.callbacks = new Map();
    }

    connect(userId) {
        if (this.socket) return;

        this.socket = io(process.env.REACT_APP_BACKEND_URL, {
            auth: { userId },
            withCredentials: true
        });

        // Listen for project updates
        this.socket.on('projectUpdate', (data) => {
            // Notify all registered callbacks
            this.callbacks.forEach(callback => callback(data));
        });

        this.socket.on('connect', () => {
            console.log('WebSocket connected');
        });

        this.socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });
    }

    // Add a callback for project updates
    onProjectUpdate(id, callback) {
        this.callbacks.set(id, callback);
    }

    // Remove a callback
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