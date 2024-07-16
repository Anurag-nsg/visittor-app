let express = require("express");
const {Visitor} = require("../models/allschemas");
let allroutes = express.Router();


allroutes.get('/',(req,res) => {
    console.log(" reached root");
    res.send("Welcome to real estate market place back end service");
});

allroutes.get('/home',async (req,res) => {
    console.log(" reached/houses");
    try{
        let visitor = await Visitor.find({});
        res.send(visitor);
    }
    catch(err){
        console.log(err);
        res.status(500).send(" error while fetching houses");
    }
    
});




module.exports = allroutes;