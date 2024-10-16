import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import passGenerator from 'generate-password'
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config();
const seckret_ket=process.env.SECKRET_KEY;
import { success,failure, loginSuccess } from "../utils/reponseWrapper.js";

 // Configuration
 cloudinary.config({ 
    cloud_name: 'doydbrftm', 
    api_key: '978585916224265', 
    api_secret: '8cBO5y9nm-e8Y5atcjoxqgTtmbE'
});


export const handleRagisterUser=async(req,res)=>
{
    try 
    {
        const {name,email,password,address,conf_Password,contact,isVerified,image}=req.body;
        
        const OTP=Math.floor(1000 + Math.random() * 9000);
           const newHashed=await bcrypt.hash(password,10); 
        const exixctEmail=await userModel.findOne({email});

       if(!name ||   !email || !password ||  !address || !conf_Password)
       {
        
          return res.status(400).send(failure("All Field is Required"))
       }
       else  if(exixctEmail)
       {
          return res.status(400).send(failure("Email already registerd"))
       }
      
     else  if(password===conf_Password)
       {
    //    let transporter = nodemailer.createTransport({
    //     host: "smtp.gmail.com",
    //     port: 465,
    //     secure: true, // true for 465, false for other ports
    //     auth: {
    //         user: 'jaydeeppanwar2003@gmail.com',
    //         pass: 'jlhq anbm vsys kxxm'
    //     }
    // });
    // let info=await transporter.sendMail({
    //     from: 'jaydeeppanwar2003@gmail.com',
    //     to:req.body.email,
    //     subject:"Hello",
    //     text:"OTP",
    //     html: `<html><body>Hello and welcome. Your OTP is: <b>${OTP}</b></body></html>`,
    // });
    
    // if(info.messageId)
    // {
        const response=await userModel.create({
            name:name,
            email:email,
            password:newHashed,
            address:address,
            contact:contact,
            otp:OTP,
            image:image,
            isVerified:isVerified
           })
           
           return res.status(200).send(success(response))
    }   
       
    //  }                  
    else
    {
        return res.status(400).send(failure("Wrong Password"))
    }

} 
    catch (error) 
    {
        console.log(error);
        
       
        return res.status(400).send(failure(error))  
    }
}

export const verifyOtp=async(req,res)=>
{
    try 
    {  const {userOtp}=req.body;
        const response=await userModel.updateOne({otp:userOtp},{$set:{isVerified:true}})
        const passGenerate =  passGenerator.generate({length: 10,numbers: true });
        const result=await userModel.findOne({otp:userOtp});
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'jaydeeppanwar2003@gmail.com',
                pass: 'jlhq anbm vsys kxxm'
            }
        });
        let info=await transporter.sendMail({
            from: 'jaydeeppanwar2003@gmail.com',
            to:result.email,
            subject:"Hello",
            text:"passGenerate",
            html: `<html><body>Your Password is: <b>${passGenerate}</b></body></html>`,
        });
        
        if(info.messageId)
        {
            const hashPassword=await bcrypt.hash(passGenerate,10)
            const response=await userModel.updateOne({email:result.email},{$set:{password:hashPassword}})
               
               return res.status(200).send(success(response))
        }   
           
    } 
    catch (error) {
       return res.status(400).send(error(error)) 
    }
}


export const handleLoginUser=async(req,res)=>
{
    try 
    {  
   const {email,password}=req.body;
   
   const response=await userModel.findOne({email:email,status:true,isVerified:true});
   
   if(response)
   {
       const comparePassword=await bcrypt.compare(password,response.password);
       console.log(comparePassword);
       
       if(comparePassword)
       {
        let token=jwt.sign({...response},seckret_ket,{expiresIn:'1d'});
         return res.status(200).send(loginSuccess(response,token))
       }
       else
       {
         return res.status(400).send(failure("email and password Invalid"))
       }
   }
   else
   {
     return res.status(400).send(failure("user not found"))
   }
} 
catch (error) 
{
    return res.status(400).send(failure(error))
}
  
}

const generateOtp=()=>
{
    return Math.floor(1000 + Math.random() * 9000);
}

export const sendOtp=async(req,res)=>
{
    try
    {
        const {email}=req.body;
        let otp=generateOtp();
        const userData=await userModel.findOne({email:email});

        if(!userData)
        {
            return res.status(400).send({error:"user not found",data:"",status:"Failed"})
        }
        else
        {
        
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for 587 other ports
            auth: {
                user: 'jaydeeppanwar2003@gmail.com',
                pass: 'jlhq anbm vsys kxxm'
            }
        });
        let info= await transporter.sendMail({
            from: 'jaydeeppanwar2003@gmail.com',
            to:req.body.email,
            subject:"Hello",
            text:"OTP",
            html: `<html><body>Hello and welcome. Your OTP is: <b>${otp}</b></body></html>`,
        });
        
        if(info.messageId)
        {
            console.log(info)
            let result=await userModel.updateOne({email:email},{$set:{otp:otp}})
            return res.status(200).send({msg:"OTP send successfully",status:"success",data:result,error:""})
        }
    }
    } 
    catch (error) {
        console.log(error.message);
        
        return res.status(400).send({msg:"Failed",data:"",error:error})
    }
}
 
export const submitOtp=async(req,res)=>
{
    try 
    {
        const  {otp,email}=req.body;
        
        const result=await  userModel.findOne({email:email});
    
        if(result.otp===otp)
        {
            return res.status(200).send({status:"User verification Successfully",data:result,error:""})
        }
        else
        {
            return res.status(400).send({msg:"Invalid OTP",status:"User Verification Failed",data:""})
        } 
    } 
    catch (error) 
    {
        return res.status(400).send(error(error)) 
    }
    
}

export const handleUpdatePassword=async(req,res)=>{

    try 
    {
     const {password,confirmPassword,email}=req.body;
     console.log(req.body);
     
    if(password===confirmPassword)
    {
        const hashed=await bcrypt.hash(password,10)
        console.log(hashed);
        
        let response=await userModel.updateOne({email:email},{$set:{password:hashed}});
        return res.status(200).send({msg:"Password updated successfully",status:"success",data:response});
    }
    else
    {
        return res.status(400).send({msg:"Failed",data:"",error:'Password and Confirm Password does not match'});

    } 
    } 
    catch (error) 
    {
        return res.status(400).send({msg:"Failed",data:"",error:error})
    }
   

}

export const handleGetAllUser=async(req,res)=>
{
    try 
    { 
       const {page,limit}=req.query;
      
       
       const page1=parseInt(page) || 1;
       const limit1=parseInt(limit) || 10;
       const skip=(page1-1)*limit1
       const response=await userModel.find({})
       .skip(skip)
       .limit(limit1)
       const totalCount = await userModel.countDocuments();
     const totalPages=Math.ceil(totalCount/limit1)

     
       

       return res.status(200).send({msg:"success",data:response,totalPages:totalPages}); 
    } 
    catch (error) {
        return res.status(400).send(failure(error))
    }
}

 
export const handleDeleteUser=async(req,res)=>
{
   try 
   {
     const  id=req.params.id;
     const response=await userModel.findByIdAndDelete({_id:id});
     const path=response.image;
     fs.unlink(path,(err)=>{
        if (err) {
            console.error('Error deleting file:', err);
            return;
          }
          console.log('File deleted successfully!');
     })     
     return res.status(200).send(success(response));
   } 
   catch (error) 
   {
      return res.status(400).send(failure(error));
   }
}

export const handleSeacrchUser=async(req,res)=>
{
    try 
    {
        const key=req.params.key;
        const response=await userModel.find({
            $or:[
                {name:{$regex:key.trim(),$options:'i'}},
                {email:{$regex:key.trim(),$options:'i'}}
            ]
        })
        return res.status(200).send(success(response));
        
    } 
    catch (error) {
        
        return res.status(400).send(failure(error));
    }
}


export const handleGetUser=async(req,res)=>
{
    try 
    {
        const  id=req.params.id;
        const response=await userModel.findOne({_id:id});
        return res.status(200).send(success(response));
    } 
    catch (error) 
    {
      return res.status(400).send(failure(error));
    }

}

export  const handleUpdateUser=async(req,res)=>
{
    try 
    {
        const {name,email,address,contact,image}=req.body;
        const  id=req.params.id;
       
        const response=await userModel.updateOne({_id:id},{$set:{name:name,email:email,image:image,address:address,contact:contact}})
        
        return res.status(200).send(success(response));
    } 
    catch (error) {
         return res.status(400).send(error);
    }

}

export const handleUpdateStatus=async(req,res)=>
{
    try 
    {
        const id=req.params.id;
        const {status}=req.body;
        const response=await  userModel.updateOne({_id:id},{$set:{status:status}});
        return res.status(200).send(success(response));
    } 
    catch (error) 
    {
        return res.status(400).send(failure(error))
    }

}

export const handleUploadImage=async(req,res)=>
{
    try 
    {
        const uploadResult=await cloudinary.uploader.upload(req.file.path)
        fs.unlink(req.file.path,(err)=>{
            if (err) {
                console.error('Error deleting file:', err);
                return;
              }
              console.log('File deleted successfully!');
         })     
     
        return res.status(200).send(success(uploadResult.secure_url));
        
    } 
    catch (error) 
    {
        return res.status(400).send(failure(error))
    }
}


