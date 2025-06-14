import db from "../models";
import data from "../../data/data.json";
import { generateCode } from "../helpers/fn";
export const insertJSON = async () => {
  try {
   const categories = Object.keys(data)
   categories.forEach(async (item)=>{
    await db.Category.create({
      code : generateCode(item),
      value : item
    })
   })
   const dataArray = Object.entries(data)
   console.log(dataArray)
   for(const [category,books] of dataArray){
    const categoryCode =generateCode(category)
    
    // lap qua tung danh sach trong danh muc
    for (const book of books){
      await db.Book.create({
        id : book.upc,
        title : book.bookTitle,
        price : book.bookPrice,
        available : book.available,
        image : book.imageUrl,
        description : book.bookDescription,
        categoryId : categoryCode
      })
    }
   }
   return "ok";
  } catch (error) {
    
    return error.message;
  }
};
