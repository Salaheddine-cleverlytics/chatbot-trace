// src/server.ts
import "reflect-metadata";
import { createServer } from "http";
import { Server } from "socket.io";
import { app } from "./app";
import { config } from "./config/config";

// Create HTTP and Socket.io servers
const httpServer = createServer(app);
const io = new Server(httpServer, config.socket);

// Socket.io logic
io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("❌ User disconnected:", socket.id);
    });
});

// Start server
httpServer.listen(config.port, () => {
    console.log(`🚀 Server running at http://localhost:${config.port}`);
    console.log(`📦 Environment: ${config.nodeEnv}`);
});
