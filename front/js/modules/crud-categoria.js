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
        //console.log(jsonResponse);
        let pai = document.querySelector(".tableCategoria");
        for(var i=0; i <=jsonResponse.length; i++){
            

            let tr = document.querySelector(".rowItem");
            console.log(tr);
            let clone = tr.cloneNode(true);
           //cd console.log(clone);
            let tdNumber = clone.querySelector(".rowNumber");
          /*   let tdId = clone.querySelector(".categoriaId");
            let tdDescription = clone.querySelector(".descricao"); */
           /*  tdNumber.innerHTML = jsonResponse[i].descricao; */
            clone.appendChild(pai);

        }
       

    };

    xhr.send(null);

    console.log(jsonData);
}

listarCategorias();





