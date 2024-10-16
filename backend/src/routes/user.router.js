import express from 'express'
import { handleDeleteUser, handleGetAllUser, handleGetUser, handleLoginUser, handleRagisterUser, handleSeacrchUser, handleUpdatePassword, handleUpdateStatus, handleUpdateUser, handleUploadImage, sendOtp, submitOtp, verifyOtp } from '../controllers/user.controller.js';
import autenticateUser from '../middelware/autentication.js';
import multer from 'multer'
const userRouter=express.Router();

const uploadImage=multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"_"+file.originalname);
    }
})});

userRouter.route("/upload/image").post(uploadImage.single('image'),handleUploadImage)
userRouter.route("/register").post(handleRagisterUser);
userRouter.route('/login').post(handleLoginUser);
userRouter.route("/sendOtp").patch(sendOtp)
userRouter.route("/submitOtp").post(submitOtp)
userRouter.route("/verifyOtp").patch(verifyOtp)
userRouter.route("/newPassword").patch(handleUpdatePassword)
userRouter.route("/getUser").get(autenticateUser,handleGetAllUser)
userRouter.route('/deleteUser/:id').delete(handleDeleteUser)
userRouter.route('/searchUser/:key').get(handleSeacrchUser)
userRouter.route('/getOneUser/:id').get(handleGetUser)
userRouter.route('/updateUser/:id').patch(handleUpdateUser)
userRouter.route("/updateStatus/:id").patch(handleUpdateStatus)


export default userRouter;