import express from 'express';
import "dotenv/config.js";
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';

// create app
const app = express();
const server = http.createServer(app);

// middleware
app.use(cors());
app.use(express.json({limit: '5mb'}));

app.use("/api/status",(req, res) => {
    res.send("server is live")
})

// connect to database
await connectDB()


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})