if(document.querySelector('.button-modal')){
    let btnModal = document.querySelector('.button-modal');

    btnModal.addEventListener('click', openModal);
    closeModal.addEventListener('click', modalClose);
}

const containerModal = document.querySelector('[data-modal="container"]');
const closeModal = document.querySelector('[data-modal="close"]');

function openModal(){
    event.preventDefault();
    containerModal.classList.add('is-active');
}

function modalClose(){
    event.preventDefault();
    containerModal.classList.remove('is-active');
}
