const insert=require('express').Router()
import { insertData } from '../controllers/insert'

insert.get('/insert',insertData)

module.exports=insert
