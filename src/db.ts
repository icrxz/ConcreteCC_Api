import mongoose from "mongoose";

let mongoDB = mongoose.connection;

const connectDB = () => {
  const url = `mongodb+srv://admin_modular:KyRD58nkH1jAAiPX@node-concrete.ufzt3.mongodb.net/concrete_dev?retryWrites=true&w=majority`;

  if (mongoDB) {
    return;
  }
  
  mongoose.connect(process.env.MONGODB_URL || url, { useUnifiedTopology: true });

  mongoDB = mongoose.connection;

  mongoDB.once("open", async () => {
    console.log("Connected to database");
  });

  mongoDB.on("error", () => {
    console.log("Error connecting to database");

    mongoose.disconnect();
  });
}

export default connectDB;
