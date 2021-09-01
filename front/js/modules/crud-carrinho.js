if (localStorage.getItem("CARRINHO") === null){
    var guardaItens = [];
    localStorage.setItem("CARRINHO", JSON.stringify(guardaItens));
}
const addButtonCarrinho = () =>{
    const add = document.createElement('button');
    add.innerText = "Comprar";
    add.addEventListener('click', addProduto);
    return add;
}
const addProduto = (event) =>{
    const add = event.target;
    let currentId = add.parentElement.querySelector(".id-produto").innerHTML;
    let currentName = add.parentElement.querySelector('.title__item').innerHTML;
    let currentPreco =add.parentElement.querySelector('.prices__total').innerHTML;
    console.log(currentId);
    console.log(currentName);
    console.log(currentPreco);
    addCart(currentId, currentName, currentPreco);
    return add;
}
function addCart(id, nome, preco){
    let productId = id;
    let productName = nome;
    let productPrice = preco;
    let dados = JSON.stringify({
        "id" : productId,
        "nome" : productName,
        "preco" :  productPrice
        });
        console.log(dados);
        let guarda = JSON.parse(localStorage.getItem('CARRINHO'));
        guarda.push(dados);
        localStorage.setItem("CARRINHO", JSON.stringify(guarda));
    alert("Produto Adicionado ao Carrinho");         
}
/*
function mostrarItensCart(){
    let guarda = JSON.parse(localStorage.getItem("CARRINHO"));
    console.log(guarda);
    let pai = document.querySelector(".tableProduto");
    let tr = document.querySelector(".rowItemProduto");
    for(let i=0; i<= guarda.length; i++){
        let clone = tr.cloneNode(true);
        clone.style.display = "table-row";
        let idProduto = clone.querySelector(".produtoId");
        let nomeProduto = clone.querySelector(".produtoNome");               
        let quantProduto = clone.querySelector(".produtoQuantitade");
        let precoProduto = clone.querySelector(".precoProduto");
        idProduto.innerHTML = [i].id;
        nomeProduto.innerHTML = [i].nome;
        quantProduto.innerHTML = 1;
        precoProduto.innerHTML = [i].preco;
        console.log(idProduto);
        console.log(nomeProduto);
        console.log(precoProduto);
        //clone.appendChild(delButtonProduto());
        pai.appendChild(clone);
    }
} 
mostrarItensCart();
*/
function continuarComprando(){
    //window.open("http://localhost:3000/index.html","_self");
}
function finaliarCompras(){
    console.log("Envia");
    alert("Compra Finalizada");
}