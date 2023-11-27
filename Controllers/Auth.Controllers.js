import UserModal from "../Modals/User.Modal.js"
import bcrypt from "bcrypt"

export const Login=async(req,res)=>{
    try{
    const {email,password}=req.body
    if(!email||!password)
    return res.status(401).json({success:false,message:'all fields are mandatory'})
    const user=await UserModal.findOne({email})
    const checkpassword=await bcrypt.compare(password,user.password)

    if(checkpassword){
        return  res.status(200).json({success:true,message:'Logged in sucessfully',user})
    }

    if(!user)
    return  res.status(401).json({success:false,message:'user not found'})
   
   
    return res.status(500).json({success:false,message:'check email and password'})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:'error here'})

    }
} 




export const Register=async(req,res)=>{
    try{
    const {name,email,password}=req.body

    const hashedpassword=await bcrypt.hash(password,10)
    const user=new UserModal({
     name,
     email,
     password:hashedpassword
    })
    if(!email || !password || !name)
    return res.status(401).json({success:false,message:'all fiels are mandatory'})

    await user.save()
    return res.status(200).json({success:"true",message:'registered successfully done'})

    }
    catch(error){
        console.log(error)
   return res.status(500).json({success:false,message:error})
    }
}