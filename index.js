import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import poemRoutes from './routes/poemRoutes.js'
import { errorHandler } from './middlewares/errorMiddleware.js'
import { logger } from './middlewares/logger.js'
import helmet from 'helmet'
import limiter from './utils/limiter.js'
import cors from 'cors'


dotenv.config()
const app = express()

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("MongoDB connected."))
    .catch(err => console.log(err))


app.use(express.json())
app.use(helmet())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


app.get("/", (req,res)=> {
    res.send("Backend is working!")
})


app.use("/api/v1/users", logger, userRoutes)

app.use("/api/v1/auth", logger, limiter, authRoutes)

app.use("/api/v1/poems", logger, poemRoutes)


app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on Port ${process.env.PORT}`)
})

app.use(errorHandler)