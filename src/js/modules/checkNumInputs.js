const checkNumInputs = (selector) => {
    const numInput = document.querySelectorAll(selector);

    numInput.forEach(item => {
        item.addEventListener('input', (e) => {

            if (e.target.getAttribute('name') === 'user_phone') {
                let x = e.target.value.replace(/\D/g, '')
                    .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

                e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' +
                    x[3] : '') + (x[4] ? '-' + x[4] : '');

            } else if (e.target.getAttribute('name') === 'user_name') {
                item.value = item.value.replace(/\d/, '');

            } else {
                item.value = item.value.replace(/\D/, '');
            }

            // Check operator code

            // const reg = /[0][5679][^24\D]/g;
            // const err = document.createElement('div');
            // err.textContent = 'Перевірте код оператора';
            // err.style.textColor = 'red';
            // if ((x[1].length === 3) && !reg.test(x[1])) {
            //     item.parentNode.insertBefore(err, item.parentNode.children[3]);
            // }
        });

    });
};

export default checkNumInputs;