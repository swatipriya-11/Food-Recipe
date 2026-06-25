const mongoose=require("mongoose")
const dns=require("dns")


dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])
const connectDB=async()=>{
    await mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>console.log("connected.."))
}

module.exports=connectDB;