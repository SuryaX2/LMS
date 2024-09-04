import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

const connectToMongo = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Conection successful");
    } catch (error) {
        console.error("Error: " + error);
    }
}

export default connectToMongo;