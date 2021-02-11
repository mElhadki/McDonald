const router = require("express").Router();
let Product = require("../models/model.product");
const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

router.route("/frontoffice/:id").get((req, res) => {
    Product.find({idSousMenu : req.params.id})
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error :" + err)); 
});
router.route("/searchproductwithoutsubmenu/:idmenu").get((req, res) => {
    Product.find({idMenu : req.params.idmenu, idSousMenu : "sanssousmenu"})
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error :" + err)); 
})
router.route("/backoffice").get((req, res)=>{
  Product.find().then((product) => res.json(product))
  .catch((err) => res.status(400).json("Error :" + err));
})

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
if(req.body.idSousMenu != undefined || req.body.idSousMenu !== ''){
  const nomProduct = req.body.nomProduct;
  const imagePath = req.file.originalname;
  const idMenu = req.body.idMenu;
  const idSousMenu = req.body.idSousMenu;
  const prix = req.body.prix;
  const pointFid = calcPoint(prix);
  const ingredient = req.body.ingredient;

const ProductPush = new Product({
  nomProduct,
  imagePath,
  idMenu,
  idSousMenu,
  prix,
  pointFid,
  ingredient
});
  ProductPush
    .save()
    .then(() => res.json("Product successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));

}
else{
  const nomProduct = req.body.nomProduct;
  const imagePath = req.file.originalname;
  const idMenu = req.body.idMenu;
  const idSousMenu = 'sanssousmenu';
  const prix = req.body.prix;
  const pointFid = calcPoint(prix);
  const ingredient = req.body.ingredient;
  

const ProductPush = new Product({
  nomProduct,
  imagePath,
  idMenu,
  idSousMenu,
  prix,
  pointFid,
  ingredient
});
  ProductPush
    .save()
    .then(() => res.json("Product successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));

}
   
  } catch (err) {
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

router.route("/update/:id").put(async (req, res) => {
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
  if(req.body.idSousMenu != undefined || req.body.idSousMenu !== ''){
    const nomProduct = req.body.nomProduct;
    const imagePath = req.file.originalname;
    const idMenu = req.body.idMenu;
    const idSousMenu = req.body.idSousMenu;
    const prix = req.body.prix;
    const pointFid = calcPoint(prix);
    const ingredient = req.body.ingredient;
    var data = {
      nomProduct:nomProduct,
      imagePath : imagePath,
      idMenu : idMenu,
      idSousMenu : idSousMenu,
      prix : prix,
      pointFid : pointFid,
      ingredient: ingredient,
    }
    Product.updateOne({_id:req.params.id}, data).then(() => res.status(201).json("product successfully update"))
    .catch((err) => res.status(400).json("Error :" + err));
  }
  else{
    const nomProduct = req.body.nomProduct;
    const imagePath = req.file.originalname;
    const idMenu = req.body.idMenu;
    const prix = req.body.prix;
    const pointFid = calcPoint(prix);
    const ingredient = req.body.ingredient;
    var data1 = {
      nomProduct:nomProduct,
      imagePath : imagePath,
      idMenu : idMenu,
      prix : prix,
      pointFid : pointFid,
      ingredient: ingredient,
    }
    Product.updateOne({_id:req.params.id}, data1).then(() => res.status(201).json("product successfully update"))
    .catch((err) => res.status(400).json("Error :" + err));
   
  } 
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
})

router.route("/delete/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id).then(() => res.json("deleted product successfuly"))
  .catch((err) => res.status(400).json("Error :" + err));
})

router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error :" + err));
});



module.exports = router;
