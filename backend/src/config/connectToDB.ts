import mongoose from "mongoose";

const URL:string = "mongodb://127.0.0.1:27017/toDoList"

const connectToDB = async  () =>{
    try {
        await mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex : true,useFindAndModify: false});
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

export default connectToDB