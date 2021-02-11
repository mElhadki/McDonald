const router = require("express").Router();
let Supp = require("../models/model.supp");
const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

router.route("/").get((req, res) => {
  Supp.find()
    .then((supp) => res.json(supp))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/add").post(async (req, res) => {

  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // @ts-ignore
      cb(null, __basedir + "/app/upload");
    },
    filename: (req, file, cb) => {
      console.log(file.originalname);
      cb(null, file.originalname);
    },
  });

  let uploadFile = multer({
    storage: storage,
    limits: {
      fileSize: maxSize
    },
  }).single("file");

  let uploadFileMiddleware = util.promisify(uploadFile);

  try {
    await uploadFileMiddleware(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
   //add product 

   const calcPoint = (prix) => {
    if(prix <= 20 && prix >= 7){
        prix = ((prix / 2) * 10) + 5
    }
    else if(prix <= 49 && prix >= 21){
      prix = ((prix / 2) * 10) + 12
    }
    else if(prix >= 50){
      prix = ((prix / 2) * 10) + 20
    }
    return prix;
};
    const nomSupp = req.body.nomSupp;
    const imagePath = req.file.originalname;
    const prix = req.body.prix;
    const pointFid = calcPoint(req.body.prix);
  const suppPush = new Supp({
    nomSupp,
    imagePath,
    prix,
    pointFid
  });

  suppPush
    .save()
    .then(() => res.json("Supplement successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
}
catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }


});
router.route("/update/:id").put(async(req, res) => {

  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // @ts-ignore
      cb(null, __basedir + "/app/upload");
    },
    filename: (req, file, cb) => {
      console.log(file.originalname);
      cb(null, file.originalname);
    },
  });

  let uploadFile = multer({
    storage: storage,
    limits: {
      fileSize: maxSize
    },
  }).single("file");

  let uploadFileMiddleware = util.promisify(uploadFile);

  try {
    await uploadFileMiddleware(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
   //add product 

   const calcPoint = (prix) => {
    if(prix <= 20 && prix >= 7){
        prix = ((prix / 2) * 10) + 5
    }
    else if(prix <= 49 && prix >= 21){
      prix = ((prix / 2) * 10) + 12
    }
    else if(prix >= 50){
      prix = ((prix / 2) * 10) + 20
    }
    return prix;
};
    const nomSupp = req.body.nomSupp;
    const imagePath = req.file.originalname;
    const prix = req.body.prix;
    const pointFid = calcPoint(req.body.prix);

  var data = {
    nomSupp : nomSupp,
    imagePath : imagePath,
    prix : prix,
    pointFid : pointFid
  }
  
    Supp.updateOne({_id:req.params.id}, data).then(() => res.json("Supplement successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
}
catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
});

router.route("/delete/:id").delete((req, res) => {
  Supp.findByIdAndDelete(req.params.id).then(() => res.json("supplement deleted ! "))
  .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/:id").get((req, res) => {
  Supp.findById(req.params.id)
    .then((supp) => res.json(supp))
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
