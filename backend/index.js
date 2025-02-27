let express = require('express');
let app = express();
let allroutes = require('./routes/AllRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());


let corspolicy = {
    origin:"http://localhost:3000"
}
app.use(cors(corspolicy));

app.use((req,res,next) => {
    console.log(" Request received at " + (new Date()));
    next();
});

allroutes.get('/',(req,res) => {
    console.log(" reached root");
    res.send("Welcome to  back end server");
});

let db = async () => { 
    try{ 
        await mongoose.connect('mongodb+srv://visitor:teamg68@cluster0.2eptsrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log(" connected to database");
    }
    catch(err) {
        console.log(' error connecting');
    }
}
db();



app.use('/',allroutes);


app.listen(5002,()=>{ console.log("Backend server listening at port 5001")});