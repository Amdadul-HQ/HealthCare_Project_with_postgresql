import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import router from './app/routers';
import  httpStatus  from "http-status";

const app:Application = express();

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.get('/',(req:Request,res:Response)=>{
    res.send({
        message:"PH health care server"
    })
})

app.use((err,req:Request,res:Response)=>{
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success:false,
        message:err.name || "Something went wrong",
        error:err
    })
})

app.use('/api/v1',router)

export default app;
