import { register } from "../services/auth";
import { login } from "../services/auth";

export const handleRegister = async (req, res) => {
  try {
    const {  email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        err: -1,
        mes: "Missing payload",
      });
    }
    const respone = await register(email, password, role);
    return res.status(200).json(respone);
  } catch (error) {
    return res.send(error);
  }
};
export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        err: -1,
        mes: "Missing payload",
      });
    }
    const respone = await login(email, password);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json(error);
  }
};
