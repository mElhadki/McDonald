const router = require("express").Router();
let Table = require("../models/model.table");
const shortid = require('shortid');

router.route("/").get((req, res) => {
  Table.find()
    .then((table) => res.json(table))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/frontend").get((req, res) => {
  Table.find({reserve:"0"}).then((table) => res.json(table))
  .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/add").post((req, res) => {

  const numeroTable = shortid.generate();
  const reserve = "0";

  const tablePush = new Table({
    numeroTable,
    reserve
  });

  tablePush
    .save()
    .then(() => res.json("Table successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route('/update/:id').put((req, res) => {

  var data = {
    reserve : req.body.reserve
  }
  Table.updateOne({ _id: req.params.id }, data).then(() => res.json("coupon updated !"))
    .catch((err) => res.status(400).json("Error :" + err));
})


router.route('/delete/:id').delete((req, res) => {
  Table.findByIdAndDelete(req.params.id).then(() => res.json("coupon deleted :"))
    .catch((err) => res.status(400).json("Error :" + err));

});
router.route("/:id").get((req, res) => {
  Table.findById(req.params.id)
    .then((table) => res.json(table))
    .catch((err) => res.status(400).json("Error :" + err));
});



module.exports = router;
