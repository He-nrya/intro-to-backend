import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connectInstace = await mongoose.connect
        (`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB connected!!!
             ${connectInstace.connection.host}`);
    

    }catch(error) {
        console.log("MongoDB connection failed ", error);
        process.exit(1)
}
}

export default connectDB;