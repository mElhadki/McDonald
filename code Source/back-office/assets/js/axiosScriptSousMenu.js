//add data sous menu 

function loadSousMenus() {
    axios.get('http://localhost:8080/menu').then((response) => {
        var selectIdMenu = document.getElementById('idMenu');
        var selectIdMenuUdpate = document.getElementById('menuIdUpdate');
        var html = '';
        response.data.forEach(element => {
            html += `<option value="${element._id}">${element.nomMenu} </option>`;
        });
        selectIdMenu.innerHTML = html;
        selectIdMenuUdpate.innerHTML = html;
    })

    axios.get('http://localhost:8080/sousmenu').then((response) => {
        var tbody = document.getElementById('tbody');
        var html = '';
        response.data.forEach(element => {
            html += `
                    <tr>
                    <td style="width:100px">${element._id}</td>
                    <td style="width:100px"><img  style="width:100px" src="http://localhost:8080/image/${element.imagePath}" /></td>
                    <td style="width:100px">${element.nomSousMenu}</td>
                    <td style="width:100px"><a class="editMenu" href="#editProductModal" data-id="${element._id}" data-toggle="modal"><button type="button" class="btn btn-primary">modifier</button></a>
                    <a class="deleteMenu" href="#deleteProductModal" data-iddelete="${element._id}" data-toggle="modal">  <button type="button" class="btn btn-danger">supprimer</button></a></td>
                    <tr>
                    `
        });
        tbody.innerHTML = html;
    })
}
window.addEventListener('load', loadSousMenus());


//load data in select menu 
var btnAdd = document.getElementById('pushdata');
btnAdd.addEventListener('click', () => {

    var nomSousMenu = document.getElementById('nomSousMenu').value;
    var idMenu = document.getElementById('idMenu').value;
    var fileToUpload = document.getElementById('imageSousMenu').files[0];
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    let fd = new FormData()
    fd.append('name', 'file')
    fd.append('file', fileToUpload)
    fd.append('nomSousMenu', nomSousMenu)
    fd.append('idMenu', idMenu)
    axios.post('http://localhost:8080/sousmenu/add', fd, config).then((response) => {
        document.getElementById('hideModel').click();
        console.log(response)
        loadSousMenus();
    })
});

//end add data sous menu 


//update data sous menu 
var btnUpdate = document.getElementById('updateIt');
btnUpdate.addEventListener('click', ()=> {
    let id = document.getElementById('idMenuUpdate').value;
    var nomSousMenu = document.getElementById('nomSousMenuUpdate').value;
    var idMenu = document.getElementById('menuIdUpdate').value;
    var fileToUpload = document.getElementById('imageSousMenuUpdate').files[0];
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    let fd = new FormData()
    fd.append('name', 'file')
    fd.append('file', fileToUpload)
    fd.append('nomSousMenu', nomSousMenu)
    fd.append('idMenu', idMenu)
    axios.put(`http://localhost:8080/sousmenu/update/${id}`, fd, config).then((res) => {
        console.log(res)
        document.getElementById('hideModelEdit').click()
        loadSousMenus()
    })
})
//end update data sous menu 

//delete sous menu 

var btnDelete = document.getElementById('deleteId');

btnDelete.addEventListener('click', () => {
    let id = document.getElementById('idMenuDelete').value;

    axios.delete(`http://localhost:8080/sousmenu/delete/${id}`).then((res) => {
        document.getElementById('hideDelete').click()
        loadSousMenus()
    })
})