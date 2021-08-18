if(document.querySelector('.button-modal')){
    let btnModal = document.querySelector('.button-modal');
    
    let containerModal = document.querySelector('[data-modal="container"]');
    let closeModal = document.querySelector('[data-modal="close"]');

    btnModal.addEventListener('click', openModal);
    closeModal.addEventListener('click', modalClose);
    function openModal(){
        event.preventDefault();
        containerModal.classList.add('is-active');
    }
    
    function modalClose(){
        event.preventDefault();
        containerModal.classList.remove('is-active');
    }
}

