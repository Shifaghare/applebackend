import mongoose,{Schema} from "mongoose"

const user=new Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    birthday:String,
    phoneNumber:String,
})

export default mongoose.model("User",user)


