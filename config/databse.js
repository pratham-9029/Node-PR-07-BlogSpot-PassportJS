import mongoose from "mongoose";
import { envConfig } from "./dotenv.js";

const db = async () =>{
    try {
        await mongoose.connect(envConfig.MONGODB_URL);
        console.log("Databse Connected.");
    } catch (error) {
        console.log(error.message);
    }
}

export default db();