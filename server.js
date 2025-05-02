const express = require("express")
const mongoose = require("mongoose")
const User = require("./models/userSchema")
const Cors = require('cors')
const app =express()

app.use(Cors())
app.use(express.json())

mongoose.connect(
  'mongodb+srv://rijokj199:qwerty123@cluster0.58x8a.mongodb.net/imca?retryWrites=true&w=majority&appName=Cluster0'
).then(()=>{
    console.log("mogoose is connected");
    
})

app.post('/',async(req,res)=>{
    try {
        const userData = await User.create({name:req.body.name,password:req.body.password})
        
        if(userData){
            res.status(200).json({message:"Signup Completed"})
        }else{
            res.status(404).json({message:"Something went Wrong"})
        }


    } catch (error) {
       res.status(500)
         .json({ message: 'Error during signUp', error: error.message })
    }
})

app.post('/login',async(req,res)=>{
    try {
        const loginUser = await User.findOne({name:req.body.name})
        if(!loginUser){
            return res.status(404).json({message:"User not found"})
        }
        if(loginUser.password !==req.body.password){
            return res.status(401).json({message:"Credential Missmatch"})
        }
        res.status(200).json({message:"login successfull"})
    } catch (error) {
        console.log(error.message);
        
    }
})


app.listen(3077,()=>{
    console.log("server is running");
    
})