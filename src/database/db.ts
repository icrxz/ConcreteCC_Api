import mongoose from "mongoose";

let mongoDB = mongoose.connection;

export const connect = () => {
  const url = `mongodb+srv://admin_modular:KyRD58nkH1jAAiPX@node-concrete.ufzt3.mongodb.net/concrete_dev?retryWrites=true&w=majority`;

  console.log(mongoDB);

  mongoose.connect(process.env.MONGODB_URL || url, { useUnifiedTopology: true });

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
