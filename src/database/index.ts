import mongoose from "mongoose";

let mongoDB = mongoose.connection;
mongoose.Promise = global.Promise;

export const connect = () => {
  console.log(process.env.MONGODB_URL);
  mongoose.connect(process.env.MONGODB_URL || '', { useUnifiedTopology: true,useNewUrlParser: true });

  mongoDB = mongoose.connection;

  mongoDB.once("open", async () => {
    console.log("Connected to database");
  });

  mongoDB.on("error", () => {
    console.log("Error connecting to database");

    disconnect();
  });
}

export const disconnect = () => {
  if (!mongoDB) return;

  mongoose.disconnect;
}
