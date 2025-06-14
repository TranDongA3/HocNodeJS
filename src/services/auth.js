import bcrypt, { compareSync } from "bcrypt";
import db from "../models/index";
import jwt from "jsonwebtoken";

const hashPassWord = (password) => {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(password, salt);
};

export const register = async (email, password, role) => {
  try {
    const respone = await db.User.findOrCreate({
      where: { email },
      defaults: {
        email,
        password: hashPassWord(password),
        role : role,
      },
    });
    const token = respone[1]
      ? jwt.sign(
          { id: respone[0].id, email: respone[0].email, role: respone[0].role },
          process.env.SECRET_KEY,
          { expiresIn: "5d" }
        )
      : null;
    return {
      status: respone[1] ? "success" : "fail",
      message: respone[1] ? "register is succesfully" : "email is existed",
      token: respone[1] ? `Bearer ${token}` : null,
    };
  } catch (error) {
    console.log("error register", error);
    return {
      status: "error",
      message: "register failed",
    };
  }
};

//login 
export const login = async (email, password) => {
  try {
    const respone = await db.User.findOne({
      where: { email },
      raw : true,
    });
    const isChecked=respone && bcrypt.compareSync(password,respone.password)
    const token = isChecked?jwt.sign(
      { id: respone.id, email: respone.email, role: respone.role },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    )
  : null;
    return {
      status: token ? "success" : "fail",
      message: token ? "login is succesfully" : respone?"Your password is incorrect":"Your email is incorrect",
      token: token ? `Bearer ${token}` : null
    };
  } catch (error) {
    console.log("error Login", error);
    return {
      status: "error",
      message: "Login failed",
    };
  }
};