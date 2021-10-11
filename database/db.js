const mongoose = require('mongoose');
const {DB_URL} = process.env;

async function createConnection(){
    
    const connection = await mongoose.connect(DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    if(connection){
        console.log("Connected");
    }
}

module.exports = createConnection;