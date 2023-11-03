
const express = require("express") 
const Routes = require("./routes/routes.js")
const cors = require("cors"); 
const bodyParser = require("body-parser"); 
const {connection} = require("./connection/db.js")
const app= express()  
const port= 5000      

app.use( bodyParser.urlencoded({ extended: false }) );      
app.use( bodyParser.json() );   
app.use( cors() );   


connection();  

app.get("/",(req,res)=>{
    res.send("Node server running ")     
})
app.use("/api", Routes);    

app.listen(port,()=>{
    console.log(`server is up on :${port}`)   
})