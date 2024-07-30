import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL

const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    if(connectionState === 1){
        console.log("Already connected...");
        return;
    }
    
    if(connectionState === 2){
        console.log("Connecting...");
    }

    try{
        mongoose.connect(MONGODB_URL, {
            dbName: "next",
            bufferCommands: true,
        });
        console.log("Connected to MongoDB...");
    }catch(err){
        console.log("Error:", err);
        throw new Error("Error: " + err);
}};

export default connect;