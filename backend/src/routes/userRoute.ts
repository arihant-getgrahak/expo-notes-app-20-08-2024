import express from "express";
const router = express.Router();

import { login, register } from "../controllers/userController";

router.post("/register", register);

router.post("/login", login);

module.exports = router;
