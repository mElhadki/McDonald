//laod coupon data 

function loadData(){
    var tbody = document.getElementById('tbody')
    var html = '';
    axios.get('http://localhost:8080/coupon').then((res) => {
        res.data.forEach(element => {
            html += `
            <tr>
                <td>${element._id}</td>
                <td>${element.code}</td>
                <td>${element.percent} %</td>
               `
               if(element.valid === "0"){
                   html += `<td>Deja utilisé</td>`
               }
               else{
                html += `<td>Jamais utilisé</td>`
            }
               html += `
                <td style="width:200px">
                <a class="editMenu" href="#editProductModal" data-id="${element._id}" data-toggle="modal"><button type="button" class="btn btn-primary">modifier</button></a>
                <a class="deleteMenu" href="#deleteProductModal" data-iddelete="${element._id}" data-toggle="modal">  <button type="button" class="btn btn-danger">supprimer</button></a>
                </td>
            </tr>
            `
        });
        tbody.innerHTML = html;
    })
}
window.addEventListener('load', loadData())

//add coupon data 
var btnAdd = document.getElementById('pushdata');
btnAdd.addEventListener('click', () => {
    var code = document.getElementById('code').value;
    var percent = document.getElementById('percent').value;

    var data = {
        code : code,
        percent: percent
    }
    axios.post('http://localhost:8080/coupon/add', data).then((res) => {
        document.getElementById('hideModel').click();
        console.log(res);
        loadData();
    })
})

//update coupon 
var btnUpdate = document.getElementById('updateIt');

btnUpdate.addEventListener('click', () => {
    var id = document.getElementById('idCouponUpdate').value;
    var code = document.getElementById('codeUpdate').value;
    var percent = document.getElementById('percentUpdate').value;

    var data = {
        code : code,
        percent: percent
    }
    axios.put(`http://localhost:8080/coupon/update/${id}`, data).then((res) => {
        document.getElementById('hideModelEdit').click();
        console.log(res);
        loadData();
    })
})
//end update coupon

//delete coupon

var btnDelete = document.getElementById('deleteId');
btnDelete.addEventListener('click', () => {
    var id = document.getElementById('idCouponDelete').value;
    axios.delete(`http://localhost:8080/coupon/delete/${id}`).then((res) => {
        document.getElementById('hideDelete').click();
        console.log(res);
        loadData();
    })
})
//end delete coupon 