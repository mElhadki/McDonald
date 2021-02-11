const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Menu = new Schema(
  {
    nomMenu: {
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
   
  },
  {
    versionKey: false
}
);

const MenuEx = mongoose.model("Menu", Menu);
module.exports = MenuEx;
