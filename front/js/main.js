"use strict";var token="",formsView=document.querySelector(".forms");document.querySelector(".forms");var logoutButton=document.getElementById("logout");localStorage.getItem("TOKEN-SESSION")&&(signIn(),"http://localhost:3000/pagina-minha-conta.html"==window.location.href&&userData());var nomeUser,logout=function(){token=""};function dataGet(e,t){var o=new XMLHttpRequest;return o.open("GET",e,!1),o.setRequestHeader("Authorization","Bearer "+t),o.send(),o.responseText}function userData(){var e=dataGet("http://localhost:8181/clientes/getCliente",localStorage.getItem("TOKEN-SESSION")),t=JSON.parse(e),o=document.getElementById("login-client"),n=document.getElementById("nome-client"),r=document.getElementById("email-client"),e=document.getElementById("endereco-client");o.innerHTML="Login: "+t.usuario.login,n.innerHTML="Nome: "+t.usuario.nome,r.innerHTML="Email: "+t.usuario.email,e.innerHTML="Endereço: "+t.endereco}function registerPost(e,t){var o=new XMLHttpRequest;return o.open("POST",e,!0),o.setRequestHeader("Content-type","application/json"),o.send(JSON.stringify(t)),o.onload=function(){token=this.responseText,localStorage.setItem("TOKEN-SESSION",token)},o.responseText}function registerUser(){event.preventDefault();var e=document.getElementById("name-register").value,t=document.getElementById("login-register").value,o=document.getElementById("email-register").value,n=document.getElementById("password-register").value;registerPost("http://localhost:8181/clientes/usuarioCadastro",{endereco:document.getElementById("adress-register").value,usuario:{adm:"false",email:o,login:t,nome:e,senha:n}})}function loginUser(){event.preventDefault();var e=document.getElementById("login-user").value,t=document.getElementById("password-login").value;localStorage.setItem("LOGIN-SESSION",e),localStorage.setItem("SENHA-SESSION",t),registerPost("http://localhost:8181/login",{login:e,senha:t}),""!==token&&document.querySelector(".forms")&&formsView.classList.add("form-disabled")}function signIn(){document.querySelector(".forms")&&formsView.classList.add("form-disabled"),logoutButton.classList.add("is-active");var e=localStorage.getItem("LOGIN-SESSION");document.getElementById("user").innerHTML=e}function singOut(){localStorage.clear(),logoutButton.classList.remove("is-active"),document.getElementById("user").innerHTML="",document.querySelector(".forms")&&formsView.classList.add("form-enable"),window.open("http://localhost:3000/index.html","_self")}document.querySelector("#nomeMyInfo")&&(nomeUser=document.querySelector("#nomeMyInfo"),console.log(nomeUser.innerHTML),nomeUser.innerHTML="meu nome");