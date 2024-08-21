// import express from "express";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
import { Request, Response } from "express";
// import connectDB from "./components/db/conn"
const port = Number(process.env.PORT) || 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
// var whitelist = ["*"];
var corsOptions = {
  origin: "*",
  methods: ["GET", "PATCH", "POST", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "device-remember-token",
    "Access-Control-Allow-Origin",
    "Origin",
    "Accept",
  ],
};
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import Routes
const userRoute = require("./routes/userRoute");
const todoRoute = require("./routes/todoRoute");

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Todos Api");
});

app.use("/api/user", userRoute);
app.use("/api/todo", todoRoute);

// Start the server
const startServer = async (port: number) => {
  //   await connectDB();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
};

startServer(port);
