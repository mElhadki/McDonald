const router = require("express").Router();
let SousMenu = require("../models/model.sousmenu");
const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

router.route("/").get((req, res) => {
    SousMenu.find()
    .then((sousmenu) => res.json(sousmenu))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/findmenu/:idMenu").get((req, res) => {
  SousMenu.find({idMenu : req.params.idMenu}).then((sousmenu) => res.json(sousmenu))
  .catch((err) => res.status(400).json("Error :" + err));
})

router.route("/add").post(async(req, res) => {
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
    const nomSousMenu = req.body.nomSousMenu;
    const imagePath = req.file.originalname;
    const idMenu = req.body.idMenu

  const sousMenuPush = new SousMenu({
    nomSousMenu,
    imagePath,
    idMenu
  });

  sousMenuPush
    .save()
    .then(() => res.json("Sous Menu successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
   
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

router.route('/update/:id').put(async (req,res) => {
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

  //uploadFile as callback
  
  let uploadFileMiddleware = util.promisify(uploadFile);

  try {
    await uploadFileMiddleware(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    var nomSousMenu  = req.body.nomSousMenu;
    var imagePath = req.file.originalname;
    var idMenu = req.body.idMenu;
    SousMenu.updateOne({_id:req.params.id}, {nomSousMenu : nomSousMenu, imagePath:imagePath, idMenu : idMenu} ).then(() => res.status(201).json("Menu successfully update"))
    .catch((err) => res.status(400).json("Error :" + err));
   
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
   
})
router.route("/delete/:id").delete((req, res) => {
  SousMenu.findByIdAndDelete(req.params.id).then((sousmenu) => res.json(sousmenu))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/:id").get((req, res) => {
  SousMenu.findById(req.params.id)
    .then((sousmenu) => res.json(sousmenu))
    .catch((err) => res.status(400).json("Error :" + err));
});


//I use it for <select> backoffice 
router.route("/select/:id").get((req, res) => {
  SousMenu.find({idMenu : req.params.id})
    .then((sousmenu) => res.json(sousmenu))
    .catch((err) => res.status(400).json("Error :" + err));
});


module.exports = router;
