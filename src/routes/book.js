import { Router } from "express";
const bookRouter = Router();
const { getBookList, handleCreateBook, handleUpdateBook, handleDeleteBook } = require("../controllers/book");
import verifyToken from "../middleware/verifyToken";
import verifyRole from "../middleware/verifyRole";
import uploadCloud from "../middleware/uploader";

bookRouter.get("/", getBookList);
bookRouter.post("/", [verifyToken, verifyRole], uploadCloud.single("image"), handleCreateBook);
bookRouter.put("/", [verifyToken, verifyRole], uploadCloud.single("image"), handleUpdateBook);
bookRouter.delete("/", [verifyToken, verifyRole], handleDeleteBook);


export default bookRouter;
