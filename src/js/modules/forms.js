import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');
    checkNumInputs('input[name="user_name"]');


    const message = {
        loading: 'Завантаження',
        success: `Дякуємо! Скоро ми з вами зв'яжемося`,
        failure: 'Щось пішло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    }

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        const modals = document.querySelectorAll('[data-modal]');
                        modals.forEach(item => {
                            item.style.display = 'none';
                            document.body.style.overflow = '';
                        });
                    }, 5000);

                    // State clear
                    for (let key in state) {
                        state[key] = '';
                    }
                    state.form = 0;
                    state.type = 'tree';
                    document.querySelectorAll('.popup_calc_profile .checkbox')
                        .forEach(elem => elem.checked = false);
                    console.log(state);
                });
        });


    });
};

export default forms;