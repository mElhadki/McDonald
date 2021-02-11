const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Coupon = new Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      minlenght: 3,
    },
    percent:{
        type: String,
        required: true,
        trim: true,
        minlenght: 1,
    },
    valid: {
      type: String,
      required: true,
      trim: true,
      minlenght: 1,
    },
   
  },
  {
    versionKey: false
}
);

const CouponEx = mongoose.model("Coupon", Coupon);
module.exports = CouponEx;
