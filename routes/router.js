const deleteTask = require('../controller/deleteTask');
const getTask = require('../controller/getTask');
const postTask = require('../controller/postTask');
const updateTask = require('../controller/updateTask');

const appRouter=require('express').Router();


appRouter.get("/task",getTask)
appRouter.post("/task",postTask)
appRouter.delete("/task/:id",deleteTask)
appRouter.put("/task/:id",updateTask);


module.exports=appRouter;