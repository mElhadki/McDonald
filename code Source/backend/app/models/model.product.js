const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Product = new Schema(
    {
        nomProduct: {
            type: String,
            required: true,
            trim: true,
            minlenght: 3,
        },
        imagePath: {
            type: String,
            required: true,
            trim: true,
            minlenght: 3,
        },
        idMenu:{
            type: String,
            trim: true,
        },
        idSousMenu: {
            type: String,
            trim: true,
        },
        prix:{
            type:String,
            required: true,
            trim:true,
            minlength:1,
          },
          pointFid:{
            type:String,
            required: true,
            trim:true,
            minlength:3,
          },
          ingredient:{
            type:String,
            required: true,
            trim:true,
            minlength:3,
          }
    },
    {
        versionKey: false
    }
);

const ProductEx = mongoose.model("Product", Product);
module.exports = ProductEx;
