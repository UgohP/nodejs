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
            dbName: "next14",
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB...");
    }catch(err){
        console.log("Error:", err);
        throw new Error("Error: " + err);
}};

export default connect;

// const mongoose = require('mongoose')

// const connect = (url) => {
//     return mongoose
//     .connect(url, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log('Connected to the db....'))
//     .catch((err) => console.log(err))
// }

// module.exports = connect