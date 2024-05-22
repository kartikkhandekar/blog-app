const mongoose=require('mongoose')
const db=async()=>{
    const data=await mongoose.connect(process.env.MONGO_URL)
    console.log('connected to db')
}
module.exports=db