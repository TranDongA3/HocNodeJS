import db from "../models/index";
import { Op, where } from "sequelize";
import { v4 as generateId } from "uuid";
import cloudinary from "cloudinary";
import { raw } from "express";
import { getPublicIdFromUrl } from "../helpers/fn";

export const getBook = async ({
  page,
  limit,
  order,
  name,
  available,
  ...query
}) => {
  try {
    const queries = { raw: true, nest: true };
    const offset = !page || +page <= 1 ? 0 : +page - 1;
    const fLimit = +limit || +process.env.LIMIT_BOOK;
    queries.offset = offset * fLimit;
    queries.limit = fLimit;
    if (order) queries.order = [order];
    if (name) query.title = { [Op.substring]: name };
    if (available) query.available = { [Op.between]: available };
    const respone = await db.Book.findAndCountAll({
      where: query,
      ...queries,
      attributes: { exclude: ["categoryId", "createdAt", "updatedAt", "description"] },
      include: [
        {
          model: db.Category,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          as: "categoryData",
        },
      ],
    });
    return {
      status: "success",
      message: "Get book list successfully",
      data: respone,
    };
  } catch (error) {

    return {
      status: "error",
      message: error.message,
    };
  }
};

//CREATE BOOK
export const createBook = async (body, fileData) => {
    try {
      const respone =await db.Book.findOrCreate({
        where : {title : body.title},
        defaults : {
            id : generateId(),
            ...body,
            image : fileData?.path
        }

      })
      if (fileData && !respone[1]) {
        cloudinary.uploader.destroy(fileData.filename)
      }
      return {
        status : respone[1] ? "success" : "title already exists",
        message : respone[1] ? "Create book successfully" : "Title already exists",
        data : respone[0]
      }
      
    } catch (error) {
     
      return {
        status: "error",
        message: error.message,
      };
    }
  };

  //UPDAATE BOOK
export const updateBook = async ({bid,...body}, fileData) => {
  try {
    if(fileData) body.image=fileData?.path
    console.log(`bid tu services ${bid}`)
    const respone =await db.Book.update(body,{
      where : {id : bid}
    })
    console.log(respone)
    if(fileData && respone[0]===0) cloudinary.uploader.destroy(fileData.filename)
    return {
      status : respone[0] >0 ?"success ": "fail",
      message : respone[0] >0 ? `update book ${respone[0]} successfully` : "id not found/ canot update",
      data : respone[0]
    }
    
   
  } catch (error) {
   if(fileData) cloudinary.uploader.destroy(fileData.filename)
    return {
      status: "error",
      message: error.message,
    };
  }
};

  //Delete Bool
  export const deleteBook = async ({bids}) => {
    try {
      const image= await db.Book.findOne({
        where : {id : bids},
        attributes : ["image"],
        raw : true
      })
      const fileImageName=getPublicIdFromUrl(JSON.stringify(image))
      console.log(fileImageName) 
      console.log(bids)
      
      const respone =await db.Book.destroy({
        where : {id : bids},
      });
      if(respone >0 && fileImageName) {
        cloudinary.uploader.destroy(fileImageName)
      }
      return {
        status : respone >0 ?"success ": "fail",
        message : respone >0 ? `delete book ${respone} successfully` : "id not found/ canot delete",
        data : respone
      }} catch (error) {

      return {
        status: "error",
        message: error.message,
      };
    }
  };
