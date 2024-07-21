import SensorData from "../model/vehicle.js";
import { io } from "../index.js";



const alert = async (req, res) => {
  const { latitude, longitude, altitude, speed,date,mobile } = req.body;

  console.log("Sensor Data received!!!");

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
    

    io.sockets
      .in(mobile)
      .emit("accidentOccurred", { message: "Accident occurred!" });
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




export {accidents,alert}
