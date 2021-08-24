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
    let produtoP = Number(preco);
    let produtoQ = Number(quantidade);
    var data = JSON.stringify({
        "descricaoProduto": nome,
        "preco": produtoP,
        "produtoId": produtoId,
        "quantidadeEstoque": produtoQ
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
    xhr.open("GET", "http://localhost:8181/produtos", true);
    xhr.onload = function(){
        var jsonResponse = JSON.parse(xhr.responseText);
        console.log(jsonResponse);
        let pai = document.querySelector(".tableProduto");
        let tr = document.querySelector(".rowItemProduto");
        jsonResponse.forEach((element, index) =>{
            let clone = tr.cloneNode(true);
            clone.style.display = "table-row";
            let position = clone.querySelector(".rowNumberProduto");
            let idCategoria = clone.querySelector(".categoriaId");
            let categoriaNome =clone.querySelector(".categoriaNome");
            let idProduto = clone.querySelector(".produtoId");
            let nomeProduto = clone.querySelector(".produtoNome");
            let quantProduto = clone.querySelector(".produtoQuantitade");
            let precoProduto = clone.querySelector(".precoProduto");
            position.innerHTML = index;
            idCategoria.innerHTML = element.categoriaId;
            categoriaNome.innerHTML = element.descricao;
            idProduto.innerHTML = element.produtoId;
            nomeProduto.innerHTML = element.descricaoProduto;
            quantProduto.innerHTML = element.quantidadeEstoque;
            precoProduto.innerHTML = element.preco;
            clone.appendChild(changeButtonProduto());
            //clone.appendChild(delButtonProduto);
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
    let inputValueNome = change.parentElement.querySelector('.change-description-produto').value;
    let inputValuePreco = change.parentElement.querySelector('.change-quantidade-produto').value;
    let inputValueQuantidade = change.parentElement.querySelector('.change-preco-produto').value;
    let id = change.parentElement.querySelector('.produtoId').innerHTML;
    let nome = document.querySelector(".produtoNome");
    let preco = document.querySelector(".precoProduto") ;
    let quantidade =document.querySelector(".produtoQuantitade") ;
    console.log(inputValueNome);
    console.log(inputValuePreco);
    console.log(inputValueQuantidade);
    console.log(id);
    mudarProduto(id, inputValueNome,inputValuePreco,inputValueQuantidade);
    return change;
}       
        

        