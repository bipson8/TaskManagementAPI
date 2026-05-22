
const { pool } = require("../config/sqlConnection")
const ErrorHandler=require("../service/ErrorHandler")


module.exports=async function postTask(req,res,next){
    let query ="INSERT INTO tasks (title) VALUES (?)";
    let {title}=req.body;
    if(!title){
        return next(new ErrorHandler(400,"Title cannot be empty"));
    }
    try{
        const [rows] = await pool.query(query,[title]);
        console.log(rows)
        res.status(200).json({
        success:true,
        message:"Hello every one to my task management api",
        data:rows
    })
    }catch(err){
        console.log(err.sqlMessage);
        return next(new ErrorHandler(400,err.sqlMessage));
    }
    
}