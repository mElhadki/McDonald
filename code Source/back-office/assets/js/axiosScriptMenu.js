//load data menu 
function loadDataMenu(){
    axios.get('http://localhost:8080/menu/').then((success) =>{
       var tbody = document.getElementById('tbody');
       var html = '';
       success.data.forEach(element => {
           html += `<tr>
           <td style="width:100px">${element._id}</td>
           <td style="width:100px"><img style="width:100px" src="http://localhost:8080/image/${element.imagePath}"></td>
           <td style="width:100px">${element.nomMenu}</td>
           <td><a class="editMenu" href="#editProductModal" data-id="${element._id}" data-toggle="modal"><button type="button" class="btn btn-primary">modifier</button></a>
           <a class="deleteMenu" href="#deleteProductModal" data-iddelete="${element._id}" data-toggle="modal">  <button type="button" class="btn btn-danger">supprimer</button></a>
           </td>
           <tr>`
       });
      
       tbody.innerHTML = html;
    })
}
window.addEventListener('load', loadDataMenu);
//end load data menu 

//add menu 
var btnPush = document.getElementById("pushdata");
btnPush.addEventListener('click', () => {
  var nomMenu = document.getElementById('nomMenu').value;
var fileToUpload  = document.querySelector('input[type=file]').files[0];       
  let config = {
      headers : {
          'Content-Type' : 'multipart/form-data'
      }
  }

  let fd = new FormData()
  fd.append('name', 'file')
  fd.append('file', fileToUpload)
  fd.append('nomMenu', nomMenu)
  axios.post('http://localhost:8080/menu/add', fd, config)
  .then((response)=>{
    document.getElementById("hideModelAdd").click();
        loadDataMenu()
  })
  document.getElementById('nomMenu').value="";
  document.querySelector('input[type=file]').value="";
})
//end add menu

//update menu 
var btnUpdate = document.getElementById('updateIt');
btnUpdate.addEventListener('click', () => {
    var idModal = document.getElementById('idMenu').value;
    var nomMenu = document.getElementById('nomMenuUpdate').value;
    var fileToUpload  = document.getElementById('imageMenuUpdate').files[0]; 
    let config = {
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    }
  
    let fd = new FormData()
    fd.append('name', 'file')
    fd.append('file', fileToUpload)
    fd.append('nomMenu', nomMenu)
    axios.put(`http://localhost:8080/menu/update/${idModal}`, fd, config)
    .then((response)=>{
        document.getElementById('hideModelEdit').click();
       
        console.log("Image posted successfully: ", response);
        loadDataMenu();
    })
})

// end update menu 

//delete menu 
var btnDelete = document.getElementById('deleteId');

btnDelete.addEventListener('click', () => {
    var idModal = document.getElementById('idMenuDelete').value;

    axios.delete(`http://localhost:8080/menu/delete/${idModal}`)
    .then((response)=>{
        document.getElementById('hideDelete').click();
        console.log("deleted", response);
        loadDataMenu();
    })
})
//end delete menu 
