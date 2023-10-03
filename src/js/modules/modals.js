const modals = (state) => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        trigger.forEach(item => {

            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                // windows.forEach(item => {
                //     item.style.display = 'none';
                // });


                if (e.target.classList.contains('popup_calc_btn') ||
                    e.target.classList.contains('popup_engineer_btn') ||
                    e.target.classList.contains('phone_link')) {
                    showModal();
                }


                if (e.target.classList.contains('popup_calc_button')) {
                    if (!state.width || !state.height) {
                        addError('Введіть ширину і довжину вікна');
                    } else {
                        document.querySelector('.popup_calc').style.display = 'none';
                        showModal();
                    }
                }

                if (e.target.classList.contains('popup_calc_profile_button')) {
                    if (!state.profile) {
                        addError('Введіть тип скління');
                    } else {
                        document.querySelector('.popup_calc_profile').style.display = 'none';
                        showModal();
                    }
                }

                //showModal();

                function showModal() {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scroll}px`;
                }

                function addError(text) {
                    const err = document.createElement('div');
                    err.style.color = 'red';
                    err.classList.add('error');
                    err.textContent = text;

                    if (!item.parentElement.children[item.parentElement.children.length - 1].classList.contains('error')) {
                        item.parentElement.append(err);
                    }
                }

                // modal.style.display = 'block';
                // document.body.style.overflow = 'hidden';
                // document.body.classList.add('modal-open');
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            hideModal();

            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                hideModal();
            }
        });

        function hideModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        }
    }

    function showModalByTime(selector, time) {
        setTimeout(function () {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflow = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    //showModalByTime('.popup', 60000);
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');

    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);

    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);

}

export default modals;