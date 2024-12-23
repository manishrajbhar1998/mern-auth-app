const mongoose = require('mongoose');

// znS2cACuUtF8@7m

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
.then(()=>{
    console.log("MongoDB Connected...");
}).catch((err)=>{
    console.log("MongDB COnnection Error :",err);
})
