"use strict";var token="",formsView=document.querySelector(".forms");document.querySelector(".forms");var logoutButton=document.getElementById("logout");localStorage.getItem("TOKEN-SESSION")&&logIn();var nomeUser,logout=function(){token=""};function registerPost(e,t){var o=new XMLHttpRequest;return o.open("POST",e,!0),o.setRequestHeader("Content-type","application/json"),o.send(JSON.stringify(t)),o.onload=function(){token=this.responseText,localStorage.setItem("TOKEN-SESSION",token)},o.responseText}function registerUser(){event.preventDefault();var e=document.getElementById("name").value,t=document.getElementById("login-register").value,o=document.getElementById("email-register").value,n=document.getElementById("password-register").value;registerPost("http://localhost:8181/clientes/usuarioCadastro",{endereco:document.getElementById("adress-register").value,usuario:{adm:"false",email:o,login:t,nome:e,senha:n}})}function loginUser(){event.preventDefault();var e=document.getElementById("login-user").value,t=document.getElementById("password-login").value;localStorage.setItem("LOGIN-SESSION",e),localStorage.setItem("SENHA-SESSION",t),registerPost("http://localhost:8181/login",{login:e,senha:t}),""!==token&&document.querySelector(".forms")&&formsView.classList.add("form-disabled")}function logIn(){document.querySelector(".forms")&&formsView.classList.add("form-disabled"),logoutButton.classList.add("is-active");var e=localStorage.getItem("LOGIN-SESSION");document.getElementById("user").innerHTML=e}function logOut(){localStorage.clear(),logoutButton.classList.remove("is-active"),document.getElementById("user").innerHTML="",document.querySelector(".forms")&&formsView.classList.add("form-enable")}document.querySelector("#nomeMyInfo")&&(nomeUser=document.querySelector("#nomeMyInfo"),console.log(nomeUser.innerHTML),nomeUser.innerHTML="meu nome");