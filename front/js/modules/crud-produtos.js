//CREATE - POST
function createProduct(){
    event.preventDefault();
    let urlServer = "http://localhost:8181/produtos/produtoCadastro";
    //Falta pegar os dados do BD
    let idCategoriaServer = document.getElementById("id-categoria-produto").value;
    let nomeCategoriaServer =  document.getElementById("").value;
    let nomeProdutoServer = document.getElementById("nome-produto").value;
    let precoProdutoServer = document.getElementById("preco-produto").value;
    let quantidadeProdutoServer = document.getElementById("quantidade-produto").value;

    let bodyServer = {
      "categorias": [
        {
          "categoriaId": idCategoriaServer,
          "descricao": nomeCategoriaServer
        }
      ],
      "descricaoProduto": nomeProdutoServer,
      "preco": precoProdutoServer,
      "quantidadeEstoque": quantidadeProdutoServer
    }
    registerPost(urlServer, bodyServer);
    alert("Produto Cadastrado!");  

}
// READ Cateogiras para Produtos
function getcategoriaProduto(){
  console.log("Pegou categoria");
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET", "http://localhost:8181/categorias", true);
  xhr.onload = function(){
  var jsonResponse = Json.parse(xhr.responseText);
  console.log(jsonResponse);
  let pai = document.querySelector("id-categoria-produto");
  let tr = document.querySelector(".categoriaItem");
  
  jsonResponse.forEach(element => {
    let clone = tr.cloneNode(true);
    let categoriaId = clone.querySelector('.id-categoria-produto');
    let descricao = clone.querySelector('.nome-categoria-produto');
    categoriaId.innerHTML = element.categoriaId;
    descricao.innerHTML = element.descricao;
    pai.appendChild(clone);
    
  });
    xhr.send(null);
    console.log(jsonData);
  }
}
getcategoriaProduto();
