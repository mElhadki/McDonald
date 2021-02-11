const router = require("express").Router();


router.route("/:name").get((req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/app/upload/";
  
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
});

module.exports = router;
