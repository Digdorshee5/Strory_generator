// require("dotenv").config();
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const ChatGenerateRoutes = require("./routes/Chat_generate");

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


// middlewares
app.use(cors());
app.use(express.json());

// routes

app.use("/api/generate-chat", ChatGenerateRoutes);


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port})`));