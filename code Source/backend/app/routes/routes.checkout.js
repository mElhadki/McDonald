const router = require("express").Router();
var pdf = require('html-pdf');
var QRCode = require('qrcode')
var path = require('path')
const { uuid } = require('uuidv4');

let menu = require("../models/model.menu");
let SousMenu = require("../models/model.sousmenu");
let supp = require('../models/model.supp');
let product = require('../models/model.product')
let Coupon = require('../models/model.coupon');
let TableModel = require('../models/model.table');
const stripe = require('stripe')('sk_test_51HOViXL0RN1zXroUxig08g4BkMAmfo401W82WKPGjQ7rEke3Im3UH3uqmGFafS0ZYOUhulr3eX4AXuOdjGgv67mF00lud9Xx5Z')

//route checkout for credit card
router.route("/cc").post(async (req, res) => {
  try {
    var totalAll
    var objData = []

//req.body.id["62387328323", "", ""]
  for (var i = 0; i < req.body.id.length; i++) {

    if (req.body.id[i] !== "") {
      await product.findById(req.body.id[i]).then(function (response) {
        objData.push(response)
      });
    }
  }
var objDataSupp = []

for(var i = 0; i < req.body.idSupp.length; i++){

  if(req.body.idSupp[i] !== ""){
    await supp.findById(req.body.idSupp[i]).then(function(response){
      objDataSupp.push(response)
    } )
  }
}
console.log(objDataSupp);
  var couponObj = {};
  if (req.body.coupon != undefined || req.body.coupon !== "") {
    await Coupon.find({ code: req.body.coupon, valid: "1" }).then(function (response) {
      couponObj = response
    })
    await Coupon.updateOne({ code: req.body.coupon }, { $set: { valid: "0" } })
  }

  await TableModel.updateOne({numeroTable : req.body.table}, {$set: { reserve : "1"}})

  var pointTotal = 0;
  // loop for quantite of product pointtotal = quantiteProduct * pointProduct 
  for (var i = 0; i < req.body.quantite.length; i++) {
    pointTotal += parseInt(req.body.quantite[i]) * parseInt(req.body.point[i]);
  }
  // loop for quantite of supplement 
  for(var i = 0; i < req.body.quantiteSupp.length; i++){
    pointTotal += parseInt(req.body.quantiteSupp[i]) * parseInt(req.body.pointSupp[i])
  }

  var data = "Votre point de fidilte est: " + pointTotal;
  var fileNameQr = 'qr' + uuid() + '.png';
  var fileQrName = './app/qrimg/' + fileNameQr;
  QRCode.toFile(fileQrName, data, function (err, file) {
    var filePdfName = './app/pdf/pdf' + uuid() + '.pdf';
    var options = {
      format: 'A3',
      width: '900px',
      height: '2000px',
      zoomFactor: .5
    };
    var productsPdf = '';
    var totalProducts = 0;
    for (var i = 0; i < objData.length; i++) {
      productsPdf += `
          <tr>
          <td> ${objData[i].nomProduct}</td>
          <td>${req.body.quantite[i]}</td>
          <td>${objData[i].prix} Dhs</td>
        </tr>
          `;
      totalProducts += objData[i].prix * req.body.quantite[i];
    }

    var suppPdf = '';
    var totalSupp = 0;
    for(var i = 0; i < objDataSupp.length; i++){
      suppPdf += `
      <tr>
      <td> ${objDataSupp[i].nomSupp}</td>
      <td>${req.body.quantiteSupp[i]}</td>
      <td>${objDataSupp[i].prix} Dhs</td>
    </tr>
      `;
      totalSupp += objDataSupp[i].prix * req.body.quantiteSupp[i]
    }

    totalAll = totalProducts + totalSupp;
    var messageMin = '';
    if (couponObj[0] != undefined && req.body.coupon != '') {
      totalAll = totalAll - ((totalAll * couponObj[0].percent) / 100);
      var messageMin = ` Apres code appliquer <b> ${req.body.coupon} -${couponObj[0].percent}% </b>`;
    }

    var html = `<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <meta name="Description" content="Enter your description here"/>
                <!-- Latest compiled and minified CSS -->
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

                <!-- Optional theme -->
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
                <link rel="stylesheet" href="assets/css/style.css">
                <title>Title</title>
                <style>
  #customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  #customers td, #customers th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #customers tr:nth-child(even){background-color: #f2f2f2;}

  #customers tr:hover {background-color: #ddd;}

  #customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
  }

  #supp {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  #supp td, #supp th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #supp tr:nth-child(even){background-color: #f2f2f2;}

  #supp tr:hover {background-color: #ddd;}

  #supp th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
  }
  </style>
                </head>
                <body>
                    <div class="container">
                        <h1 class="text-center">Bonjour votre facture Table : ${req.body.table}</h1>
                        <h2 class="text-center"> ${req.body.eat} </h2>
                    </div>
                    <div class="d-flex justify-content-center" style="margin-left: 46%;"    >
                            <img src="file:///C:/Users/Admin/Desktop/McDonaldRoi/backend/app/qrimg/${fileNameQr}" alt="">
                    </div>

                    <div>
                    <table id="customers">
    <tr>
      <th>Plat choisi</th>
      <th>Quantite</th>
      <th>Prix Unitaire</th>
    </tr>
  ${productsPdf}

  <tr>
    <td style="border:none"></td>
    <td><b>Total</b></td>
    <td><b>${totalProducts} Dhs</b> </td>
  </tr>
  </table>
                    </div>
                    <div> 
                    <table id="customers">
                    <tr>
                      <th>Supplement choisi</th>
                      <th>Quantite</th>
                      <th>Prix Unitaire</th>
                    </tr>
                  ${suppPdf}
                
                  <tr>
                    <td style="border:none"></td>
                    <td><b>Total</b></td>
                    <td><b>${totalSupp} Dhs</b> </td>
                  </tr>
                  </table>

                      
                    </div>
                    <h3 class="text-center"><b>Total facture : ${totalAll} Dhs</b>${messageMin}</h3>
                    <h4>Paiement : Carte credit</h4>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

                </body>
                </html>
           `
    // @ts-ignore
    pdf.create(html, options).toFile(filePdfName, function (err, st) {
        res.send(`file:///C:/Users/Admin/Desktop/McDonaldRoi/backend/${filePdfName}`)
    })
  });
  await  stripe.customers.create({
        name: req.body.name,
        email: req.body.email,
        source: req.body.stripeToken
    }).then(async customer => await stripe.charges.create({
        amount: totalAll * 100,
        currency: 'mad',
        customer: customer.id,
        description: 'Achat McDo de la part Mr/Mme/mlle :' + req.body.name
    })).then(() => console.log("stripe success"))
        .catch(err => console.log(err))
} catch (err) { res.send(err) }
});

router.route("/table").post(async (req, res) => {
  var objData = []

  for (var i = 0; i < req.body.id.length; i++) {

    if (req.body.id[i] !== "") {
      await product.findById(req.body.id[i]).then(function (response) {
        objData.push(response)
      });
    }
  }
var objDataSupp = []

for(var i = 0; i < req.body.idSupp.length; i++){

  if(req.body.idSupp[i] !== ""){
    await supp.findById(req.body.idSupp[i]).then(function(response){
      objDataSupp.push(response)
    } )
  }
}
console.log(objDataSupp);
  var couponObj = {};
  if (req.body.coupon != undefined || req.body.coupon !== "") {
    await Coupon.find({ code: req.body.coupon, valid: "1" }).then(function (response) {
      couponObj = response
    })
    await Coupon.updateOne({ code: req.body.coupon }, { $set: { valid: "0" } })
  }

  await TableModel.updateOne({numeroTable : req.body.table}, {$set: { reserve : "1"}})

  var pointTotal = 0;
  for (var i = 0; i < req.body.quantite.length; i++) {
    pointTotal += parseInt(req.body.quantite[i]) * parseInt(req.body.point[i]);
  }

  for(var i = 0; i < req.body.quantiteSupp.length; i++){
    pointTotal += parseInt(req.body.quantiteSupp[i]) * parseInt(req.body.pointSupp[i])
  }

  var data = "Votre point de fidilte est: " + pointTotal;
  var fileNameQr = 'qr' + uuid() + '.png';
  var fileQrName = './app/qrimg/' + fileNameQr;
  QRCode.toFile(fileQrName, data, function (err, file) {
    var filePdfName = './app/pdf/pdf' + uuid() + '.pdf';
    var options = {
      format: 'A3',
      width: '900px',
      height: '2000px',
      zoomFactor: .5
    };
    var productsPdf = '';
    var totalProducts = 0;
    for (var i = 0; i < objData.length; i++) {
      productsPdf += `
          <tr>
          <td> ${objData[i].nomProduct}</td>
          <td>${req.body.quantite[i]}</td>
          <td>${objData[i].prix} Dhs</td>
        </tr>
          `;
      totalProducts += objData[i].prix * req.body.quantite[i];
    }

    var suppPdf = '';
    var totalSupp = 0;
    for(var i = 0; i < objDataSupp.length; i++){
      suppPdf += `
      <tr>
      <td> ${objDataSupp[i].nomSupp}</td>
      <td>${req.body.quantiteSupp[i]}</td>
      <td>${objDataSupp[i].prix} Dhs</td>
    </tr>
      `;
      totalSupp += objDataSupp[i].prix * req.body.quantiteSupp[i]
    }

    var totalAll = totalProducts + totalSupp;
    var messageMin = '';
    if (couponObj[0] != undefined && req.body.coupon != '') {
      totalAll = totalAll - ((totalAll * couponObj[0].percent) / 100);
      var messageMin = ` Apres code appliquer <b> ${req.body.coupon} -${couponObj[0].percent}% </b>`;
    }

    var html = `<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <meta name="Description" content="Enter your description here"/>
                <!-- Latest compiled and minified CSS -->
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

                <!-- Optional theme -->
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
                <link rel="stylesheet" href="assets/css/style.css">
                <title>Title</title>
                <style>
  #customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  #customers td, #customers th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #customers tr:nth-child(even){background-color: #f2f2f2;}

  #customers tr:hover {background-color: #ddd;}

  #customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
  }

  #supp {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  #supp td, #supp th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #supp tr:nth-child(even){background-color: #f2f2f2;}

  #supp tr:hover {background-color: #ddd;}

  #supp th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
  }
  </style>
                </head>
                <body>
                    <div class="container">
                        <h1 class="text-center">Bonjour votre facture Table : ${req.body.table}</h1>
                        <h2 class="text-center"> ${req.body.eat} </h2>
                    </div>
                    <div class="d-flex justify-content-center" style="margin-left: 46%;"    >
                            <img src="file:///C:/Users/Admin/Desktop/McDonaldRoi/backend/app/qrimg/${fileNameQr}" alt="">
                    </div>

                    <div>
                    <table id="customers">
    <tr>
      <th>Plat choisi</th>
      <th>Quantite</th>
      <th>Prix Unitaire</th>
    </tr>
  ${productsPdf}

  <tr>
    <td style="border:none"></td>
    <td><b>Total</b></td>
    <td><b>${totalProducts} Dhs</b> </td>
  </tr>
  </table>
                    </div>
                    <div> 
                    <table id="customers">
                    <tr>
                      <th>Supplement</th>
                      <th>Quantite</th>
                      <th>Prix Unitaire</th>
                    </tr>
                  ${suppPdf}
                
                  <tr>
                    <td style="border:none"></td>
                    <td><b>Total</b></td>
                    <td><b>${totalSupp} Dhs</b> </td>
                  </tr>
                  </table>

                      
                    </div>
                    <h3 class="text-center"><b>Total facture : ${totalAll} Dhs</b>${messageMin}</h3>
                    <h4>Paiement : Cash</h4>

                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

                </body>
                </html>
           `
    // @ts-ignore
    pdf.create(html, options).toFile(filePdfName, function (err, st) {
      res.send(`file:///C:/Users/Admin/Desktop/McDonaldRoi/backend/${filePdfName}`)
    })
  });

});

module.exports = router;