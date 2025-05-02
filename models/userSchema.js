const mongoose =require("mongoose")

const userSchema={
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
}


const userModel =mongoose.model('scmsUser',userSchema)

module.exports =userModel