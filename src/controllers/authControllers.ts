import {NextFunction, Request,Response} from "express";
import User from "../models/User";



//  REGISTER
const register = async(req:Request,res:Response,next:NextFunction)=>{
try{
const {name,surname,email,password}=req.body;
console.log(req.body);

let ifUserExist = await User.findOne({email})
if(ifUserExist){
    return res.status(400).json({message:"Email already taken"});
}

const user = await User.create({
    name,surname,email,password
})

if(user){
    const token = user.generateJWT();
    res.cookie("auth_token",token,{
        httpOnly:true,
        secure:false,
        maxAge:86400000,
    })
    res.status(200).json({
        name:user?.name,
        surname:user?.surname,
        email:user?.email,
        isAdmin:user?.isAdmin,
        
    })
}

}catch(error){
    console.log(error);
    next(error);
}
}

// LOGIN

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
  
      if (!user) {
        throw new Error("Invalid email or password.");
      }
  
      if (await user.comparePassword(password)) {
const token =  await user.generateJWT();
res.cookie("auth_token",token,{
  httpOnly:true,
  secure:false,
  maxAge:86400000,
})
         res.status(200).json({
          token:token,
          name: user?.name,
          surname: user?.surname,
          email: user.email,
       
         
        });
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

const validateToken=async(req:Request,res:Response,next:NextFunction)=>{

try{

const user = await User.findById({_id:req?.user?.userId}).select(["-password","-createdAt","-updatedAt","-_id"])


res.status(200).json(user)
}catch(error){
  console.log(error);
  next(error)
}
}




export const authController ={
    register,
    login,
    validateToken,
}