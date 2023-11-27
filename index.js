import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan";
import router from './Routes/index.js'


const app=express();
dotenv.config()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Welcome")
})

app.use('/api/v1',router)
mongoose.connect(process.env.MONGOURL).then(()=>console.log("Database connected."))
app.listen(process.env.PORT,()=>console.log(`App is running on port ${process.env.PORT}`))