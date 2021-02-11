const router = require("express").Router();
let Coupon = require("../models/model.coupon");

router.route("/").get((req, res) => {
  Coupon.find()
    .then((coupon) => res.json(coupon))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/add").post((req, res) => {

  const code = req.body.code;
  const percent = req.body.percent;
  const valid = "1";

  const couponPush = new Coupon({
    code,
    percent,
    valid
  });

  couponPush
    .save()
    .then(() => res.json("Coupon successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route('/update/:id').put((req, res) => {

  var data = {
    code: req.body.code,
    percent: req.body.percent,
  }
  Coupon.updateOne({ _id: req.params.id }, data).then(() => res.json("coupon updated !"))
    .catch((err) => res.status(400).json("Error :" + err));
})


router.route('/delete/:id').delete((req, res) => {
  Coupon.findByIdAndDelete(req.params.id).then(() => res.json("coupon deleted :"))
    .catch((err) => res.status(400).json("Error :" + err));

});
router.route("/:id").get((req, res) => {
  Coupon.findById(req.params.id)
    .then((coupon) => res.json(coupon))
    .catch((err) => res.status(400).json("Error :" + err));
});



module.exports = router;
