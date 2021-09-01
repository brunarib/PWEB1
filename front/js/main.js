"use strict";var guardaItens;null===localStorage.getItem("CARRINHO")&&localStorage.setItem("CARRINHO",JSON.stringify(guardaItens=[]));var addButtonCarrinho=function(){var e=document.createElement("button");return e.innerText="Comprar",e.addEventListener("click",addProduto),e},addProduto=function(e){var t=e.target,o=t.parentElement.querySelector(".id-produto").innerHTML,n=t.parentElement.querySelector(".title__item").innerHTML,e=t.parentElement.querySelector(".prices__total").innerHTML;return console.log(o),console.log(n),console.log(e),addCart(o,n,e),t};function addCart(e,t,o){t=JSON.stringify({id:e,nome:t,preco:o});console.log(t);o=JSON.parse(localStorage.getItem("CARRINHO"));o.push(t),localStorage.setItem("CARRINHO",JSON.stringify(o)),alert("Produto Adicionado ao Carrinho")}function mostraItemCarrinho(){}var categorias=[],requestGet={method:"GET",redirect:"follow"},jsonData="",getUrlCategoria="http://localhost:8181/categorias";function changeCategory(e,t){var o=Number(e),e=JSON.stringify({categoriaId:o,descricao:t});console.log(e);o=localStorage.getItem("TOKEN-SESSION"),t=new XMLHttpRequest;t.open("PUT","http://localhost:8181/categorias/editar",!1),t.setRequestHeader("Authorization","Bearer "+o),t.setRequestHeader("Content-Type","application/json"),t.send(e),window.location.reload(!0)}function cadastrarCategoria(){event.preventDefault();var e=document.getElementById("category").value,t=localStorage.getItem("TOKEN-SESSION"),o=JSON.stringify({descricao:e}),e=new XMLHttpRequest;e.open("POST","http://localhost:8181/categorias/categoriaCadastro",!0),e.setRequestHeader("Authorization","Bearer "+t),e.setRequestHeader("Content-type","application/json"),e.send(o),e.onload=function(){alert("Categoria Cadastrada!"),window.location.reload(!0)}}function listarCategorias(){var t=new XMLHttpRequest;t.overrideMimeType("application/json"),t.open("GET","http://localhost:8181/categorias",!0),t.onload=function(){var e=JSON.parse(t.responseText);console.log(e);var n,l=document.querySelector(".tableCategoria"),i=document.querySelector(".rowItem");document.querySelector(".category-list")&&e.forEach(function(e,t){var o=i.cloneNode(!0);o.style.display="table-row";var n=o.querySelector(".rowNumber"),r=o.querySelector(".categoriaId"),a=o.querySelector(".descricao");n.innerHTML=t,r.innerHTML=e.categoriaId,a.innerHTML=e.descricao,o.appendChild(delButton()),o.appendChild(changeButton()),l.appendChild(o)}),document.querySelector(".product-list")&&(n=document.querySelector("#category-select"),e.forEach(function(e,t){var o=document.createElement("option");o.value=e.categoriaId,o.innerHTML=e.descricao,n.appendChild(o)}))},t.send(null),console.log(jsonData)}function deleteCategory(e){var t=localStorage.getItem("TOKEN-SESSION"),o="http://localhost:8181/categorias/deletar?"+new URLSearchParams({categoriaId:e}).toString();console.log("id:"+clienteId),console.log(t);e=new XMLHttpRequest;e.open("DELETE",o,!1),e.setRequestHeader("Authorization","Bearer "+t),e.send(),console.log(e.responseText)}window.location.href,listarCategorias();var delButton=function(){var e=document.createElement("button");return e.innerText="excluir",e.addEventListener("click",delLi),e},delLi=function(e){var t=e.target,e=t.parentElement;return deleteCategory(t.parentElement.querySelector(".categoriaId").innerHTML),console.log(t.parentElement.querySelector(".categoriaId").innerHTML),e.remove(),t},changeButton=function(){var e=document.createElement("button");return e.innerText="Editar",e.addEventListener("click",changeLi),e},changeLi=function(e){var t=e.target,o=t.parentElement.querySelector(".change-description").value,e=t.parentElement.querySelector(".categoriaId").innerHTML;return console.log(o),console.log(e),changeCategory(e,o),t};function cadastrarProduto(){event.preventDefault();var e=document.querySelectorAll("#category-select option"),t=void 0,o=void 0,n=document.querySelector("#description").value,r=document.querySelector("#value").value,a=document.querySelector("#qtd").value;e.forEach(function(e){e.selected&&(console.log(e.value),t=e.value,e.innerHTML=o,console.log(o))});e=localStorage.getItem("TOKEN-SESSION"),r=JSON.stringify({categorias:[{categoriaId:t,descricao:o}],descricaoProduto:n,preco:r,quantidadeEstoque:a});console.log(r);a=new XMLHttpRequest;a.open("POST","http://localhost:8181/produtos/produtoCadastro",!0),a.setRequestHeader("Authorization","Bearer "+e),a.setRequestHeader("Content-type","application/json"),a.send(r),a.onload=function(){alert("Produto Cadastrado!"),window.location.reload(!0)}}function mudarProduto(e,t,o,n,r,a){e=Number(e),r=Number(r),o=Number(o),n=Number(n),o=JSON.stringify({categorias:[{categoriaId:r,descricao:a}],descricaoProduto:t,preco:o,produtoId:e,quantidadeEstoque:n});console.log(o);e=localStorage.getItem("TOKEN-SESSION"),n=new XMLHttpRequest;n.open("PUT","http://localhost:8181/produtos/editar",!1),n.setRequestHeader("Authorization","Bearer "+e),n.setRequestHeader("Content-Type","application/json"),n.send(o),window.location.reload(!0)}function listarPrdutos(){var t=new XMLHttpRequest;t.overrideMimeType("application/json"),t.open("GET","http://localhost:8181/produtos",!0),t.onload=function(){var i,c,e=JSON.parse(t.responseText),u=document.querySelector(".tableProduto"),s=document.querySelector(".rowItemProduto");document.querySelector(".product-list")&&e.forEach(function(e,t){var o=s.cloneNode(!0);o.style.display="table-row";var n=o.querySelector(".rowNumberProduto"),r=o.querySelector(".categoriaId"),a=o.querySelector(".categoriaNome"),l=o.querySelector(".produtoId"),i=o.querySelector(".produtoNome"),c=o.querySelector(".produtoQuantitade"),d=o.querySelector(".precoProduto");n.innerHTML=t,r.innerHTML=e.categoria[0].categoriaId,a.innerHTML=e.categoria[0].descricao,l.innerHTML=e.produtoId,i.innerHTML=e.descricaoProduto,c.innerHTML=e.quantidadeEstoque,d.innerHTML=e.preco,o.appendChild(changeButtonProduto()),o.appendChild(delButtonProduto()),u.appendChild(o)}),document.querySelector(".page-home")&&(i=document.querySelector(".product-listing"),c=document.querySelector(".listing-item"),console.log(e),e.forEach(function(e,t){var o=c.cloneNode(!0);o.style.display="block";var n=o.querySelector(".categorie__item"),r=o.querySelector(".title__item"),a=o.querySelector(".prices__total"),l=o.querySelector(".installment__value");o.querySelector(".id-produto");l.innerHTML="R$ "+e.preco/2+",00",n.innerHTML=e.categoria[0].descricao,r.innerHTML=e.descricaoProduto,e.produtoId,a.innerHTML="Total: R$ "+e.preco+",00",o.appendChild(addButtonCarrinho()),i.appendChild(o)}))},t.send(null)}function deletarProduto(e){var t=localStorage.getItem("TOKEN-SESSION"),o="http://localhost:8181/produtos/deletar?"+new URLSearchParams({produtoId:e}).toString();console.log(t);e=new XMLHttpRequest;e.open("DELETE",o,!1),e.setRequestHeader("Authorization","Bearer "+t),e.send(),console.log(e.responseText)}listarPrdutos();var delButtonProduto=function(){var e=document.createElement("button");return e.innerText="excluir",e.addEventListener("click",delLiProduto),e},delLiProduto=function(e){var t=e.target,e=t.parentElement;return deletarProduto(t.parentElement.querySelector(".produtoId").innerHTML),console.log(t.parentElement.querySelector(".produtoId").innerHTML),e.remove(),t},changeButtonProduto=function(){var e=document.createElement("button");return e.innerText="Editar",e.addEventListener("click",changeLiProduto),e},changeLiProduto=function(e){var t=e.target,o=t.parentElement.querySelector(".produtoNome").innerHTML,n=t.parentElement.querySelector(".precoProduto").innerHTML,r=t.parentElement.querySelector(".produtoQuantitade").innerHTML,a=t.parentElement.querySelector(".change-description-produto").value,l=t.parentElement.querySelector(".change-preco-produto").value,i=t.parentElement.querySelector(".change-quantidade-produto").value,c=t.parentElement.querySelector(".produtoId").innerHTML,d=t.parentElement.querySelector(".categoriaId").innerHTML,e=t.parentElement.querySelector(".categoriaNome").innerHTML;return""===a&&(a=o),""===l&&(l=n),""===i&&(i=r),console.log(a),console.log(l),console.log(i),console.log(c),console.log(d),console.log(e),mudarProduto(c,a,l,i,d,e),t},token="",formsView=document.querySelector(".forms"),logoutButton=document.getElementById("logout"),conta=document.getElementById("minha-conta"),userConta=document.getElementById("conta-user"),clienteId="",cliente={usuario:{id:null,nome:null,login:null,email:null,senha:null},endereco:null,id:null};function changeData(){var e=document.getElementById("nome-config"),t=document.getElementById("email-config"),o=document.getElementById("endereco-config"),n=document.getElementById("change-name").value,r=document.getElementById("change-email").value,a=document.getElementById("change-address").value;e.innerHTML="Nome: "+n,t.innerHTML="Email: "+r,o.innerHTML="Endereço: "+a;t=JSON.stringify({usuario:{id:cliente.usuario.id,nome:n,email:r},endereco:a,id:cliente.id}),o=localStorage.getItem("TOKEN-SESSION"),t=JSON.stringify({usuario:{id:cliente.usuario.id,nome:n,email:r},endereco:a,id:cliente.id});console.log("change"+t);a=new XMLHttpRequest;a.open("PUT","http://localhost:8181/clientes/editar",!1),a.setRequestHeader("Authorization","Bearer "+o),a.setRequestHeader("Content-Type","application/json"),a.send(t),console.log("change"+t),window.location.reload(!0)}localStorage.getItem("TOKEN-SESSION")&&(signIn(),"http://localhost:3000/pagina-minha-conta.html"!=window.location.href&&"http://localhost:3000/pagina-minha-conta-config.html"!=window.location.href&&"http://localhost:3000/index.html"!=window.location.href&&"http://localhost:3000/page-admin-config.html"!=window.location.href||userData());var openModal,modalClose,btnModal,containerModal,closeModal,logout=function(){token=""};function dataGet(e,t){var o=new XMLHttpRequest;return o.open("GET",e,!1),o.setRequestHeader("Authorization","Bearer "+t),o.send(),console.log(o.responseText),o.responseText}function userData(){var e=dataGet("http://localhost:8181/clientes/getCliente",localStorage.getItem("TOKEN-SESSION")),t=JSON.parse(e);console.log(t.usuario.adm),t.usuario.adm&&(conta.href="page-admin.html");var o=document.getElementById("login-config"),n=document.getElementById("nome-config"),r=document.getElementById("email-config"),e=document.getElementById("endereco-config");o.innerHTML="Login: "+t.usuario.login,n.innerHTML="Nome: "+t.usuario.nome,r.innerHTML="Email: "+t.usuario.email,e.innerHTML="Endereço: "+t.endereco,cliente.endereco=t.endereco,cliente.id=t.id,cliente.usuario.id=t.usuario.id,cliente.usuario.email=t.usuario.email,cliente.usuario.nome=t.usuario.nome,cliente.usuario.login=t.usuario.login,console.log(cliente)}function registerPost(e,t){var o=new XMLHttpRequest;return o.open("POST",e,!0),o.setRequestHeader("Content-type","application/json"),o.send(JSON.stringify(t)),o.onload=function(){token=this.responseText,localStorage.setItem("TOKEN-SESSION",token)},o.responseText}function registerUser(){event.preventDefault();var e=document.getElementById("name-register").value,t=document.getElementById("login-register").value,o=document.getElementById("email-register").value,n=document.getElementById("password-register").value;registerPost("http://localhost:8181/clientes/usuarioCadastro",{endereco:document.getElementById("adress-register").value,usuario:{adm:"false",email:o,login:t,nome:e,senha:n}}),alert("Usuario Cadastrado!")}function loginUser(){event.preventDefault();var e=document.getElementById("login-user").value,t=document.getElementById("password-login").value;localStorage.setItem("LOGIN-SESSION",e),localStorage.setItem("SENHA-SESSION",t);t={login:e,senha:t};console.log(t),registerPost("http://localhost:8181/login",t),""!==token&&document.querySelector(".forms")&&(formsView.classList.add("form-disabled"),signIn(),window.location.reload(!0))}function signIn(){document.querySelector(".forms")&&formsView.classList.add("form-disabled"),conta.classList.add("is-active"),logoutButton.classList.add("is-active"),userConta.classList.add("is-active");var e=localStorage.getItem("LOGIN-SESSION");document.getElementById("user").innerHTML=e}function singOut(){localStorage.removeItem("TOKEN-SESSION"),localStorage.removeItem("SENHA-SESSION"),localStorage.removeItem("LOGIN-SESSION"),conta.classList.remove("is-active"),logoutButton.classList.remove("is-active"),userConta.classList.remove("is-active"),document.getElementById("user").innerHTML="",document.querySelector(".forms")&&formsView.classList.add("form-enable"),window.open("http://localhost:3000/index.html","_self")}function deleteCliente(){var e=localStorage.getItem("TOKEN-SESSION"),t="http://localhost:8181/clientes/deletar?"+new URLSearchParams({clienteId:cliente.id}).toString();console.log("id:"+clienteId),console.log(e);var o=new XMLHttpRequest;o.open("DELETE",t,!1),o.setRequestHeader("Authorization","Bearer "+e),o.send(),console.log(o.responseText),singOut()}document.querySelector(".button-modal")&&(openModal=function(){event.preventDefault(),containerModal.classList.add("is-active")},modalClose=function(){event.preventDefault(),containerModal.classList.remove("is-active")},btnModal=document.querySelector(".button-modal"),containerModal=document.querySelector('[data-modal="container"]'),closeModal=document.querySelector('[data-modal="close"]'),btnModal.addEventListener("click",openModal),closeModal.addEventListener("click",modalClose));