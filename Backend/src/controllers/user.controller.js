const User = require("../models/user.model");

const userRegistration = async(req, res)=>{
  const {name, email, password} = req.body;

 if (!name || !email || !password) {
    return res.status(400).json({
        message: "All fields are required"
    });
}

  const existingUser = await User.findOne({email : email});
  if(existingUser){
    return res.status(409).json({
      message : "User already exist"
    })
  }

  const user = await User.create({
    name,
    email,
    password
  });

  return res
  .status(200)
  .json({message : "User Registered Successfully!", user}
    
  )
  
}

const getAllRegisteredUser = async(req, res)=>{
  const allUsers = await User.find();
  if(!allUsers){
    return res.status(400).json({message : "users are not found!"});
  } 

  console.log(allUsers);
  return res
  .status(200)
  .json({message : "Users Fetched Successfully", allUsers})
}

const getOneUser = async(req, res)=>{
const oneUser = await User.findOne({name : "kishor"})
if (!oneUser) {
  return res.status(400).json({message: "user not found"})
}

return res
.status(200)
.json({message: "one user find successfully", oneUser})
}


module.exports = {userRegistration, getAllRegisteredUser, getOneUser};