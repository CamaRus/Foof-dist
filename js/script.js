document.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

        function hideTabContent() {
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade'); //удаляем класс с анимацией

            });

            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        }

        function showTabContent(i = 0) {
            tabsContent[i].classList.add('show', 'fade'); //добавляем класс с анимацией
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        }

        hideTabContent();
        showTabContent(0);

        tabsParent.addEventListener('click', (event) => {
            const target = event.target;

            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                })
            };
        });

        //Timer

        const deadline = '2022-02-02';
        function getTimeRemaining(endtime){
            const t = Date.parse(endtime) - Date.parse(new Date()), //преобразовываем строку и вычитаем текущее время
                days = Math.floor(t / (1000 * 60 * 60 * 24)), //округление
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);

            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        };

        function getZero(num){
            if(num>=0 && num<10){
                return `0${num}`;
            } else {
                return num;
            }
        };

        function setClock(selector, endtime){
            const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

            function updateClock(){
                const t = getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if(t.total <= 0){
                    clearInterval(timeInterval);
                }
            }
        }

        setClock('.timer', deadline);

        //Модальное окно

        const modalTrigger = document.querySelectorAll('[data-modal]'),
                modal = document.querySelector('.modal'),
                modalCloseBtn = document.querySelector('[data-close]');


        function openModal() {
            //modal.classList.add('show'); //первый вариант
            //modal.classList.remove('hide'); //первый вариант
            modal.classList.toggle('show');
            document.body.style.overflow = 'hidden'; //фиксация фоновой прокрутки
            clearInterval(modalTimerId); //не выполнять функцию modalTimerId, если модальное окно уже было открыто
        };

        modalTrigger.forEach(btn => {
            btn.addEventListener('click', openModal);
        });

        function closeModal() {
            //modal.classList.add('hide'); //первый вариант
            //modal.classList.remove('show'); //первый вариант
            modal.classList.toggle('show');
            document.body.style.overflow = '';
        }

        modalCloseBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            };
        });

        //Привязываем клавишу "Escape" для закрытия модального окна
        document.addEventListener('keydown', (e) => {
            if(e.code === "Escape" && modal.classList.contains('show')) {
                closeModal();
            };
        });

        //Таймер появления модального окна
        //const modalTimerId = setTimeout(openModal, 3000);

        function showModalByScroll(){ //Если пользователь долистал до конца страницы
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
            };
        };

        window.addEventListener('scroll', showModalByScroll);
     
        //Используем классы для карточек  
        
        class MenuCard {
            constructor(src, alt, title, descr, price, parentSelector, ...classes) {
                //...classes - rest-оператор
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.classes = classes;
                this.parent = document.querySelector(parentSelector);
                this.transfer = 27;
                this.changeToUAH();
            }

            //Конвертация валюты
            changeToUAH() {
                this.price = this.price * this.transfer;
            }

            render() {
                const element = document.createElement('div');
                if(this.classes.length === 0){
                    this.element = 'menu__item';
                    element.classList.add(this.element);
                } else {
                this.classes.forEach(className => element.classList.add(className));
                }
                
                element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}"</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;
                this.parent.append(element);
            }
        }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item',
        //'big'
    ).render();

    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); //отменяем стандартное поведение браузера

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', '/js/server.php');

            //request.setRequestHeader('Content-type', 'multipart/form-data');
            const formData = new FormData(form); //аттрибут name в фомах обязателен! 
        
            request.send(formData);

            request.addEventListener('load', () => {
                if (request.status === 200){
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                } else {
                    statusMessage.textContent = message.failure;
                };
            });
        });
    };
});