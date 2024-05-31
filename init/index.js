const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main(){
    await mongoose.connect("mongodb://localhost:27017/wanderlust")
}
main()
.then(()=>{
    console.log("MongoDb connect");
}).catch((err)=>{
    console.log(err);
})

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:"66574d7a43bf3b2e4a42ee52"}))
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();