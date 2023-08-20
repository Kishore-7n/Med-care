const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

var userSchema =  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
	email:{
        type:String,
        required:true,
        unique:true,
    },

	password:{
        type:String,
        required:true,
        unique:true
    } 
   },);


   //{versionKey:false}

userSchema.statics.signup  =  async function signup(name,email,password)

{
    const exists = await this.findOne({email:email})

    if(exists)
    {
        throw Error("Email already exists")
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({name:name,email:email,password:hash})

    return user;
}


userSchema.statics.login = async function login(email,password)
{
    if(!email || !password)
    {
        throw Error("All field must be filled")
    }

    const user = await this.findOne({email:email})

    if(!user){

        throw Error("Incorrect Email")
    }
    const match = await bcrypt.compare(password,user.password)

    if(!match)
    {
        throw Error("Incorrect Password")
    }

    return user
}

const  User = mongoose.model("Users", userSchema);

module.exports = User;

