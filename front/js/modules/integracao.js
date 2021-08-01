let token = '';
let formsView = document.querySelector(".forms");
if(document.querySelector(".forms")){
     
}
let logoutButton = document.getElementById('logout');

if (localStorage.getItem('TOKEN-SESSION')){
   logIn();
}

const logout = () => {
    token = '';
}

function registerPost(url, body){
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(body));
    request.onload = function(){
    token = this.responseText
    localStorage.setItem("TOKEN-SESSION", token);
    }   
    return request.responseText;
}
function registerUser(){
    event.preventDefault();
    let url = "http://localhost:8181/clientes/usuarioCadastro";
    let nome = document.getElementById("name").value;
    let login =  document.getElementById("login-register").value;
    let email = document.getElementById("email-register").value ;
    let senha = document.getElementById("password-register").value;
    let endereco = document.getElementById("adress-register").value;
    let body = {"endereco": endereco,
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
function loginUser(){
    event.preventDefault();
    let url = "http://localhost:8181/login";
    let login =  document.getElementById('login-user').value;
    let senha = document.getElementById('password-login').value;
    localStorage.setItem('LOGIN-SESSION', login);
    localStorage.setItem('SENHA-SESSION', senha);  
    let body = {'login' : login,
        'senha' : senha,
    }
    registerPost(url, body);

    if(token !== ''){
        if(document.querySelector(".forms")){
            formsView.classList.add("form-disabled");
        }
    }
    
}

if (document.querySelector("#nomeMyInfo")){
    let nomeUser = document.querySelector("#nomeMyInfo");
    console.log(nomeUser.innerHTML);
    nomeUser.innerHTML = "meu nome";
}

function logIn(){
    if(document.querySelector(".forms")){
        formsView.classList.add('form-disabled');
    }
    logoutButton.classList.add("is-active");
    let userLoging = localStorage.getItem('LOGIN-SESSION');
    let user = document.getElementById('user');
    user.innerHTML = userLoging;      
}

function logOut(){
    localStorage.clear();
    logoutButton.classList.remove("is-active");
    let user = document.getElementById('user');
    user.innerHTML = "";
    if (document.querySelector(".forms")){
        formsView.classList.add('form-enable');
    }
    
}
