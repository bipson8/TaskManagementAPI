
const { pool } = require("../config/sqlConnection")
const ErrorHandler=require("../service/ErrorHandler")


module.exports=async function getTask(req,res,next){
    try{
        const [rows] = await pool.query("SELECT * FROM tasks");
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