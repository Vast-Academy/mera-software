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

// Create Socket.IO server with CORS settings
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
});

// Store connected users
const connectedUsers = new Map();

// WebSocket connection handling
io.on('connection', (socket) => {
    const userId = socket.handshake.auth.userId;
    
    if (userId) {
        // Store user's socket connection
        connectedUsers.set(userId, socket.id);
        socket.join(`user_${userId}`); // Create a room for this user
        
        console.log(`User ${userId} connected`);
    }

    socket.on('disconnect', () => {
        if (userId) {
            connectedUsers.delete(userId);
            console.log(`User ${userId} disconnected`);
        }
    });
});

// Make io accessible to routes
app.set('io', io);

app.use(cors({
    origin: process.env.FORNTEND_URL,
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())

// Middleware to add io to req object
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use("/api", router)


const PORT = 8080 || process.env.PORT

connnectDB().then(() => {
    // Use httpServer instead of app.listen
    httpServer.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})