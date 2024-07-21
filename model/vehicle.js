import mongoose from "mongoose";

const sensorDataSchema = new mongoose.Schema(
  {
    longitude: {
      type: String,
      default:""
    },
    latitude: {
      type: String,
      default:""
    },
    mobile: {
      type: String,
      required: true,
    },
    accidentHistory:{
      type: Array,
      default:[]
    }
    
  },
  { timestamps: true }
);

const SensorData = mongoose.model("SensorData", sensorDataSchema);

export default SensorData;
