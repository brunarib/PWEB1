function cadastrarProduto() {
    event.preventDefault();
    let urlServer = "http://localhost:8181/produtos/produtoCadastro";
    let optionCategory = document.querySelectorAll('#category-select option');
    let selectedValue;
    let categoryDescription;
    let productDescription = document.getElementById('produto-description').value;
    let productValue = document.getElementById('valor-produto').value;
    let productQtd = document.getElementById('quantidade-produto').value;
    
    optionCategory.forEach(element => {
        if(element.selected){
            console.log(element.value);
            selectedValue = element.value;
            element.innerHTML = categoryDescription;
            console.log(categoryDescription)
        }
    });


    let token = localStorage.getItem('TOKEN-SESSION');
    let bodyServer = JSON.stringify({
        "categorias": [
            {
              "categoriaId": selectedValue,
              "descricao": categoryDescription
            }
          ],
          "descricaoProduto": productDescription,
          "preco": productValue,
          "quantidadeEstoque": productQtd
    });
    console.log(bodyServer);


    let request = new XMLHttpRequest();
    request.open("POST", urlServer, true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.setRequestHeader("Content-type", "application/json");
    request.send(bodyServer);

    request.onload = function () {

        alert("Produto Cadastrado!");
    }
}
function mudarProduto(id, nome, preco, quantidade){
    let produtoId = Number(id);
    var data = JSON.stringify({
        "descricaoProduto": nome,
        "preco": preco,
        "produtoId": id,
        "quantidadeEstoque": quantidade

    })
    console.log(data);

    let token = localStorage.getItem('TOKEN-SESSION');
    const url = `http://localhost:8181/produtos/editar`;

    let request = new XMLHttpRequest();
    request.open("PUT", url, false);
    request.setRequestHeader("Authorization", "Bearer "+token);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(data);
    window.location.reload(true);
}

function listarPrdutos(){
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", "http://localhost:8181/produtos");
    xhr.onload = function(){
        var jsonResponse = JSON.parse(xhr.responseText);
        console.log(jsonResponse);
        let pai = document.querySelector(".item-content");
        let tr = document.querySelector(".content-description");
        jsonResponse.forEach((element, index) =>{
            let clone = tr.cloneNode(true);
            let position = clone.querySelector("position");
            let idCategoria = clone.querySelector("id-categoria");
            let categoriaNome =clone.querySelector("categoria-des");
            let idProduto = clone.querySelector("id-produto");
            let nomeProduto = clone.querySelector("nome-pro");
            let quantProduto = clone.querySelector("valor-pro");
            let precoProduto = clone.querySelector("quat-pro");
            position.innerHTML = index;
            idCategoria.innerHTML = element.categoria.categoriaId;
            categoriaNome.innerHTML = element.categoria.descricao;
            idProduto.innerHTML = element.produtoId;
            nomeProduto.innerHTML = element.descricaoProduto;
            quantProduto.innerHTML = element.quantidadeEstoque;
            precoProduto.innerHTML = element.preco;
            clone.appendChild(changeButtonProduto());
            clone.appendChild(delButtonProduto);
            pai.appendChild(clone);
            
        });
    }
    xhr.send(null);
    console.log(jsonData);    
        
}
listarPrdutos();

function deletarProduto(id){
    let token = localStorage.getItem("TOKEN-SESSION");
    const params = new URLSearchParams({produtoId : id});
    const query = params.toString(); 
    const url = `http://localhost:8181/produtos/deletar?${query}`;

    console.log("id:" + produtoId);
    console.log(token);
    let request = new XMLHttpRequest();
    request.open("DELETE", url, false);
    request.setRequestHeader("Authorization", "Bearer "+token);
    request.send();
    console.log(request.responseText);
}


const delButtonProduto = () => {
    const del = document.createElement('a');
    del.innerText = 'excluir';
    del.addEventListener('click', delLiProduto);

    return del;
}

const delLiProduto = (event) => {
    const del = event.target;
    const line = del.parentElement;
    deletarProduto(del.parentElement.querySelector('.produtoId').innerHTML)
    console.log(del.parentElement.querySelector('.produtoId').innerHTML);
    line.remove();
    return del;
}

const changeButtonProduto = () => {
    const change = document.createElement('button');
    change.innerText = 'Editar';
    change.addEventListener('click', changeLiProduto);

    return change;
}

const changeLiProduto = (event) => {
    const change = event.target;
    let inputValueNome = change.parentElement.querySelector('.change-description-nome').value;
    let inputValuePreco = change.parentElement.querySelector('.change-description-valor').value;
    let inputValueQuantidade = change.parentElement.querySelector('.change-description-quantidade').value;
    let id = change.parentElement.querySelector('.produtoId').innerHTML;
    console.log(inputValueNome);
    console.log(inputValuePreco);
    console.log(inputValueQuantidade);
    console.log(id);
    changeCategory(id,inputValue,inputValuePreco,inputValueQuantidade);
    return change;
}       
        

        