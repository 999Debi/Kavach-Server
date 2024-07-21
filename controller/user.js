import jwt from "jsonwebtoken";
import User from "../model/user.js";
import SensorData from "../model/vehicle.js";
// Register a new user
const register = async (req, res) => {
  const { mobile, username, password } = req.body;

  try {
    const user = await User.findOne({ mobile });
    if (user) {
      return res
        .status(404)
        .json({ message: "Mobile number already exist" });
    }

    const newuser = new User({ username, mobile, password });
    await newuser.save();
    const userVehicle = new SensorData({
      mobile,
    });
    await userVehicle.save();
    res.json({ message: "Registration successful" });
  } catch (error) {

  }
};

// Login with an existing user
const login = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, mobile: user.mobile },
      process.env.SECRET_KEY,
      {
        expiresIn: "1 hour",
      }
    );
    res.status(200).json({ token });
  } catch (error) {
  
  }
};

const chnagePassword= async(req,res)=>{
  const {mobile,password,newPassword}=req.body;

  try {
        const user = await User.findOne({ mobile });
            const passwordMatch = await user.comparePassword(password);
            if (!passwordMatch) {
              return res.status(401).json({ message: "Incorrect password" });
            }
          user.password=newPassword;
          await user.save();
          res.status(200).json({message: "Password changed successfully"})

  } catch (error) {

  }
}

const addContact = async (req,res)=>{
  const {name,email,mobile,usermobile}=req.body;
  try {
    const user = await User.findOne({ mobile:usermobile});   
    user.contacts.push({name,email,mobile});
    await user.save();
    res.status(200).json({ message: "Contact added successfully" });
  } catch (error) {
    
  }
}

export {register,login,chnagePassword,addContact};
