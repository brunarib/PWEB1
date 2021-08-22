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
    console.log(bodyServer)


    let request = new XMLHttpRequest();
    request.open("POST", urlServer, true);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.setRequestHeader("Content-type", "application/json");
    request.send(bodyServer);

    request.onload = function () {

        alert("Produto Cadastrado!");
    }
}