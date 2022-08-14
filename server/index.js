import * as dotenv from 'dotenv'
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as path from 'path';
import { fileURLToPath } from 'url';
//routes
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import { rmSync } from 'fs';
dotenv.config()
console.log(process.env.MONGODB_URI)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//call dotenv

//initialize this app
const app = express();

//set up body parser
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//must be above the routes
app.use(cors());

//use middleware for the prefix routes th post routes will be reached bu localhost:3001/posts/ ....
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../client/build/index.html'), function(err){
    if(err){
      res.send(500).send(err)
    }
  });
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err){
    if(err){
      res.status(500).send(err)
    }
  });
});


//  web: npm run start

//host data base through the cloud
const PORT = process.env.PORT || 3001;

mongoose
  .connect(
process.env.MONGODB_URI
  )
  .then(() =>
    app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));


