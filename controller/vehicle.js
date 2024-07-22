import SensorData from "../model/vehicle.js";
import { io } from "../index.js";

import nodemailer from "nodemailer";
import twilio from "twilio";

import dotenv from "dotenv";
dotenv.config();

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } =
  process.env;
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const vehicleLocation= async(req,res)=>{
  const { latitude, longitude,mobile } = req.body;
  try {
    const sensorData = await SensorData.findOne({ mobile });
    sensorData.latitude=latitude;
    sensorData.longitude=longitude;
    await sensorData.save();
    res.json({ message: "Sensor data uploaded successfully" });
  } catch (error) {
    
  }
}

const alert = async (req, res) => {
  const { latitude, longitude, altitude, speed,date,mobile } = req.body;

  try {
    const sensorData = await SensorData.findOne({ mobile });

       sensorData.accidentHistory.push({
        latitude,
        longitude,
        altitude,
        speed,
        date,
      });
      sensorData.latitude = latitude;
      sensorData.longitude = longitude;
      await sensorData.save();
    

    io.sockets.in(mobile).emit("accidentOccurred", { message: "Accident occurred!" });
    
      const msg=`Emergency!!! Your Vehicle has met with an accident and requires immediate attentaion. Location: https://www.google.com/maps?q=${latitude},${longitude}`

    await client.messages.create({
      body: msg,
      from: TWILIO_PHONE_NUMBER,
      to: `+91${mobile}`,
    });

    res.json({ message: "Sensor data uploaded successfully" });
  } catch (err) {
   
  }
};

 const accidents= async (req, res) => {
  const { mobile } = req.body;

  try {
     const vehicle = await SensorData.findOne({ mobile });

      res.status(200).json(  vehicle.accidentHistory);

  } catch (err) {
    
  }
};

const getcurrentLocation =async(req,res)=>{
  const { mobile } = req.body;
  try {
    const {latitude,longitude} = await SensorData.findOne({ mobile });
    res.status(200).json({ latitude, longitude });
  } catch (error) {
    
  }
   

}

 const sendmail= async (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,// google app password 
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({ message:"email sent successfully"});
  } catch (error) {
    
  }
};

const sendsms=async(req,res)=>{
  const { to, message } = req.body;

  try {
    const messageResponse = await client.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to: to,
    });
    res.status(200).json({ message: "sms sent successfully" });
  } catch (error) {
  }
}

export {vehicleLocation,accidents,alert,getcurrentLocation,sendmail,sendsms}
