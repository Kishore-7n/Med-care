
const mongoose = require("mongoose")

var nameSchema =  mongoose.Schema({
    Name:{
        type:String,
    },
    Age:{
        type:Number,
    },
    MobileNumber:{
        type:Number,
    }
    ,
    DoctorName:{
        type:String,
    },
    Slot:{
        type:String,
    },
    DateofAppointment:{
        type:Date
}},{versionKey:false});

var Userdetail = mongoose.model("Details",nameSchema);

module.exports = Userdetail;