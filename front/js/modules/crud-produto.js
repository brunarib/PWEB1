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
function listarPrdutos(){
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", "http://localhost:8181/produtos");
    xhr.onload = function(){
        var jsonResponse = JSON.parse(xhr.responseText);
        console.log(jsonResponse);
        let pai = document.querySelector(".item__content");
        let tr = document.querySelector(".content__description");
        jsonResponse.forEach((element, index) =>{
            let clone = tr.cloneNode(true);
            let position = clone.getElementById("position");
            let idCategoria = clone.getElementById("id-categoria");
            let categoriaNome =clone.getElementById("categoria-des");
            let idProduto = clone.getElementById("id-produto");
            let nomeProduto = clone.getElementById("nome-pro");
            let quantProduto = clone.getElementById("valor-pro");
            let precoProduto = clone.getElementById("quat-pro");
            position.innerHTML = index;
            idCategoria.innerHTML = element.categoria.categoriaId;
            categoriaNome.innerHTML = element.categoria.descricao;
            idProduto.innerHTML = element.produtoId;
            nomeProduto.innerHTML = element.descricaoProduto;
            quantProduto.innerHTML = element.quantidadeEstoque;
            precoProduto.innerHTML = element.preco;
            clone.appendChild(changeButton());
            clone.appendChild(delButton);
            pai.appendChild(clone);
            
        });
    }
    xhr.send(null);
    console.log(jsonData);    
        
}
listarPrdutos();



        
        

        