function translate() {
    var objLang = {
        ar: {
            hrefEat: "menu.html?method=eatIn&lang=ar",
            hrefTake: "menu.html?method=takeaway&lang=ar",
            sloganTrans: "قم بإرضاء هجوم الوجبة الخفيفة.",
            methodTrans: "مكان تناول الطعام وطريقة الدفع",
            eatTrans: "تأكل",
            inTrans: "هنا",
            takeTrans: "خده",
            awayTrans: "معك",
        },
        fr: {
            hrefEat: "menu.html?method=eatIn&lang=fr",
            hrefTake: "menu.html?method=takeaway&lang=fr",
            sloganTrans: "Satisfaire votre attaque snack.",
            methodTrans: "LIEU DE MANGER ET MODE DE PAIEMENT",
            eatTrans: "manger",
            inTrans: "à table",
            takeTrans: "emporté",
            awayTrans: "",
        },
        an: {
            hrefEat: "menu.html?method=eatIn&lang=an",
            hrefTake: "menu.html?method=takeaway&lang=an",
            sloganTrans: "Satisfy your snack attack.",
            methodTrans: "DINING LOCATION AND PAYEMENT METHOD",
            eatTrans: "eat",
            inTrans: "in",
            takeTrans: "take",
            awayTrans: "away"

        }
    }

    var urlString = window.location.search;
    var urlParam = new URLSearchParams(urlString);
    var language = urlParam.get('lang');

    if (language === "ar") {
        document.getElementById('eatInHref').setAttribute('href', objLang.ar.hrefEat)
        document.getElementById('takeAwayHref').setAttribute('href', objLang.ar.hrefTake)
        document.getElementById('sloganTrans').innerHTML = objLang.ar.sloganTrans;
        document.getElementById('methodTrans').innerHTML = objLang.ar.methodTrans;
        document.getElementById('eatTrans').innerHTML = objLang.ar.eatTrans;
        document.getElementById('inTrans').innerHTML = objLang.ar.inTrans;
        document.getElementById('takeTrans').innerHTML = objLang.ar.takeTrans;
        document.getElementById('awayTrans').innerHTML = objLang.ar.awayTrans;
        document.getElementById('MennuTrans').innerHTML = objLang.ar.MennuTrans;
    }
    else if (language === "fr") {
        document.getElementById('eatInHref').setAttribute('href', objLang.fr.hrefEat)
        document.getElementById('takeAwayHref').setAttribute('href', objLang.fr.hrefTake)
        document.getElementById('sloganTrans').innerHTML = objLang.fr.sloganTrans;
        document.getElementById('methodTrans').innerHTML = objLang.fr.methodTrans;
        document.getElementById('eatTrans').innerHTML = objLang.fr.eatTrans;
        document.getElementById('inTrans').innerHTML = objLang.fr.inTrans;
        document.getElementById('takeTrans').innerHTML = objLang.fr.takeTrans;
        document.getElementById('awayTrans').innerHTML = objLang.fr.awayTrans;
        document.getElementById('MennuTrans').innerHTML = objLang.fr.MennuTrans;
    }
    else if (language === "an") {
        document.getElementById('eatInHref').setAttribute('href', objLang.an.hrefEat)
        document.getElementById('takeAwayHref').setAttribute('href', objLang.an.hrefTake)
        document.getElementById('sloganTrans').innerHTML = objLang.an.sloganTrans;
        document.getElementById('methodTrans').innerHTML = objLang.an.methodTrans;
        document.getElementById('eatTrans').innerHTML = objLang.an.eatTrans;
        document.getElementById('inTrans').innerHTML = objLang.an.inTrans;
        document.getElementById('takeTrans').innerHTML = objLang.an.takeTrans;
        document.getElementById('awayTrans').innerHTML = objLang.an.awayTrans;
        document.getElementById('MennuTrans').innerHTML = objLang.an.MennuTrans;
    }
    else {
        window.location.href = "index.html";
    }

}

window.addEventListener('load', translate())