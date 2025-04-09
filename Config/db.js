const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables from .env file


//connect to DB

console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//acquire the connection
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console, 'Error Connecting Database'));

db.once('open', function(){
    console.log("successfully connected to Database")
});


module.exports = mongoose;