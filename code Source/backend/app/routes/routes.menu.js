const router = require("express").Router();
let Menu = require("../models/model.menu");
const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

router.route("/").get((req, res) => {
  Menu.find()
    .then((menu) => res.json(menu))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/add").post(async (req, res) => {

  //to store files on the local file system

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

  //middleware for uploading files

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
    const nomMenu = req.body.nomMenu;
    const imagePath = req.file.originalname;

    const menuPush = new Menu({
      nomMenu,
      imagePath,

    });

    menuPush
      .save()
      .then(() => res.json("Menu successfully added"))
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
    const nomMenu = req.body.nomMenu;
    const imagePath = req.file.originalname;
    Menu.updateOne({ _id: req.params.id }, { nomMenu: nomMenu, imagePath: imagePath}).then(() => res.status(201).json("Sous menu successfully update"))
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
router.route("/delete/:id").delete((req, res) => {
  Menu.findByIdAndDelete(req.params.id).then((menu) => res.json(menu))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/:id").get((req, res) => {
  Menu.findById(req.params.id)
    .then((menu) => res.json(menu))
    .catch((err) => res.status(400).json("Error :" + err));
});



module.exports = router;
