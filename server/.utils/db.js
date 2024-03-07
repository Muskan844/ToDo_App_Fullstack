const mongoose = require("mongoose");

const connectDb=async()=>{
 try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected successfully to the database");
 } catch (error) {
    console.log("Database connection failed");
    process.exit(0);
 }
}
module.exports=connectDb;