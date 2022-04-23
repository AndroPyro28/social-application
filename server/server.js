const express = require('express');
const cors = require('cors');
const {connectDB} = require('./config/connectDB')
const {verifyUser} = require('./middlewares/verifyUser')
const { Server } = require('socket.io');
const socket = require('./webSocket/WebSocket');
require('dotenv').config({path:'./credentials.env'})

const app = express();

const server = require('http').createServer(app)

app.use(express.json({limit:"50mb"}));

app.use(cors({
    origin:['http://localhost:3000', "*"],
    credentials:true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
}))

// app.use(express.urlencoded({extended: true}))

app.use('/api', require('./routes/routes'));
app.use('/...', require("./webSocket/WebSocket"))

app.get('/api/auth', verifyUser, (req, res) => {
    try {
            return res.status(200).json({
                currentUser: req.currentUser,
                success: true,
            });
        
    } catch (error) {
        console.error(error);
    }
})

const PORT = process.env.PORT || 3001;

connectDB(server, PORT);

const io = new Server(server, {
    cors: {
        credentials: true,
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
    }
})

socket(io);

