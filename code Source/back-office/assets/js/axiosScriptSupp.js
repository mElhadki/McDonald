//load data supp
function loadData(){
    var html = '';
    var tbody = document.getElementById('tbody');
    axios.get('http://localhost:8080/supp/').then((res)=>{

        res.data.forEach(element => {
            html += `
            <tr>
            <td>${element._id}</td>
            <td>${element.nomSupp}</td>
            <td><img style="width:100px" src="http://localhost:8080/image/${element.imagePath}" /></td>
            <td>${element.prix} Dhs</td>
            <td>${element.pointFid} points</td>
            <td style="width:200px">
            <a class="editMenu" href="#editProductModal" data-id="${element._id}" data-toggle="modal"><button type="button" class="btn btn-primary">modifier</button></a>
            <a class="deleteMenu" href="#deleteProductModal" data-iddelete="${element._id}" data-toggle="modal">  <button type="button" class="btn btn-danger">supprimer</button></a>
            </td>
            </tr>
            `;
        });
        tbody.innerHTML = html;
    })
}

window.addEventListener('load', loadData());

//end load data supp

//add data supp
var btnAdd = document.getElementById('pushdata');
btnAdd.addEventListener('click', () => {
    var fileToUpload = document.getElementById('imagePath').files[0];
    var nomProduct = document.getElementById("nomSupp").value;
    var prix = document.getElementById('prixSupp').value;

    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    let fd = new FormData()
    fd.append('name', 'file')
    fd.append('file', fileToUpload)
    fd.append('nomSupp', nomProduct)
    fd.append('prix', prix)
    axios.post('http://localhost:8080/supp/add', fd, config).then((res)=>{
        document.getElementById('hideModel').click();
        console.log(res);
        loadData();
    })
    document.getElementById('imagePath').value="";
    document.getElementById("nomSupp").value="";
    document.getElementById("prixSupp").value="";

})
//end add data supp

//update supp 
var btnUpdate = document.getElementById('updateIt');
btnUpdate.addEventListener('click', () =>  {
    var id = document.getElementById("idProductUpdate").value;
    var fileToUpload = document.getElementById('imagePathUpdate').files[0];
    var nomProduct = document.getElementById("nomSuppUpdate").value;
    var prix = document.getElementById('prixSuppUpdate').value;

    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    let fd = new FormData()
    fd.append('name', 'file')
    fd.append('file', fileToUpload)
    fd.append('nomSupp', nomProduct)
    fd.append('prix', prix)
    axios.put(`http://localhost:8080/supp/update/${id}`, fd, config).then((res)=>{
        document.getElementById('hideModelEdit').click();
        console.log(res);
        loadData();
    })
    document.getElementById('imagePath').value="";
    document.getElementById("nomSupp").value="";
    document.getElementById("prixSupp").value="";
})
//end update supp

//delete data supp

var btnDelete = document.getElementById('deleteId');
btnDelete.addEventListener('click', () => {
    var id = document.getElementById('idProductDelete').value;
    axios.delete(`http://localhost:8080/supp/delete/${id}`).then((res) => {
        document.getElementById('hideDelete').click();
        console.log(res);
        loadData();
    })
    
})