import { Response, Request, NextFunction } from "express"
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'
const salt = 10
const prismas = new PrismaClient()

export const register = async (req: Request, res: Response) => {
    try {
        const data = req.body


        const check = await prismas.user.findFirst({
            where: {
                email: data.email
            }


        })
        if (check) {
            console.log(check);
            res.status(200).json({ success: false, message: "user alredy exsist" })

            return
        }

        const pass = await bcrypt.hash(data.password, salt)
        const user = await prismas.user.create({
            data: {
                name: data.fullname,
                role: "USER",
                email: data.email,  
                password: pass
            }
        })

        console.log(user);
        res.status(200).json({ success: true, message: "register success full", })

        return
    } catch (error) {
        console.log(error);

        res.status(404).json({ success: false, message: error, catchs: "errs" })
    }

}
const getaccestoken = (req: Request, res: Response, next: NextFunction) => {
    const head = req.headers.authorization

    console.log(head);

}
export const varify = (req: Request, res: Response, next:NextFunction) => {

    const accesToken = req.headers.authorization?.split(" ")[1] as string
    console.log(accesToken, "fasda");
    jwt.verify(accesToken, process.env.ACCESS_TOKEN as string, (err, user) => {
        if (user) {
            console.log(user);
            req.body.userid = user
            next()
            return
        }
        if(err){
        console.log(err);
        res.status(401).json({succes:false,message:"cannot varify user"})
        }

    })
    


}
export const login = async (req: Request, res: Response) => {

    try {
        const bdata = req.body
        const udata = await prismas.user.findFirst({
            where: {
                email: bdata.email
            }
        })
        if (!udata) {
            res.status(200).json({ success: false, message: "user not found" })
            return
        }
        const pass = await bcrypt.compare(bdata.password, udata.password)
        if (!pass) {
            res.status(200).json({ success: false, message: "incorect password" })
            return
        }
        console.log('yess');
        const accesToken = jwt.sign({ id: udata.id }, process.env.ACCESS_TOKEN as string)
        res.status(200).json({ success: true, message: "login success", accesToken: accesToken, udat: { name: udata.name, email: udata.email,role:udata.role } })
        return
    } catch (error) {
        console.log(error);

    }
}


export const getudata = async (req: Request, res: Response) => {
    console.log(req.body);
  const useris=await  prismas.user.findFirst({
        where:{
            id:req.body.userid.id
        }
    })
    console.log(useris);
    if(!useris){
         res.status(401).json({success:false,message:"User not found"})
         return
    }
    const returndata={
        name:useris.name,
        email:useris.email,
        image:useris.image,
        role:useris.role
    }
    res.status(200).json({success:true,udata:returndata})
    return 
}
export const  upimage=async(req:Request,res:Response)=>{
    console.log('here');
    if(!req.file?.path){
        res.status(401).json({success:false,message:'cannot find image'})
        return
    }
   const  id=req.body.userid.id
   console.log(JSON.stringify(id));
   

    console.log(JSON.stringify(req.file));
   const data=await prismas.user.update({
        where:{
            id:id
        },
        data:{
            image:req.file?.path 
        }
    })

    console.log(data);
    res.status(200).json({success:true,image:req.file.path})
    return
    
}
export const  allusers=async (req:Request,res:Response)=>{
    const id =req.body.userid.id
    const user=await prismas.user.findFirst({where:{
        id:id
    }})
    if(!user||user.role!=="ADMIN"){
        res.status(401).json({success:false,message:"Only admin can access"})
        return
    }
    
    

     const  alldata=await prismas.user.findMany()
     res.status(200).json({success:true,data:alldata,message:"Sucessfully fethced data"})
     console.log(alldata);
     return 
    
}
export const userdata=async(req:Request,res:Response)=>{
    const id=Number(req.params.id)
    console.log(id);
    const udata=await prismas.user.findFirst({
        where:{
            id:id
        }
    })
    console.log(udata);
    res.status(200).json({success:true,message:'Data fetched...',user:udata})
    return 
}
export const updateuser=async(req:Request,res:Response)=>{
    const ids=Number(req.params.id) as number
    console.log(req.body);
    const bdata=req.body
    const updatedUser = await prismas.user.update({
        where: { id: ids },
        data: {
            name: bdata.name,
            email: bdata.email,
            image: bdata.image,
            role: bdata.role
        }
    });
    res.status(200).json(updatedUser);
    
    
}
export const deleteuser=async(req:Request,res:Response)=>{
    const ids=Number(req.params.id) as number
    console.log(req.body);
    const bdata=req.body
    const updatedUser = await prismas.user.delete({
        where: { id: ids },
      
    });
    res.status(200).json(updatedUser);
    
    
}
