const mongoose=require('mongoose');
const { DATABASE_URI } = require('../../config');

async function dbConnect() {
    await mongoose.connect(DATABASE_URI);
    console.log('Database connected successfully');
}

module.exports=dbConnect