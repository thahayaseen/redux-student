import { Router } from 'express'
import {varify, login, register,getudata,upimage,allusers,userdata,updateuser,deleteuser} from '../controller/user/auth'
const router = Router()
import upload from '../config/multer'

router.post('/register',register)
router.post('/login',login) 
// router.post('/post',varify) 
router.get('/getudata',varify,getudata)
router.post('/upimage',upload.single('profile'),varify,upimage)
router.get('/allusers',varify,allusers)
router.get('/u/:id',userdata)
router.put('/u/:id',updateuser)
router.delete('/u/:id',deleteuser)




export default router