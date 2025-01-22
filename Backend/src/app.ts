import express from 'express'
import env from 'dotenv'
import user from './router/user'
import cors from 'cors'


// import { PrismaClient } from '@prisma/client'
// const prisma=new PrismaClient({log:["query"]})

// pris()

env.config()
const app=express()
app.use(cors())
app.use(express.json())
app.use('/',user)
const PORT=process.env.PORT||4050
app.listen(PORT,()=>{
    console.log('server started at '+PORT);
    
})