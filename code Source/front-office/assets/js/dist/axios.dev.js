"use strict";

function loadData() {
  axios.get('http://localhost:8080/supp').then(function (res) {
    var html = '';
    var suppAppend = document.getElementById('supAppend');
    var i = 1;
    res.data.forEach(function (element) {
      html += "\n            <div class=\"col-md-2\" style=\"width: 100% !important;    max-width: 72%;\">\n            <div class=\"ibox\">\n              <div class=\"ibox-content product-box\">\n                <div class=\"\">\n                <img src=\"http://localhost:8080/image/".concat(element.imagePath, "\" style=\"width: 100%;\">\n                </div>\n                <div class=\"product-desc\">\n                  <span class=\"product-price\">\n                    ").concat(element.prix, " Dhs\n                  </span>\n                  <a href=\"#\" class=\"product-name\"> ").concat(element.nomSupp, "</a>\n\n                  <div class=\"small m-t-xs\">\n                    Many desktop publishing packages and web page editors now.\n                  </div>\n                  <div class=\"m-t text-righ\">\n\n                    <div class=\"qty mt-5\">\n                    <input type=\"hidden\" id=\"idSupp").concat(i, "\" value=\"").concat(element._id, "\">\n                    <input type=\"hidden\" id=\"pointSupp").concat(i, "\" value=\"").concat(element.pointFid, "\">\n                      <input style=\"width:2%\" type=\"number\" class=\"count\" id=\"qtSupp").concat(i, "\" value=\"1\">\n                      \n                    </div><br />\n                    \n\n                    <div class=\"container\">\n                    \n                        <input type=\"checkbox\" id=\"checkSupp").concat(i++, "\" />\n                     \n                     \n                    </div>\n\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n            ");
    });
    suppAppend.innerHTML = html;
  });
  axios.get('http://localhost:8080/menu').then(function (response) {
    var htmlMenu = '';
    var bigElementMenu = document.getElementById('content-menu');
    response.data.forEach(function (element) {
      htmlMenu += "\n                    <div class=\"col-md-2\">\n                    <a class=\"menu holder-style p15 mb20\" data-toggle=\"modal\" data-id=\"".concat(element._id, "\" href=\"#sousmenu\">\n                      ").concat(element.nomMenu, "\n                      <img  src=\"http://localhost:8080/image/").concat(element.imagePath, "\"  style=\"width: 100%;\">\n                    </a>\n                  </div>\n                    ");
    });
    bigElementMenu.innerHTML = htmlMenu;
  });
  axios.get('http://localhost:8080/table/frontend').then(function (response) {
    var htmlTable = '';
    var elementTable = document.getElementById('tableDispo');

    if (response.data.length <= 0) {
      htmlTable += "\n        <option >Tous les tables est reserv\xE9 !</option>\n        ";
      document.getElementById('cashPurchase').disabled = true;
    } else {
      response.data.forEach(function (element) {
        htmlTable += "\n          <option value=\"".concat(element.numeroTable, "\">").concat(element.numeroTable, "</option>\n          ");
      });
    }

    elementTable.innerHTML = htmlTable;
  });
}

window.addEventListener('load', loadData());
$(document).on("click", ".menu", function () {
  var menuId = $(this).data('id');
  $(".modal-content #idMenu").val(menuId);
  axios.get("http://localhost:8080/sousmenu/findmenu/".concat(menuId)).then(function (res) {
    var html = '';
    var appendMenu = document.getElementById('appendSousMenu');
    res.data.forEach(function (element) {
      html += "\n           <div id=\"dock-panel\" class=\"content\">\n           <div class=\"dock-item\" data-title=\"Tiger Image\">\n               <div class=\"col-xs-4 col-sm-6\">\n                   <a class=\"product holder-style p15 mb20 holder-active\" data-toggle=\"modal\" data-id=\"".concat(element._id, "\" href=\"#product\">\n                     ").concat(element.nomSousMenu, "\n                     <img src=\"http://localhost:8080/image/").concat(element.imagePath, "\" style=\"width: 100%;\">\n                   </a>\n                 </div>\n           </div>\n        </div>\n           ");
    });
    appendMenu.innerHTML = html;
  });
});
$(document).on("click", ".product", function () {
  var sousMenuId = $(this).data('id');
  $(".modal-content-product #idSousMenu").val(sousMenuId);
  axios.get("http://localhost:8080/product/frontoffice/".concat(sousMenuId)).then(function (res) {
    var html = '';
    var appendProduct = document.getElementById('appendProduct');
    console.log(res.data);
    var i = 1;
    res.data.forEach(function (element) {
      html += "\n            \n             \n            <div class=\"col-md-2\" style=\"width: 100% !important;    max-width: 72%;\">\n              <div class=\"ibox\">\n                <div class=\"ibox-content product-box\">\n                  <div class=\"\">\n                  <img src=\"http://localhost:8080/image/".concat(element.imagePath, "\" style=\"width: 100%;\">\n                  </div>\n                  <div class=\"product-desc\">\n                    <span class=\"product-price\">\n                      ").concat(element.prix, " Dhs\n                    </span>\n                    <a href=\"#\" class=\"product-name\"> ").concat(element.nomProduct, "</a>\n\n                    <div class=\"small m-t-xs\">\n                      ").concat(element.ingredient, "\n                    </div>\n                    <div class=\"m-t text-righ\">\n\n                      <div class=\"qty mt-5\">\n                       \n                        <input style=\"width:2%\" type=\"number\" class=\"count\" id=\"qt").concat(i, "\" value=\"1\">\n                        <input type=\"hidden\" id=\"id").concat(i, "\" value=\"").concat(element._id, "\">\n                        <input type=\"hidden\" id=\"point").concat(i, "\" value=\"").concat(element.pointFid, "\">\n                      </div><br />\n                      \n\n                      <div class=\"container\">\n                      \n                          <input type=\"checkbox\" id=\"check").concat(i++, "\" />\n                       \n                       \n                      </div>\n\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n        \n            ");
    });
    appendProduct.innerHTML = html;
  });
});
var btnCash = document.getElementById('cashPurchase');
btnCash.addEventListener('click', function () {
  var urlString = window.location.search;
  var urlParam = new URLSearchParams(urlString);
  var method = urlParam.get('method');

  if (method === 'eatIn') {
    method = 'Servis à table';
  } else if (method === 'takeaway') {
    method = 'Emporté';
  }

  var data = {};
  var quantite = [];
  var point = [];
  var id = [];
  var quantiteSupp = [];
  var pointSupp = [];
  var idSupp = [];

  for (var i = 0; i < 100000; i++) {
    if (document.getElementById('check' + i) != null) {
      if (document.getElementById('check' + i).checked == true) {
        var quantiteValue = document.getElementById('qt' + i).value;
        quantite.push(quantiteValue);
        var pointValue = document.getElementById('point' + i).value;
        point.push(pointValue);
        var idValue = document.getElementById('id' + i).value;
        id.push(idValue);
      }
    }
  }

  for (var i = 0; i < 100000; i++) {
    if (document.getElementById('checkSupp' + i) != null) {
      if (document.getElementById('checkSupp' + i).checked == true) {
        var quantiteValue = document.getElementById('qtSupp' + i).value;
        quantiteSupp.push(quantiteValue);
        var pointValue = document.getElementById('pointSupp' + i).value;
        pointSupp.push(pointValue);
        var idValue = document.getElementById('idSupp' + i).value;
        idSupp.push(idValue);
      }
    }
  }

  var coupon = document.getElementById('coupon').value;
  var table = document.getElementById('tableDispo').value;
  data = {
    quantite: quantite,
    point: point,
    pointSupp: pointSupp,
    id: id,
    idSupp: idSupp,
    quantiteSupp: quantiteSupp,
    coupon: coupon,
    table: table,
    eat: method
  };
  axios.post('http://localhost:8080/checkout/table', data).then(function (res) {
    window.open(res.data);
    window.location.href = 'products.html';
  });
});
var stripe = Stripe('pk_test_51GxrgnJjT1M3ZAOSLSz7QMUEmhim5MKh9xcwOdQDwmZgMRZeefa7rkvolkuCidgx2wtmWAYeN3tI46FUt3xWIRfO00hb1onjbQ'); // put your public key stripe 

var elements = stripe.elements();
var style = {
  base: {
    color: '#32325d',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    },
    border: '1px solid'
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};
var card = elements.create('card', {
  style: style
});
card.mount('#card-element');

function payment() {
  var nom, email, coupon, form, stripeTokenHandler, urlString, urlParam, method, data, quantite, point, id, quantiteSupp, pointSupp, idSupp, i, quantiteValue, pointValue, idValue, stripeTkn, table;
  return regeneratorRuntime.async(function payment$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          nom = document.getElementById('nom').value;
          email = document.getElementById('email').value;
          coupon = document.getElementById('coupon').value;
          form = document.getElementById('payment-form');

          stripeTokenHandler = function stripeTokenHandler(token) {
            var hiddenInput = document.createElement('input');
            hiddenInput.setAttribute('type', 'hidden');
            hiddenInput.setAttribute('name', 'stripeToken');
            hiddenInput.setAttribute('id', 'stripeTKN');
            hiddenInput.setAttribute('value', token.id);
            form.appendChild(hiddenInput);
            console.log(form);
          };

          _context.next = 7;
          return regeneratorRuntime.awrap(stripe.createToken(card).then(function (res) {
            if (res.error) errorEl.textContent = res.error.message;else {
              console.log(res.token);
              stripeTokenHandler(res.token);
            }
          }));

        case 7:
          urlString = window.location.search;
          urlParam = new URLSearchParams(urlString);
          method = urlParam.get('method');

          if (method === 'eatIn') {
            method = 'Servis à table';
          } else if (method === 'takeaway') {
            method = 'Emporté';
          }

          btnCash.disable = true;
          data = {};
          quantite = [];
          point = [];
          id = [];
          quantiteSupp = [];
          pointSupp = [];
          idSupp = [];

          for (i = 0; i < 100000; i++) {
            if (document.getElementById('check' + i) != null) {
              if (document.getElementById('check' + i).checked == true) {
                quantiteValue = document.getElementById('qt' + i).value;
                quantite.push(quantiteValue);
                pointValue = document.getElementById('point' + i).value;
                point.push(pointValue);
                idValue = document.getElementById('id' + i).value;
                id.push(idValue);
              }
            }
          }

          for (i = 0; i < 100000; i++) {
            if (document.getElementById('checkSupp' + i) != null) {
              if (document.getElementById('checkSupp' + i).checked == true) {
                quantiteValue = document.getElementById('qtSupp' + i).value;
                quantiteSupp.push(quantiteValue);
                pointValue = document.getElementById('pointSupp' + i).value;
                pointSupp.push(pointValue);
                idValue = document.getElementById('idSupp' + i).value;
                idSupp.push(idValue);
              }
            }
          }

          stripeTkn = document.getElementById('stripeTKN').value;
          table = document.getElementById('tableDispo').value;
          data = {
            quantite: quantite,
            point: point,
            pointSupp: pointSupp,
            id: id,
            idSupp: idSupp,
            quantiteSupp: quantiteSupp,
            coupon: coupon,
            table: table,
            eat: method,
            name: nom,
            email: email,
            stripeToken: stripeTkn
          };
          axios.post('http://localhost:8080/checkout/cc', data).then(function (res) {
            window.open(res.data);
            window.location.href = 'index.html';
          });

        case 25:
        case "end":
          return _context.stop();
      }
    }
  });
}