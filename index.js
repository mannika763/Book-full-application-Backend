// import path from "path";
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config')

const cookieParser = require("cookie-parser")
// import cookieParser from "cookie-parser";
const authRoutes= require("./routes/auth.routes.js")
//  import authRoutes from "./routes/auth.routes.js";
// import messageRoutes from "./routes/message.routes.js";
// import userRoutes from "./routes/user.routes.js";

// import connectToMongoDB from "./db/connetToMongoDB";
// import { app, server } from "./socket/socket.js";
const app = express();
dotenv.config();

// const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.

connectDB();
const port = process.env.PORT || 8080

//middlewares
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); 
 app.use(cookieParser());

app.use("/api/auth", authRoutes); 
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });



app.listen(port, ()=>{
    console.log(`server is running ${process.env.NODE_ENV} on port ${process.env.PORT}`)
})