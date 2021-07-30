let token = '';
let formsView = document.querySelector(".forms");

const logout = () => {
    token = ''
}

function registerPost(url, body){
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(body));
    request.onload = function(){
        console.log(this.responseText);
        token = this.responseText
        console.log(token)
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
    console.log(nome, login, email, senha, endereco);

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
    let login =  document.getElementById("login-user").value;
    let senha = document.getElementById("password-login").value;
    

    let body = {"login" : login,
        "senha" : senha,
    }
    registerPost(url, body);

    if(token !== ''){
        formsView.classList.add("form-disabled");
    }
}

if (document.querySelector("#nomeMyInfo")){
    let nomeUser = document.querySelector("#nomeMyInfo");
    console.log(nomeUser.innerHTML);
    nomeUser.innerHTML = "meu nome";
}