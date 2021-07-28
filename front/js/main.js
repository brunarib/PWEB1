//"use strict";function imc(){console.log("teste")}function hello(){console.log("holass")}

function registerPost(url, body){
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(body));
    
/*
headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
    headers.append('Origin','http://localhost:3000');





*/



    request.onload = function(){
        console.log(this.responseText);
    }
    return request.responseText;
}
function registerUser(){
    event.preventDefault();
    let url = "http://localhost:8181/clientes/usuarioCadastro";
    let nome =document.getElementById("name").value;
    let login =  document.getElementById("login-register").value;
    let email =document.getElementById("email-register").value ;
    let senha = document.getElementById("password-register").value;
    let endereco = document.getElementById("adress-register").value;
    console.log(nome, login, email, senha, endereco);

    body = {
    "endereco": endereco,
        "usuario": {
        "adm": "false",
        "email": email,
        "login": login,
        "nome": nome,
        "senha": senha,
        }    
    }  
    registerPost(url, body);  
}