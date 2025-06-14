import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Khong co token");
  }
  const accessToken = token.split(" ")[1];
  jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(400).json("Token khong hop le");

    req.user = user;
    next();
  });
};
export default verifyToken;
