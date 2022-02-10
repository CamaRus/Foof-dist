function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //фиксация фоновой прокрутки

    console.log(modalTimerId);
    if(modalTimerId){
    clearInterval(modalTimerId); //не выполнять функцию modalTimerId, если модальное окно уже было открыто
    };
};
    
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide'); //первый вариант
    modal.classList.remove('show'); //первый вариант
    //modal.classList.toggle('show'); второй вариант
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
 //Модальное окно

 const modalTrigger = document.querySelectorAll(triggerSelector),
 modal = document.querySelector(modalSelector);
 //modalCloseBtn = document.querySelector('[data-close]');

 modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });



//modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
//Если кликаем на подложку или на крестик - закрывается модальное окно
if (e.target === modal || e.target.getAttribute('data-close') == '') {
 closeModal(modalSelector);
};
});

//Привязываем клавишу "Escape" для закрытия модального окна
document.addEventListener('keydown', (e) => {
if(e.code === "Escape" && modal.classList.contains('show')) {
 closeModal(modalSelector);
};
});



function showModalByScroll(){ //Если пользователь долистал до конца страницы
if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
 openModal(modalSelector, modalTimerId);
 window.removeEventListener('scroll', showModalByScroll);
};
};

window.addEventListener('scroll', showModalByScroll);
};

export default modal;
export {closeModal};
export {openModal};
