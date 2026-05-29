import mongoose from "mongoose";

console.log(process.env.MongoURI, "mongo url");
mongoose.connect(process.env.MongoURI);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('DB Connection is successfull!!!');
})

db.on('err', () => {
    console.log('DB Connection failed!');
})

export default db;