const mongoose=require('mongoose');
const { DATABASE_URI } = require('../../config');

async function dbConnect() {
    // await mongoose.connect(DATABASE_URI.URL);
    await mongoose.connect('mongodb+srv://tradingBe:rajat123@atlascluster.elgcvpa.mongodb.net/trading');
    console.log('Database connected successfully');
}

module.exports=dbConnect