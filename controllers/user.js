  import { compare } from "bcrypt";
import {User} from "../models/user.js";
import { sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

  const newUser = async (req, res) => {

    const {name,username,password,bio} = req.body;
   const avatar = {
    public_id: "hghg",
    url:"ggh"
   };
   const user = await User.create({
      name,
      bio,
      username,
      password,
      avatar
   });
  //  res.status(201).send({message:"User created successfully"});
  sendToken(res, user, 201, "User created successfully");

}

  
  const login = TryCatch(
    async (req, res ,next) => {

      const {username, password} = req.body;
  
      const user = await User.findOne({username}).select("+password");
  
      if(!user) return next(new ErrorHandler("Invalid Username or Password",404))
  
      const isMatch = await compare(password, user.password)
      if(!isMatch) return next(new ErrorHandler("Invalid Username or Password",404))
      
      sendToken(res, user, 201, `Welcome Back ${user.name}`);
    }
  )
  
  const getMyProfile = TryCatch(async(req, res) =>{
    const user = await User.findById(req.user)
    res.status(200).json({
      success: true,
      user: user
    });
  })

  export { login , newUser, getMyProfile}