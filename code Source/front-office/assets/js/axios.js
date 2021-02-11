 function loadData() {
    axios.get('http://localhost:8080/supp').then((res) => {
        var html = '';
        var suppAppend = document.getElementById('supAppend')
        var i = 1;
        res.data.forEach(element => {
            html += `
            <div class="col-md-2" style="style="width: 50% !important;
            max-width: 50%;">
            <div class="ibox">
              <div class="ibox-content product-box">
                <div class="">
                <img src="http://localhost:8080/image/${element.imagePath}" style="width: 100%;">
                </div>
                <div class="product-desc">
                  <span class="product-price">
                    ${element.prix} Dhs
                  </span>
                  <a href="#" class="product-name"> ${element.nomSupp}</a>

                  <div class="small m-t-xs">
                    Many desktop publishing packages and web page editors now.
                  </div>
                  <div class="m-t text-righ">

                    <div class="qty mt-5">
                    <input type="hidden" id="idSupp${i}" value="${element._id}">
                    <input type="hidden" id="pointSupp${i}" value="${element.pointFid}">
                      <input style="width:2%" type="number" class="count" id="qtSupp${i}" value="1">
                      
                    </div><br />
                    

                    <div class="container">
                    
                        <input type="checkbox" id="checkSupp${i++}" />
                     
                     
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
            `;
        });
       
        suppAppend.innerHTML = html
    })
     axios.get('http://localhost:8080/menu').then((response) => {
        var htmlMenu = '';
        var bigElementMenu = document.getElementById('content-menu');
        response.data.forEach(element => {
            htmlMenu += `
                    <div class="col-md-2">
                    <a class="menu holder-style p15 mb20" data-toggle="modal" data-id="${element._id}" href="#sousmenu">
                      ${element.nomMenu}
                      <img  src="http://localhost:8080/image/${element.imagePath}"  style="width: 100%;">
                    </a>
                  </div>
                    `
        });
       
        bigElementMenu.innerHTML = htmlMenu;
    })

    axios.get('http://localhost:8080/table/frontend').then((response) => {
      var htmlTable = '';
      var elementTable = document.getElementById('tableDispo');
      if(response.data.length <= 0){
        htmlTable += `
        <option >Tous les tables est reservé !</option>
        `
        document.getElementById('cashPurchase').disabled = true
      }
      else{
        response.data.forEach(element => {
          htmlTable += `
          <option value="${element.numeroTable}">${element.numeroTable}</option>
          `
      });
      }
  
     
      elementTable.innerHTML = htmlTable;
    })
  }
window.addEventListener('load', loadData());

$(document).on("click", ".menu", async function () {
    var menuId = $(this).data('id');
    $(".modal-content #idMenu").val( menuId );
    var html = '';
    var appendMenu = document.getElementById('appendSousMenu');
    axios.get(`http://localhost:8080/sousmenu/findmenu/${menuId}`).then((res) => {
     
       
       res.data.forEach(element => {
           html += `
           <div id="dock-panel" class="content">
           <div class="dock-item" data-title="Tiger Image">
               <div class="col-xs-4 col-sm-6">
                   <a class="product holder-style p15 mb20 holder-active" data-toggle="modal" data-id="${element._id}" href="#product">
                     ${element.nomSousMenu}
                     <img src="http://localhost:8080/image/${element.imagePath}" style="width: 100%;">
                   </a>
                 </div>
           </div>
        </div>
           `
       });
      })
    await   axios.get(`http://localhost:8080/product/searchproductwithoutsubmenu/${menuId}`).then((res) => {
         res.data.forEach(element => {
           var i = 1
          html += `
          
          <div class="col-md-2" style="width: 50% !important;
          max-width: 50%;">
              <div class="ibox">
                <div class="ibox-content product-box">
                  <div class="">
                  <img src="http://localhost:8080/image/${element.imagePath}" style="width: 100%;">
                  </div>
                  <div class="product-desc">
                    <span class="product-price">
                      ${element.prix} Dhs
                    </span>
                    <a href="#" class="product-name"> ${element.nomProduct}</a>

                    <div class="small m-t-xs">
                      ${element.ingredient}
                    </div>
                    <div class="m-t text-righ">

                      <div class="qty mt-5">
                       
                        <input style="width:2%" type="number" class="count" id="qt${i}" value="1">
                        <input type="hidden" id="id${i}" value="${element._id}">
                        <input type="hidden" id="point${i}" value="${element.pointFid}">
                      </div><br />
                      

                      <div class="container">
                      
                          <input type="checkbox" id="check${i++}" />
                       
                       
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          `
         })
          
      })
       appendMenu.innerHTML = html;
   
});

$(document).on("click", ".product", function() {
    var sousMenuId = $(this).data('id');
    $(".modal-content-product #idSousMenu").val( sousMenuId );

    axios.get(`http://localhost:8080/product/frontoffice/${sousMenuId}`).then((res) => {
        var html = '';
        var appendProduct = document.getElementById('appendProduct');
        console.log(res.data);
        var i = 1;
        res.data.forEach(element => {
           
            html += `
            
             
            <div class="col-md-2" style="width: 50% !important;
            max-width: 50%;">
              <div class="ibox">
                <div class="ibox-content product-box">
                  <div class="">
                  <img src="http://localhost:8080/image/${element.imagePath}" style="width: 100%;">
                  </div>
                  <div class="product-desc">
                    <span class="product-price">
                      ${element.prix} Dhs
                    </span>
                    <a href="#" class="product-name"> ${element.nomProduct}</a>

                    <div class="small m-t-xs">
                      ${element.ingredient}
                    </div>
                    <div class="m-t text-righ">

                      <div class="qty mt-5">
                       
                        <input style="width:2%" type="number" class="count" id="qt${i}" value="1">
                        <input type="hidden" id="id${i}" value="${element._id}">
                        <input type="hidden" id="point${i}" value="${element.pointFid}">
                      </div><br />
                      

                      <div class="container">
                      
                          <input type="checkbox" id="check${i++}" />
                       
                       
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

        
            `
           
        });
     
        appendProduct.innerHTML = html
    })
})

var btnCash = document.getElementById('cashPurchase');

btnCash.addEventListener('click', () => {
  var urlString = window.location.search;
  var urlParam = new URLSearchParams(urlString);
  var method = urlParam.get('method');
  if(method === 'eatIn'){
    method = 'Servis à table'
  }
  else if(method === 'takeaway'){
    method = 'Emporté';
  }
  var data  ={}
    var quantite = [];
    var point = [];
    var id = [];
    var quantiteSupp  = [];
    var pointSupp  = [];
    var idSupp  = [];
    for(var i = 0;i < 100000;i++){
        if(document.getElementById('check'+i) != null){
            if(document.getElementById('check'+i).checked == true){
                var quantiteValue = document.getElementById('qt'+i).value;
                quantite.push(quantiteValue);
                var pointValue = document.getElementById('point'+i).value;
                point.push(pointValue);
                var idValue = document.getElementById('id'+i).value;
                id.push(idValue);
            }
        }
        
    }
    for(var i = 0;i < 100000;i++){
      if(document.getElementById('checkSupp'+i) != null){
          if(document.getElementById('checkSupp'+i).checked == true){
              var quantiteValue = document.getElementById('qtSupp'+i).value;
              quantiteSupp.push(quantiteValue);
              var pointValue = document.getElementById('pointSupp'+i).value;
              pointSupp.push(pointValue);
              var idValue = document.getElementById('idSupp'+i).value;
              idSupp.push(idValue);
          }
      }
      
  }
    var coupon = document.getElementById('coupon').value;
    var table = document.getElementById('tableDispo').value;
   data = {
    quantite : quantite,
    point : point,
    pointSupp : pointSupp,
    id : id,
    idSupp : idSupp,
    quantiteSupp : quantiteSupp,
    coupon : coupon,
    table : table,
    eat : method
  }
  axios.post('http://localhost:8080/checkout/table', data).then((res) => {
    
     window.open(res.data)
     window.location.href = 'index.html'
  })
})

const stripe = Stripe('pk_test_51HOViXL0RN1zXroUxvplmvYx2AiG3MHWBvVeWDPDXywNqG7oA8yJcyGcHEQ5JRgwBOKtXZJS5IGZxd1G0rW9X74y00GrsGe1Do'); // put your public key stripe 
const elements = stripe.elements();
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
}
const card = elements.create('card', { style });
card.mount('#card-element');

async function payment(){
  var nom = document.getElementById('nom').value;
  var email = document.getElementById('email').value;
  var coupon = document.getElementById('couponStripe').value;
  var form = document.getElementById('payment-form');
  const stripeTokenHandler = token => {
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('id', 'stripeTKN');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    console.log(form)
   
}
await stripe.createToken(card).then(res => {
  if (res.error) errorEl.textContent = res.error.message;
  else {
      console.log(res.token)
      stripeTokenHandler(res.token);
  }
})
  var urlString = window.location.search;
  var urlParam = new URLSearchParams(urlString);
  var method = urlParam.get('method');
  if(method === 'eatIn'){
    method = 'Servis à table'
  }
  else if(method === 'takeaway'){
    method = 'Emporté';
  }
  btnCash.disable = true;
  var data  ={}
    var quantite = [];
    var point = [];
    var id = [];
    var quantiteSupp  = [];
    var pointSupp  = [];
    var idSupp  = [];
    for(var i = 0;i < 100000;i++){
        if(document.getElementById('check'+i) != null){
            if(document.getElementById('check'+i).checked == true){
                var quantiteValue = document.getElementById('qt'+i).value;
                quantite.push(quantiteValue);
                var pointValue = document.getElementById('point'+i).value;
                point.push(pointValue);
                var idValue = document.getElementById('id'+i).value;
                id.push(idValue);
            }
        }
        
    }
    for(var i = 0;i < 100000;i++){
      if(document.getElementById('checkSupp'+i) != null){
          if(document.getElementById('checkSupp'+i).checked == true){
              var quantiteValue = document.getElementById('qtSupp'+i).value;
              quantiteSupp.push(quantiteValue);
              var pointValue = document.getElementById('pointSupp'+i).value;
              pointSupp.push(pointValue);
              var idValue = document.getElementById('idSupp'+i).value;
              idSupp.push(idValue);
          }
      }
      
  }
  var stripeTkn = document.getElementById('stripeTKN').value;
    var table = document.getElementById('tableDispo').value;
   data = {
    quantite : quantite,
    point : point,
    pointSupp : pointSupp,
    id : id,
    idSupp : idSupp,
    quantiteSupp : quantiteSupp,
    coupon : coupon,
    table : table,
    eat : method,
    name : nom,
    email : email,
    stripeToken:stripeTkn,
  }
  axios.post('http://localhost:8080/checkout/cc', data).then((res) => {
    
     window.open(res.data)
     window.location.href = 'index.html'
  })
}