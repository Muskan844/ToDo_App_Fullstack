const todoModel = require("../models/todoSchema");

const getToDo = async (req, res) => {
  try {
    const toDo = await todoModel.find(); //this will give us all todo from our db
    res.send(toDo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const saveToDo = async (req, res) => {
  try {
    // console.log("req body", req.body);
    const { text } = req.body;

    todoModel.create({ text }).then((data) => {
      console.log("Added Successfully!");
      console.log(data);
      res.send(data);
    });

  } catch (error) {
    console.log("save error", error);
  }
};

const updateToDo= async (req,res)=>{
  try {
    const {_id, text}= req.body;
    todoModel
    .findByIdAndUpdate(_id,{text})
    .then(()=>res.send("Updated Successfully!"))
  } catch (error) {
    console.log("update error", error);
    
  }
}
const deleteToDo= async (req,res)=>{
  try {
    const {_id}= req.body;
    todoModel
    .findByIdAndDelete(_id)
    .then(()=>res.send("Deleted Successfully!"))
  } catch (error) {
    console.log("delete error", error);
    
  }
}

module.exports = { getToDo, saveToDo, updateToDo, deleteToDo };
