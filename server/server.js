const express = require("express");
const connectDb = require("./.utils/db");
const router= require("./routes/auth_router");
const cors= require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Apply middleware before defining routes
app.use(express.json());
app.use(cors());
app.use(router);



connectDb().then(() =>
  app.listen(PORT, () => {
    console.log(`Server is up on the port ${PORT}`);
  })
);
