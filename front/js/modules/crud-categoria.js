
var categorias = [];

var requestGet = {
    method: 'GET',
    redirect: 'follow'
};

let jsonData = '';
let getUrlCategoria = 'http://localhost:8181/categorias';


if (window.location.href == "http://localhost:3000/page-categorys.html") {

}


function changeCategory(id, description) {
    let categoriaId = Number(id);
    var data = JSON.stringify({
        "categoriaId": categoriaId,
        "descricao": description
    });
    console.log(data);

    let token = localStorage.getItem('TOKEN-SESSION');
    const url = `http://localhost:8181/categorias/editar`;

    let request = new XMLHttpRequest();
    request.open("PUT", url, false);
    request.setRequestHeader("Authorization", "Bearer "+token);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(data);
    window.location.reload(true); 

}
/* 
if (localStorage.getItem('TOKEN-SESSION')){
   signIn();
   if (window.location.href == "http://localhost:3000/pagina-minha-conta.html" || window.location.href == "http://localhost:3000/pagina-minha-conta-config.html" || window.location.href == "http://localhost:3000/index.html" ){
    userData();
   }
   
}
 */
function cadastrarCategoria() {

    event.preventDefault();
    let urlServer = "http://localhost:8181/categorias/categoriaCadastro";
    let descricao = document.getElementById("category").value;
    let token = localStorage.getItem('TOKEN-SESSION');

    let bodyServer = JSON.stringify({
        "descricao": descricao
    });


    let request = new XMLHttpRequest();
    request.open("POST", urlServer, true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.setRequestHeader("Content-type", "application/json");
    request.send(bodyServer);

    request.onload = function () {

        alert("Categoria Cadastrada!");
    }
}


function listarCategorias() {
    var xhr = new XMLHttpRequest();

    xhr.overrideMimeType("application/json");
    xhr.open("GET", "http://localhost:8181/categorias", true);
    xhr.onload = function () {
        var jsonResponse = JSON.parse(xhr.responseText);
        console.log(jsonResponse);
        let pai = document.querySelector(".tableCategoria");
        let tr = document.querySelector(".rowItem");

        if(document.querySelector('.category-list')){
            jsonResponse.forEach((element, index) => {
                let clone = tr.cloneNode(true);
                clone.style.display = "table-row";
                let rowNumber = clone.querySelector('.rowNumber');
                let categoriaId = clone.querySelector('.categoriaId');
                let descricao = clone.querySelector('.descricao');
                rowNumber.innerHTML = index;
                categoriaId.innerHTML = element.categoriaId;
                descricao.innerHTML = element.descricao;
                clone.appendChild(delButton());
                clone.appendChild(changeButton());
                pai.appendChild(clone);
            });
        }

        if(document.querySelector('.product-list')){
            let categorySelect = document.querySelector('#category-select');
            
            jsonResponse.forEach((element, index) => {
                let option = document.createElement('option');
                option.value ="id: " + element.categoriaId + " " + element.descricao;
                option.innerHTML ="id: " + element.categoriaId + " " + element.descricao;
                categorySelect.appendChild(option);
            });
        }
    };

    xhr.send(null);

    console.log(jsonData);
}

listarCategorias();

function deleteCategory(id){
    let token = localStorage.getItem('TOKEN-SESSION');
    const params = new URLSearchParams({ categoriaId: id});
    const query = params.toString(); // Output: foo=1&bar=2
    const url = `http://localhost:8181/categorias/deletar?${query}`;


    console.log("id:"+clienteId);
    console.log(token);
    let request = new XMLHttpRequest();
    request.open("DELETE", url, false);
    request.setRequestHeader("Authorization", "Bearer "+token);
    request.send();
    console.log(request.responseText);
    
}


const delButton = () => {
    const del = document.createElement('a');
    del.innerText = 'excluir';
    del.addEventListener('click', delLi);

    return del;
}

const delLi = (event) => {
    const del = event.target;
    const line = del.parentElement;
    deleteCategory(del.parentElement.querySelector('.categoriaId').innerHTML)
    console.log(del.parentElement.querySelector('.categoriaId').innerHTML);
    line.remove();
    return del;
}

const changeButton = () => {
    const change = document.createElement('button');
    change.innerText = 'Editar';
    change.addEventListener('click', changeLi);

    return change;
}

const changeLi = (event) => {
    const change = event.target;
    let inputValue = change.parentElement.querySelector('.change-description').value;
    let id = change.parentElement.querySelector('.categoriaId').innerHTML;
    console.log(inputValue);
    console.log(id);
    changeCategory(id,inputValue);
    return change;
}