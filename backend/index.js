const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config()
const connnectDB = require("./config/db")
const router = require("./routes")

const app = express()
const httpServer = createServer(app);

// First, set up your CORS configuration object
const corsConfig = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Apply CORS to Express
app.use(cors(corsConfig));

// Create Socket.IO instance with the same CORS configuration
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    },
    allowEIO3: true // Enable Socket.IO v3 compatibility
});

// Socket connection handling
io.on('connection', (socket) => {
    console.log('New client connected');
    
    const userId = socket.handshake.auth.userId;
    if (userId) {
        socket.join(`user_${userId}`);
        console.log(`User ${userId} connected to WebSocket`);
    }

    socket.on('disconnect', () => {
        if (userId) {
            console.log(`User ${userId} disconnected from WebSocket`);
        }
    });
});

// Make io available in routes
app.use((req, res, next) => {
    req.io = io;
    next();
});


app.use(express.json())
app.use(cookieParser())
app.use("/api", router)


const PORT = 8080 || process.env.PORT

connnectDB().then(() => {
    // Use httpServer instead of app.listen
    httpServer.listen(PORT,()=>{
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
        console.log("CORS enabled for:", process.env.FRONTEND_URL || 'http://localhost:3000');
    })
})