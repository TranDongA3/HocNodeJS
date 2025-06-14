
import db from "../models/index";

export const getOne = async (userId) => {
  try {
    const response = await db.User.findOne({
      where: { id : userId },
      raw : true,
      attributes: { exclude: ['password','role'] },
      include : [
        {model : db.Role, as: 'roleData' , attributes:['id','code','value']}
      ]      
    
    });
   
    return {
      status: response ?"200" : "400",
      message: response ? "Got user" : "User not found",
      userData : response
    };
  } catch (error) {
    
    return {
      status: "400",
      message: "Dang loi catch du lieu user",
    };
  }
};