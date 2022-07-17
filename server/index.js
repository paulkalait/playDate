import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

//initialize this app
const app = express();

//set up body parser
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

//host data base thorugh the cloud 
const MONGODB_URI = 'mongodb+srv://memories:memories@cluster0.ruxvc.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => app.listen(PORT, () => console.log(`server is running on part: ${PORT}`))).catch((error) => console.log(error))

mongoose.set('useFindAndModify', false)