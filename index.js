const express = require("express"); 
const { connection } = require("./db");
require("dotenv").config(); 
const cors = require("cors"); 
const {userRouter}=require("./Route/User.Route");
const { cartRouter } = require("./Route/Cart.Route");

const app = express(); 
app.use(express.json()); 
app.use(cors()); 

app.get("/",(req,res)=>{
    res.send("Welcome!")
})

app.use("/users",userRouter);
app.use("/cart",cartRouter)

app.listen(process.env.port, async()=>{
    try{
        await connection;  
        console.log("Connected to the Data Base")
    }
    catch(err){
        console.log("Data connection Failed")
    }
    console.log("Port is Running on port",process.env.port)
})