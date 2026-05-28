require('dotenv').config();
const express=require('express');
const appRouter = require('./routes/router');
const notFound = require('./service/notFound');
const app=express();


app.use(express.json());

app.use(appRouter);

app.use(notFound);

app.use((err,req,res,next)=>{
    const message=err.message || "Internal Server Error";
    const statusCode=err.statusCode || 500;
    res.status(statusCode).json({
        success:false,
        message
    })
})

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`The server is running`);
})