import {getOne} from '../services/user'

export const getCurrent = async (req, res) => {
    try {
        
        const {id} = req.user
        console.log(id)
        const respone = await getOne(id)
        console.log(respone)
        return res.status(200).json((respone))
    } catch (error) {
        return res.status(400).json(('Loi 500'))
    }
  };