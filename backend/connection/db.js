let mongoose = require("mongoose");


const mongoLiveURI = "mongodb+srv://sunderpandey53:sunder@cluster0.ejgd3ym.mongodb.net/?retryWrites=true&w=majority"



const connectToMongo = async () => {
  // Connecting to database using connection string  
  await mongoose
    .connect( mongoLiveURI, 
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

exports.connection = connectToMongo;