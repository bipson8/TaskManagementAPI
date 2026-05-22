
const { pool } = require("../config/sqlConnection")
const ErrorHandler=require("../service/ErrorHandler")


module.exports=async function postTask(req,res,next){
    let query ="DELETE FROM tasks WHERE id = ?";
    let {id}=req.params;
    if(!id){
        return next(new ErrorHandler(400,"id cannot be empty"));
    }
    try{
        const result = await pool.query(query,[id]);
        console.log(result)
        if (result.affectedRows === 0) {
            return next(new ErrorHandler(404,"Task Not Found"));
        }
        res.status(200).json({
        success:true,
        message:"Deleted Successfully"
    })
    }catch(err){
        console.log(err.sqlMessage);
        return next(new ErrorHandler(400,err.sqlMessage));
    }
    
}