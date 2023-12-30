
const user = require('../Model/userModel')
const bcrypt = require('bcrypt')

//userRegister
exports.userRegister = async( req, res, next) => {
    const {name, email, password} = req.body
    const securedPassword = bcrypt.hashSync(password, 10)
    let newUser
    try{
       let existingUser = await user.userModel.findOne({email})

       if(existingUser){
        return res.status(409).json({message: "User already exist"})
       }

        newUser = new user.userModel({
            Name: name,
            email: email,
            password: securedPassword
        })
        newUser = await newUser.save()
    }
    catch(err){
        return res.status(500).json({message: "Internal Server error"})
    }
    if (!newUser){
        return res.status(400).json({message: "some error occured"})
    }
    return res.status(201).json({message: "User registration successful", newUser})
}

//user login
exports.userLogin = async(req, res, next) => {
    let existingUser
    const {email, password} = req.body
    try{
        existingUser = await user.userModel.findOne({email})
    }
    catch(err){
        console.log(err)
       return res.status(500).json({message: "Internal server error"})
    }
    if(!existingUser){
        return res.status(401).json({message: "No user found"})
    }
    const passwordValidation = bcrypt.compareSync(password, existingUser.password)
    if(!passwordValidation){
        return res.status(401).json({message: "Incorrect username or password"})
    }
    return res.status(200).json({message: "Login successful", existingUser})
}

//get all users
exports.getAllUsers = async(req, res, next) => {
    let users
    try{
        users = await user.userModel.find()
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal server error"})
    }
    if(users.length === 0){
        return res.status(400).json({message: "no user found"})
    }
    return res.status(200).json({message: "Users fetched successfully", users})
}