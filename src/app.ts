import express, { Application, ErrorRequestHandler, Request, Response } from 'express';
import cors from 'cors'
import router from './app/routers';
import  httpStatus  from "http-status";
import globalErrorHandler from './app/middleWares/globalErrorHandler';

const app:Application = express();

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.get('/',(req:Request,res:Response)=>{
    res.send({
        message:"PH health care server"
    })
})

app.use(globalErrorHandler)

app.use('/api/v1',router)

export default app;
