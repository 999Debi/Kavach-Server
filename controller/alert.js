import SensorData from "../model/vehicle.js";

import {io} from "../index.js";
export const alert = async (req, res, next) => {

  const { lat, long, mobile } = req.body;

  console.log("Sensor Data received!!!");

  try {
     const sensorData= await SensorData.findOne({ mobile });
     if (!sensorData) {
       const newsensorData = new SensorData({
         latitude: lat,
         longitude: long,
         mobile,
       });
     
       await newsensorData.save();
     } else {
       sensorData.latitude = lat;
       sensorData.longitude = long;
      
        await sensorData.save();
     }


  
    io.sockets.in(mobile).emit("accidentOccurred", { message: "Accident occurred!" });
    res.json({ message: "Sensor data uploaded successfully" });
   

  } catch (err) {
    next(err);
  }
};
