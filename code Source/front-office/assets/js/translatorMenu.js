function translate() {
    var objLang = {
        ar: {
            menuTrans: "القائمة لدينا",
            submenuTrans : "تحت القائمة",
            buttonSupplement : "التحلية",
            productTrans : "الأطباق",
            suppTitleTrans : "التحلية",
            goPayment : "الاداء",
            cashTrans : "النقود",
            askCouponTrans : "هل لديك كود كوبون",

            cashButtonTrans : "النقود", 
            ccButtonTrans : "بطاقة إئتمان", 
            askNumberTableTrans : "حدد رقم لخدمة الطاولة",
            cashPurchase : "شراء", //value 
            cardTrans : "بطاقة إئتمان",
            nameTrans : "الاسم",
            emailTrans : "بريد الالكتروني", 
            askCouponCCTrans : "كوبون",
            hideModelCc : "الغاء", // value
            hideModelCash : "الغاء", //value 
            ccpurchase : "شراء" //value 

        },
        fr: {
            menuTrans: "Notre menu",
            submenuTrans :"Sous menu",
            buttonSupplement : "Supplements",
            productTrans : "Plats",
            suppTitleTrans : "Supplements",
            goPayment : "Paiement",
            cashTrans : "Cash",
            askCouponTrans : "Avez-vous un code promo",
            
            cashButtonTrans : "cash", 
            ccButtonTrans : "Carte credit", 
            askNumberTableTrans : "Sélectionnez le numéro pour le service de table",
            cashPurchase : "Acheter", //value 
            cardTrans : "carte credit",
            nameTrans : "nom",
            emailTrans : "Email", 
            askCouponCCTrans : "Coupon",
            hideModelCc : "annuler", // value
            hideModelCash : "annuler", //value 
            ccpurchase : "Acheter" //value 
        },
        an: {
           
            menuTrans : "Our menu",
            submenuTrans : "Sub menu",
            buttonSupplement : "Supplements",
            productTrans : "Dishes",
            suppTitleTrans : "Supplements",
            goPayment : "Payment",
            cashTrans : "Cash",
            askCouponTrans : "Do You have a Code Promo",

            cashButtonTrans : "cash", 
            ccButtonTrans : "Credit card", 
            askNumberTableTrans : "Select Number for Table service",
            cashPurchase : "purchase", //value 
            cardTrans : "card",
            nameTrans : "name",
            emailTrans : "Email", 
            askCouponCCTrans : "Coupon",
            hideModelCc : "Cancel", // value
            hideModelCash : "Cancel", //value 
            ccpurchase : "Purchase" //value 

        }
    }

    var urlString = window.location.search;
    var urlParam = new URLSearchParams(urlString);
    var language = urlParam.get('lang');

    if (language === "ar") {
        document.getElementById('menuTrans').innerHTML = objLang.ar.menuTrans;
        document.getElementById('submenuTrans').innerHTML = objLang.ar.submenuTrans;
        document.getElementById('goSupp').innerHTML = objLang.ar.buttonSupplement;
        document.getElementById('goSupp1').innerHTML = objLang.ar.buttonSupplement;
        document.getElementById('productTrans').innerHTML = objLang.ar.productTrans;
        document.getElementById('suppTitleTrans').innerHTML = objLang.ar.suppTitleTrans;
        document.getElementById('goPayment').innerHTML = objLang.ar.goPayment;
        document.getElementById('cashTrans').innerHTML = objLang.ar.cashTrans;
        document.getElementById('askCouponTrans').innerHTML = objLang.ar.askCouponTrans;
        document.getElementById('cashButtonTrans').innerHTML = objLang.ar.cashButtonTrans
        document.getElementById('ccButtonTrans').innerHTML = objLang.ar.ccButtonTrans
        document.getElementById('askNumberTableTrans').innerHTML = objLang.ar.askNumberTableTrans
        document.getElementById('cashPurchase').value = objLang.ar.cashPurchase
        document.getElementById('cardTrans').innerHTML = objLang.ar.cardTrans
        document.getElementById('nameTrans').innerHTML = objLang.ar.nameTrans
        document.getElementById('emailTrans').innerHTML = objLang.ar.emailTrans
        document.getElementById('askCouponCCTrans').innerHTML = objLang.ar.askCouponCCTrans
        document.getElementById('hideModelCc').value = objLang.ar.hideModelCc
        document.getElementById('hideModelCash').value = objLang.ar.hideModelCash
        document.getElementById('ccpurchase').value = objLang.ar.ccpurchase
    }
    else if (language === "fr") {
        document.getElementById('menuTrans').innerHTML = objLang.fr.menuTrans;
        document.getElementById('submenuTrans').innerHTML = objLang.fr.submenuTrans;
        document.getElementById('goSupp').innerHTML = objLang.fr.buttonSupplement;
        document.getElementById('goSupp1').innerHTML = objLang.fr.buttonSupplement;
        document.getElementById('productTrans').innerHTML = objLang.fr.productTrans;
        document.getElementById('suppTitleTrans').innerHTML = objLang.fr.suppTitleTrans;
        document.getElementById('goPayment').innerHTML = objLang.fr.goPayment;
        document.getElementById('cashTrans').innerHTML = objLang.fr.cashTrans;
        document.getElementById('askCouponTrans').innerHTML = objLang.fr.askCouponTrans;
        document.getElementById('cashButtonTrans').innerHTML = objLang.fr.cashButtonTrans
        document.getElementById('ccButtonTrans').innerHTML = objLang.fr.ccButtonTrans
        document.getElementById('askNumberTableTrans').innerHTML = objLang.fr.askNumberTableTrans
        document.getElementById('cashPurchase').value = objLang.fr.cashPurchase
        document.getElementById('cardTrans').innerHTML = objLang.fr.cardTrans
        document.getElementById('nameTrans').innerHTML = objLang.fr.nameTrans
        document.getElementById('emailTrans').innerHTML = objLang.fr.emailTrans
        document.getElementById('askCouponCCTrans').innerHTML = objLang.fr.askCouponCCTrans
        document.getElementById('hideModelCc').value = objLang.fr.hideModelCc
        document.getElementById('hideModelCash').value = objLang.fr.hideModelCash
        document.getElementById('ccpurchase').value = objLang.fr.ccpurchase
    }
    else if (language === "an") {
        document.getElementById('menuTrans').innerHTML = objLang.an.menuTrans;
        document.getElementById('submenuTrans').innerHTML = objLang.an.submenuTrans;
        document.getElementById('goSupp').innerHTML = objLang.an.buttonSupplement;
        document.getElementById('goSupp1').innerHTML = objLang.an.buttonSupplement;
        document.getElementById('productTrans').innerHTML = objLang.an.productTrans;
        document.getElementById('suppTitleTrans').innerHTML = objLang.an.suppTitleTrans;
        document.getElementById('goPayment').innerHTML = objLang.an.goPayment;
        document.getElementById('cashTrans').innerHTML = objLang.an.cashTrans;
        document.getElementById('askCouponTrans').innerHTML = objLang.an.askCouponTrans;
        document.getElementById('cashButtonTrans').innerHTML = objLang.an.cashButtonTrans
        document.getElementById('ccButtonTrans').innerHTML = objLang.an.ccButtonTrans
        document.getElementById('askNumberTableTrans').innerHTML = objLang.an.askNumberTableTrans
        document.getElementById('cashPurchase').value = objLang.an.cashPurchase
        document.getElementById('cardTrans').innerHTML = objLang.an.cardTrans
        document.getElementById('nameTrans').innerHTML = objLang.an.nameTrans
        document.getElementById('emailTrans').innerHTML = objLang.an.emailTrans
        document.getElementById('askCouponCCTrans').innerHTML = objLang.an.askCouponCCTrans
        document.getElementById('hideModelCc').value = objLang.an.hideModelCc
        document.getElementById('hideModelCash').value = objLang.an.hideModelCash
        document.getElementById('ccpurchase').value = objLang.an.ccpurchase

    }
    else {
        window.location.href = "index.html";
    }

}

window.addEventListener('load', translate())