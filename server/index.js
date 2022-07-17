import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'

//initialize this app
const app = express();




//set up body parser
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))

//must be above the routes
app.use(cors())

//use middleware for the prefix routes th post routes will be reached bu localhost:5000/posts/ ....
app.use('/posts', postRoutes)


//host data base thorugh the cloud 
const MONGODB_URI = 'mongodb+srv://memories:memories@cluster0.ruxvc.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 3001;
mongoose.connect(MONGODB_URI).then(() => app.listen(PORT, () => console.log(`server is running on part: ${PORT}`))).catch((error) => console.log(error))
