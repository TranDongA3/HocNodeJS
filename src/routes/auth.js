const auth = require("express").Router();
import { handleRegister } from "../controllers/auth";
import { handleLogin } from "../controllers/auth";

auth.post("/register", handleRegister);
auth.post("/login", handleLogin);

module.exports = auth;
