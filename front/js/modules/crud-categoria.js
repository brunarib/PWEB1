var categoria = {
    "id": null,
    "descricao": null
};


var categorias = [];

var requestGet = {
    method: 'GET',
    redirect: 'follow'
};

let jsonData = '';
let getUrlCategoria = 'http://localhost:8181/categorias';


if (window.location.href == "http://localhost:3000/page-categorys.html") {

}


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

        jsonResponse.forEach((element, index) => {
            let clone = tr.cloneNode(true);
            let rowNumber = clone.querySelector('.rowNumber');
            let categoriaId = clone.querySelector('.categoriaId');
            let descricao = clone.querySelector('.descricao');
            rowNumber.innerHTML = index;
            categoriaId.innerHTML = element.categoriaId;
            descricao.innerHTML = element.descricao;
            clone.appendChild(delButton());
            pai.appendChild(clone);
        });
            
       

    };

    xhr.send(null);

    console.log(jsonData);
}

listarCategorias();





const delButton = () => {

    const del = document.createElement('button');
    del.classList.add('button-remove');
    del.innerText = 'X';
    del.addEventListener('click', delLi);

    return del;
}

const delLi = (event) => {
    const del = event.target;
    const line = del.parentElement;
    line.remove();
    return del;
}