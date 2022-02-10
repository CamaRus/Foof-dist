import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    //Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: '/img/form/054 spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); //отменяем стандартное поведение браузера

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage); 
            //расположение спиннера под окном

            //request.setRequestHeader('Content-type', 'application/json'); //для конвертации данных в формат JSON
            const formData = new FormData(form); //аттрибут name в формах обязателен! 
        
            const json = JSON.stringify(Object.fromEntries(formData.entries())); 
            //entries - получаем данные из формы в виде массива массивов
            //fromEntries - полученный массив превращаем в объект          


            postData('http://localhost:3000/requests', json)
            //http://localhost:3000/requests - в файле db.json создаётся ключ
            //requests с массивом введённых данных
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                form.reset(); //сброс формы после отправки
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    };

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('.modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 1000);
    };

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
};

export default forms;