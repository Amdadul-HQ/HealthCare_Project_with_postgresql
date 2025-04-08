import express from "express";


const router = express.Router();

router.get("/",(req,res)=> {
    res.send({
        message:"route is working"
    })
})



export const userRoutes = router;