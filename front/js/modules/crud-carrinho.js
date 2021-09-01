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
        id : productId,
        nome : productName,
        preco :  productPrice
        });
        console.log(dados);
        let guarda = JSON.parse(localStorage.getItem('CARRINHO'));
        guarda.push(dados);
        localStorage.setItem("CARRINHO", JSON.stringify(guarda));
    alert("Produto Adicionado ao Carrinho");         
}

function mostraItemCarrinho(){
    
}
/*
function mostraIteCarrinho(){
    
}



function aumenta(){
    let quantidade = document.querySelector(".quantidade-carrinho").textContent;
    let valor = document.querySelector(".preco-carrinho").textContent;
    quantidade = Number(quantidade) + 1; 
    valor = Number(quantidade) * Number(valor);
}
function diminui(){
    let quantidade = document.querySelector(".quantidade-carrinho").textContent;
    let valor = document.querySelector(".preco-carrinho").textContent;
    if (Number(quantidade) >= 1){
        quantidade = Number(quantidade) - 1; 
        String(valor).innerHTML = Number(quantidade) * Number(valor);
        quantidade.innerHTML = String(quantidade);
    }
    else{
        alert("Operação Invalida");
    }  
}

function adicionaCarinho(nome, preco){
    
    
}



*/