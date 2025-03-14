import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDb.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.router.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'

// const FRONTEND_URL = https://binkey-it-clone.vercel.app

const app = express()
dotenv.config();


app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Ensure it's correctly set
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle Preflight (OPTIONS) Requests
app.options("*", cors());

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
app.use('/api/category', categoryRouter)
app.use('/api/file', uploadRouter)
app.use('/api/subcategory', subCategoryRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is Running", PORT)
  })
})
