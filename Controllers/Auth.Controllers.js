import UserModal from "../Modals/User.Modal.js"
import bcrypt from "bcrypt"
import Jwt from 'jsonwebtoken';


export const Login = async (req, res) => {
    // res.send("Hello from login")
    try{
        const {email , password} = req.body.userData;
        if(!email || !password) return res.status(401).json({success : false , message : "All Fields are mandatory"})
        const user = await UserModal.findOne({email : email})
        console.log(user, "User")
        if(!user) return res.status(401).json({success : false , message : "Email Not Found"})
        const isPasswordCorrect = await bcrypt.compare(password , user.password)
        console.log(isPasswordCorrect , "check here");
        if(!isPasswordCorrect){
            return res.status(401).json({success : false ,message : "Incorrect Password"})
        }
        //generate token
        const token = await Jwt.sign({id : user._id}, process.env.JWT_SECRET); 
        // console.log(token , "Token")
        return res.status(200).json({success : true , message : "Login Successful", user : {name : user.name , id : user._id},token});
    }catch(error){
        console.log(error)

        return res.status(500).json({success : false , message : 'error found here'})
        
    }
}




export const Register=async(req,res)=>{
    try{
    const {firstname,lastname,email,password,birthday,phoneNumber}=req.body.userData

    const hashedpassword=await bcrypt.hash(password,10)
    const user=new UserModal({
     firstname,
     lastname,
     email,
     password:hashedpassword,
     birthday,
     phoneNumber,
    })
    if(!email || !password || !lastname || !firstname || !birthday || !phoneNumber)
    return res.status(401).json({success:false,message:'all fields are mandatory'})

    await user.save()
    return res.status(200).json({success:"true",message:'Registered successfully',})

    }
    catch(error){
        console.log(error)
   return res.status(500).json({success:false,message:'something went wrong',user})
    }
}

export const getCurrentUser= async (req,res)=>{
    try{
        const {token}=req.body;
        if(!token) return res.status(401).json({success:false , message :"Token is required"})
        const {id}=await Jwt.verify(token,process.env.JWT_SECRET)
        const user =await UserModal.findById(id);
        if (!user) return res.status(401).json({success:false ,message:"user not found"}) 

        return res.status(200).json({success : true,user : {name :user.name , id:user._id}})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success : false , message : 'error over here'})
    }
}



