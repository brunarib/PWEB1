if (localStorage.getItem("CARRINHO") === null){
    var guardaItens = [];
    localStorage.setItem("CARRINHO", JSON.stringify(guardaItens));
}
function addItemCarrinho(){
    let productName = document.querySelector('.title__item').innerHTML;
    let productPrice = document.querySelector('.prices__total').innerHTML;    
    let dados = JSON.stringify({
        nome : productName,
        preco : productPrice
    });
    console.log(dados);
    let guarda = JSON.parse(localStorage.getItem('CARRINHO'));
    guarda.push(dados);
    localStorage.setItem("CARRINHO", JSON.stringify(guarda));
}
function mostraIteCarrinho(){
    console.log("Mostra");
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