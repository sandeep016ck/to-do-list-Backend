const express=require("express");
const router=express.Router();
const {getTask,getTasks,deleteTask,updateTask, createTask}=require("../controllers/taskController");
const verification = require("../middleware/verification");

router.use(verification);
router.get('/',getTasks);
router.get('/:id',getTask);
router.post('/',createTask);
router.post('/:id',updateTask);
router.delete('/:id',deleteTask);



module.exports=router;