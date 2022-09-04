import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { createServer } from "http";
import cors from "cors";
import * as path from "path";
import { fileURLToPath } from "url";
//routes
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import chatRoute from "./routes/chats.js";
import messageRoute from "./routes/message.js";
import { Server } from "socket.io";
dotenv.config();
console.log(process.env.MONGODB_URI);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//initialize this app
const app = express();
const httpServer = createServer(app);
//set up body parser
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//must be above the routes
app.use(cors());

//use middleware for the prefix routes th post routes will be reached bu localhost:3001/posts/ ....
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Serve up static assets
app.use("/images", express.static(path.join(__dirname, "../client/images")));

//---------------SOCKET IO LOGIC------------------
const io = new Server(httpServer, {
  cors: {
    //react server
    origin: "http://localhost:3000",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  //add new User
  socket.on("new-user-add", (newUserId) => {
    //if user is not add peviously
    if (!activeUsers?.some((user) => user?.userId === newUserId)) {
      activeUsers?.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    console.log("connected users", activeUsers);
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    //filter out the user that is trying to disconnect
    activeUsers = activeUsers?.filter((user) => user?.socketId !== socket.id);
    console.log("User disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });

  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers?.find((user) => user?.userId === receiverId);
    console.log("sending from socket to : ", receiverId);
    console.log("data", data);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
app.get("*", (request, response) => {
  response.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      if (err) {
        res.send(500).send(err);
      }
    }
  );
});

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

//  web: npm run start

//host data base through the cloud
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    httpServer.listen(PORT, () =>
      console.log(`server is running on port: ${PORT}`)
    )
  )
  .catch((error) => console.log(error));
