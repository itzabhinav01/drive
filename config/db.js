const mongoose = require ('mongoose');

function connectToDB(){
    // console.log(process.env.MONGO_URI) 
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('Connected to MongoDB successfully');
    })
}
module.exports = connectToDB;