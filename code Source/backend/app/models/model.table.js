const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Table = new Schema(
    {
        numeroTable: {
            type: String,
            required: true,
            trim: true,
            minlenght: 1,
        },
        reserve: {
            type: String,
            required: true,
            trim: true,
            minlenght: 1,
        }
    },
    {
        versionKey: false
    }
);

const TableEx = mongoose.model("Table", Table);
module.exports = TableEx;
