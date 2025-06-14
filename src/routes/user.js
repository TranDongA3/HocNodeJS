const user=require('express').Router()
const {getCurrent} =require('../controllers/user')
import verifyToken from '../middleware/verifyToken'
import verifyRole from '../middleware/verifyRole'
user.get('/user',[verifyToken,verifyRole],getCurrent)

module.exports=user
