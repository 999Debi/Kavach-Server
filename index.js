import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import connectDB from "./connect.js";


import authRouter from "./routes/auth.js";
import vehicleRouter from "./routes/vehicle.js";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// Initialize Socket.io with CORS configuration
 export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


app.use("/auth", authRouter);
app.use("/", vehicleRouter);

io.on("connection", (socket) => {
  // Handle connections
  console.log("A user connected");

   socket.on("join", (data) => {
     socket.join(data.mobile); // We are using room of socket io
   });

});

app.get("/", function (request, response) {
  response.send("Kavach-Server!!!");
});





const port = process.env.PORT || 3005;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
