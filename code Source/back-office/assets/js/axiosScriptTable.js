//load data tables 
function loadData(){
    
    axios.get('http://localhost:8080/table/').then((res) => {
        var html = '';
        var tbody = document.getElementById('tbody');
        res.data.forEach(element => {
            html += `
            <tr>
            <td>${element._id}</td>
            <td>${element.numeroTable}</td>`
            if(element.reserve === "0"){
                html += '<td>Vide</td>'
            }
            else{
                html += '<td>Plein</td>'
            }
            html += `
            <td style="width:200px">
            <a class="editMenu" href="#editProductModal" data-id="${element._id}" data-toggle="modal"><button type="button" class="btn btn-primary">modifier</button></a>
           <a class="deleteMenu" href="#deleteProductModal" data-iddelete="${element._id}" data-toggle="modal">  <button type="button" class="btn btn-danger">supprimer</button></a>
            </td>
            </tr>
            `
            ;
        });
        tbody.innerHTML = html;
    })
}

window.addEventListener('load', loadData());

//end load data table

//add data table 

var btnAdd = document.getElementById('addTable');
btnAdd.addEventListener('click', ()=>{
    axios.post('http://localhost:8080/table/add').then((res) => {
       loadData()
    })
})

//end add data table 

//update data table 
var btnUpdate =  document.getElementById('updateIt');
btnUpdate.addEventListener('click', () => {
    var id = document.getElementById('idTableUpdate').value;
    var valid = document.getElementById('validUpdate').value;
    var data = {
        reserve : valid
    }
    axios.put(`http://localhost:8080/table/update/${id}`, data).then((res) => {
        document.getElementById('hideModelEdit').click();
        console.log(res);
        loadData();
    })
})

//end update data table 

// delete data table 
var btnDelete = document.getElementById('deleteId');
btnDelete.addEventListener('click', () => {
    var id  = document.getElementById('idTableDelete').value;
    axios.delete(`http://localhost:8080/table/delete/${id}`).then((res) => {
        document.getElementById('hideDelete').click();
        console.log(res);
        loadData();
    }) 
})