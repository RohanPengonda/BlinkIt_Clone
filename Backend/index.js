import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDb.js'
import userRouter from './route/user.route.js'



const app = express()
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())
// app.use(morgan())
app.use(morgan('combined'));  // or 'dev' or 'tiny' as per your needs
app.use(helmet({
  crossOriginResourcePolicy: false
}))


const PORT = 8080 || process.env.PORT


app.get("/", (req, res) => {
  //Server to client
  res.json({
    message: "Server is Running " + PORT
  })
})

app.use('/api/user', userRouter)



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is Running", PORT)
  })
})


