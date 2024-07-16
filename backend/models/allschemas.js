let mongoose = require('mongoose');
let visitor = new mongoose.Schema(
    {
      "id": {
        "type": "Number"
      },
        "address": {
          "type": "String",
          "required": true
        },
        "locality": {
          "type": "String",
          "required": true
        },
        "bhk": {
          "type": "String",
          "required": true
        },
        "description": {
          "type": "String",
          "required": true
        },
        "price": {
          "type": "Number",
          "required": true
        },
        "photo": {
          "type": "String",
          "required": true
        }
      }
);


let Visitor = mongoose.model('Visitor',visitor);



module.exports = {Visitor};


