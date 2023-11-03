const mongoose = require("mongoose");


const mongoooseurl = "mongodb+srv://sunderpandey53:sunder@cluster0.ejgd3ym.mongodb.net/?retryWrites=true&w=majority"



const connect = async () => {
  // Connecting to database using connection string  
  await mongoose
    .connect( mongoooseurl, 
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        }
    )
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("Database connection error", err);
    });
};

exports.connection = connect;