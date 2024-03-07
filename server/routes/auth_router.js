const express= require("express");
const {getToDo, saveToDo, updateToDo, deleteToDo}= require("../controllers/auth-controller");

const router = express.Router();

router.route("/").get(getToDo);
router.route("/save").post(saveToDo);
router.route("/update").put(updateToDo);
router.route("/delete").delete(deleteToDo);



module.exports = router; 