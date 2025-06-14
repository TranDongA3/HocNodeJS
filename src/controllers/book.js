import { deleteBook, getBook, updateBook } from "../services/book";
import Joi from "joi";
import { createBook } from "../services/book";
import {
  title,
  price,
  available,
  categoryId,
  image,
  bid,
  bids,
} from "../helpers/joi_schema";
import cloudinary from "cloudinary";

export const getBookList = async (req, res) => {
  try {
    const respone = await getBook(req.query);
    res.status(200).json(respone);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//CREATE BOOK
export const handleCreateBook = async (req, res) => {
  try {
    const fileData = req.file;
    const price = parseInt(req.body.price);
    const { error } = Joi.object({
      title,
      price,
      available,
      categoryId,
      image,
    }).validate({ ...req.body, price: price, image: fileData?.path });
    if (error) {
      if (fileData) {
        cloudinary.uploader.destroy(fileData.filename);
      }
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
    const respone = await createBook(req.body, fileData);

    res.status(201).json(respone);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//UPDATE BOOK
export const handleUpdateBook = async (req, res) => {
  try {
    const fileData = req.file;
    console.log(fileData.filename);
    const { error } = Joi.object({
      bid,
    }).validate({ bid: req.body.bid });
    if (error) {
      if (fileData) {
        cloudinary.uploader.destroy(fileData.filename);
      }
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }

    const respone = await updateBook(req.body, fileData);

    res.status(200).json(respone);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//DELETE BOOK
export const handleDeleteBook = async (req, res) => {
  try {
    
    const { error } = Joi.object({
      bids,
    }).validate({ bids: req.query.bids });
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }

    const respone = await deleteBook(req.query);

    res.status(200).json(respone);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
