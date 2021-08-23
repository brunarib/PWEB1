"use strict";var categorias=[],requestGet={method:"GET",redirect:"follow"},jsonData="",getUrlCategoria="http://localhost:8181/categorias";function changeCategory(e,t){var o=Number(e),e=JSON.stringify({categoriaId:o,descricao:t});console.log(e);o=localStorage.getItem("TOKEN-SESSION"),t=new XMLHttpRequest;t.open("PUT","http://localhost:8181/categorias/editar",!1),t.setRequestHeader("Authorization","Bearer "+o),t.setRequestHeader("Content-Type","application/json"),t.send(e),window.location.reload(!0)}function cadastrarCategoria(){event.preventDefault();var e=document.getElementById("category").value,t=localStorage.getItem("TOKEN-SESSION"),o=JSON.stringify({descricao:e}),e=new XMLHttpRequest;e.open("POST","http://localhost:8181/categorias/categoriaCadastro",!0),e.setRequestHeader("Authorization","Bearer "+t),e.setRequestHeader("Content-type","application/json"),e.send(o),e.onload=function(){alert("Categoria Cadastrada!")}}function listarCategorias(){var t=new XMLHttpRequest;t.overrideMimeType("application/json"),t.open("GET","http://localhost:8181/categorias",!0),t.onload=function(){var e=JSON.parse(t.responseText);console.log(e);var n,l=document.querySelector(".tableCategoria"),i=document.querySelector(".rowItem");document.querySelector(".category-list")&&e.forEach(function(e,t){var o=i.cloneNode(!0);o.style.display="table-row";var n=o.querySelector(".rowNumber"),a=o.querySelector(".categoriaId"),r=o.querySelector(".descricao");n.innerHTML=t,a.innerHTML=e.categoriaId,r.innerHTML=e.descricao,o.appendChild(delButton()),o.appendChild(changeButton()),l.appendChild(o)}),document.querySelector(".product-list")&&(n=document.querySelector("#category-select"),e.forEach(function(e,t){var o=document.createElement("option");o.value=e.categoriaId,o.innerHTML=e.descricao,n.appendChild(o)}))},t.send(null),console.log(jsonData)}function deleteCategory(e){var t=localStorage.getItem("TOKEN-SESSION"),o="http://localhost:8181/categorias/deletar?"+new URLSearchParams({categoriaId:e}).toString();console.log("id:"+clienteId),console.log(t);e=new XMLHttpRequest;e.open("DELETE",o,!1),e.setRequestHeader("Authorization","Bearer "+t),e.send(),console.log(e.responseText)}window.location.href,listarCategorias();var delButton=function(){var e=document.createElement("a");return e.innerText="excluir",e.addEventListener("click",delLi),e},delLi=function(e){var t=e.target,e=t.parentElement;return deleteCategory(t.parentElement.querySelector(".categoriaId").innerHTML),console.log(t.parentElement.querySelector(".categoriaId").innerHTML),e.remove(),t},changeButton=function(){var e=document.createElement("button");return e.innerText="Editar",e.addEventListener("click",changeLi),e},changeLi=function(e){var t=e.target,o=t.parentElement.querySelector(".change-description").value,e=t.parentElement.querySelector(".categoriaId").innerHTML;return console.log(o),console.log(e),changeCategory(e,o),t};function cadastrarProduto(){event.preventDefault();var e=document.querySelectorAll("#category-select option"),t=void 0,o=void 0,n=document.getElementById("produto-description").value,a=document.getElementById("valor-produto").value,r=document.getElementById("quantidade-produto").value;e.forEach(function(e){e.selected&&(console.log(e.value),t=e.value,e.innerHTML=o,console.log(o))});e=localStorage.getItem("TOKEN-SESSION"),a=JSON.stringify({categorias:[{categoriaId:t,descricao:o}],descricaoProduto:n,preco:a,quantidadeEstoque:r});console.log(a);r=new XMLHttpRequest;r.open("POST","http://localhost:8181/produtos/produtoCadastro",!0),r.setRequestHeader("Authorization","Bearer "+e),r.setRequestHeader("Content-type","application/json"),r.send(a),r.onload=function(){alert("Produto Cadastrado!")}}function listarPrdutos(){var t=new XMLHttpRequest;t.overrideMimeType("application/json"),t.open("GET","http://localhost:8181/produtos"),t.onload=function(){var e=JSON.parse(t.responseText);console.log(e);var s=document.querySelector(".item__content"),u=document.querySelector(".content__description");e.forEach(function(e,t){var o=u.cloneNode(!0),n=o.getElementById("position"),a=o.getElementById("id-categoria"),r=o.getElementById("categoria-des"),l=o.getElementById("id-produto"),i=o.getElementById("nome-pro"),c=o.getElementById("valor-pro"),d=o.getElementById("quat-pro");n.innerHTML=t,a.innerHTML=e.categoria.categoriaId,r.innerHTML=e.categoria.descricao,l.innerHTML=e.produtoId,i.innerHTML=e.descricaoProduto,c.innerHTML=e.quantidadeEstoque,d.innerHTML=e.preco,o.appendChild(changeButton()),o.appendChild(delButton),s.appendChild(o)})},t.send(null),console.log(jsonData)}function createProduct(){event.preventDefault();registerPost("http://localhost:8181/produtos/produtoCadastro",{categorias:[{categoriaId:document.getElementById("id-categoria-produto").value,descricao:document.getElementById("").value}],descricaoProduto:document.getElementById("nome-produto").value,preco:document.getElementById("preco-produto").value,quantidadeEstoque:document.getElementById("quantidade-produto").value}),alert("Produto Cadastrado!")}function getcategoriaProduto(){console.log("Pegou categoria");var t=new XMLHttpRequest;t.overrideMimeType("application/json"),t.open("GET","http://localhost:8181/categorias",!0),t.onload=function(){var e=Json.parse(t.responseText);console.log(e);var a=document.querySelector("id-categoria-produto"),r=document.querySelector(".categoriaItem");e.forEach(function(e){var t=r.cloneNode(!0),o=t.querySelector(".id-categoria-produto"),n=t.querySelector(".nome-categoria-produto");o.innerHTML=e.categoriaId,n.innerHTML=e.descricao,a.appendChild(t)}),t.send(null),console.log(jsonData)}}listarPrdutos(),getcategoriaProduto();var token="",formsView=document.querySelector(".forms"),logoutButton=document.getElementById("logout"),conta=document.getElementById("minha-conta"),userConta=document.getElementById("conta-user"),clienteId="",cliente={usuario:{id:null,nome:null,login:null,email:null,senha:null},endereco:null,id:null};function changeData(){var e=document.getElementById("nome-config"),t=document.getElementById("email-config"),o=document.getElementById("endereco-config"),n=document.getElementById("change-name").value,a=document.getElementById("change-email").value,r=document.getElementById("change-address").value;e.innerHTML="Nome: "+n,t.innerHTML="Email: "+a,o.innerHTML="Endereço: "+r;t=JSON.stringify({usuario:{id:cliente.usuario.id,nome:n,email:a},endereco:r,id:cliente.id}),o=localStorage.getItem("TOKEN-SESSION"),t=JSON.stringify({usuario:{id:cliente.usuario.id,nome:n,email:a},endereco:r,id:cliente.id});console.log("change"+t);r=new XMLHttpRequest;r.open("PUT","http://localhost:8181/clientes/editar",!1),r.setRequestHeader("Authorization","Bearer "+o),r.setRequestHeader("Content-Type","application/json"),r.send(t),console.log("change"+t),window.location.reload(!0)}localStorage.getItem("TOKEN-SESSION")&&(signIn(),"http://localhost:3000/pagina-minha-conta.html"!=window.location.href&&"http://localhost:3000/pagina-minha-conta-config.html"!=window.location.href&&"http://localhost:3000/index.html"!=window.location.href||userData());var openModal,modalClose,btnModal,containerModal,closeModal,logout=function(){token=""};function dataGet(e,t){var o=new XMLHttpRequest;return o.open("GET",e,!1),o.setRequestHeader("Authorization","Bearer "+t),o.send(),console.log(o.responseText),o.responseText}function userData(){var e=dataGet("http://localhost:8181/clientes/getCliente",localStorage.getItem("TOKEN-SESSION")),t=JSON.parse(e);console.log(t.usuario.adm),t.usuario.adm&&(conta.href="page-admin.html");var o=document.getElementById("login-config"),n=document.getElementById("nome-config"),a=document.getElementById("email-config"),e=document.getElementById("endereco-config");o.innerHTML="Login: "+t.usuario.login,n.innerHTML="Nome: "+t.usuario.nome,a.innerHTML="Email: "+t.usuario.email,e.innerHTML="Endereço: "+t.endereco,cliente.endereco=t.endereco,cliente.id=t.id,cliente.usuario.id=t.usuario.id,cliente.usuario.email=t.usuario.email,cliente.usuario.nome=t.usuario.nome,cliente.usuario.login=t.usuario.login,console.log(cliente)}function registerPost(e,t){var o=new XMLHttpRequest;return o.open("POST",e,!0),o.setRequestHeader("Content-type","application/json"),o.send(JSON.stringify(t)),o.onload=function(){token=this.responseText,localStorage.setItem("TOKEN-SESSION",token)},o.responseText}function registerUser(){event.preventDefault();var e=document.getElementById("name-register").value,t=document.getElementById("login-register").value,o=document.getElementById("email-register").value,n=document.getElementById("password-register").value;registerPost("http://localhost:8181/clientes/usuarioCadastro",{endereco:document.getElementById("adress-register").value,usuario:{adm:"false",email:o,login:t,nome:e,senha:n}}),alert("Usuario Cadastrado!")}function loginUser(){event.preventDefault();var e=document.getElementById("login-user").value,t=document.getElementById("password-login").value;localStorage.setItem("LOGIN-SESSION",e),localStorage.setItem("SENHA-SESSION",t);t={login:e,senha:t};console.log(t),registerPost("http://localhost:8181/login",t),""!==token&&document.querySelector(".forms")&&(formsView.classList.add("form-disabled"),signIn(),window.location.reload(!0))}function signIn(){document.querySelector(".forms")&&formsView.classList.add("form-disabled"),conta.classList.add("is-active"),logoutButton.classList.add("is-active"),userConta.classList.add("is-active");var e=localStorage.getItem("LOGIN-SESSION");document.getElementById("user").innerHTML=e}function singOut(){localStorage.clear(),conta.classList.remove("is-active"),logoutButton.classList.remove("is-active"),userConta.classList.remove("is-active"),document.getElementById("user").innerHTML="",document.querySelector(".forms")&&formsView.classList.add("form-enable"),window.open("http://localhost:3000/index.html","_self")}function deleteCliente(){var e=localStorage.getItem("TOKEN-SESSION"),t="http://localhost:8181/clientes/deletar?"+new URLSearchParams({clienteId:cliente.id}).toString();console.log("id:"+clienteId),console.log(e);var o=new XMLHttpRequest;o.open("DELETE",t,!1),o.setRequestHeader("Authorization","Bearer "+e),o.send(),console.log(o.responseText)}document.querySelector(".button-modal")&&(openModal=function(){event.preventDefault(),containerModal.classList.add("is-active")},modalClose=function(){event.preventDefault(),containerModal.classList.remove("is-active")},btnModal=document.querySelector(".button-modal"),containerModal=document.querySelector('[data-modal="container"]'),closeModal=document.querySelector('[data-modal="close"]'),btnModal.addEventListener("click",openModal),closeModal.addEventListener("click",modalClose));