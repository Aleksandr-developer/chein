$(function() {
    // clear
    $('input').on('focus', function() {
        $('p.error').remove();
        $('input').removeClass('error');
    });

    // register
    $('.register-button').on('click', function(e) { // регистрация нажатия на кнопку "зарегистрироваться"
        e.preventDefault();
        $('p.error').remove();
        $('input').removeClass('error');
       // считывание из полей ввода инфы(по idишникам полей в html файле) при помощи функции val()
        let data = {
            name: $('#register-name').val(),
            surname: $('#register-surname').val(),
            patronymic: $('#register-patronymic').val(),
            email: $('#register-email').val(),
            course: $('#register-course').val(),
            path: $('#register-path').val(),
            password: $('#register-password').val(),
            passwordConfirm: $('#register-password-confirm').val()
        };
        //сам запрос
        $.ajax({
            type: 'POST',// тип запроса
            data: JSON.stringify(data),//перевод объекта с инфой в json формат
            contentType: 'application/json',//тип отпр объекта json
            url: '/api/auth/register'//ссылка на файл-обработчик на сервере
        }).done(function(data) {// .done ждет пока сервер обработает и ответит
            if (!data.ok) {// проверка добавленного поля(оно как свойство объекта)
                console.log(data);//для отладки....
                // обработка ответа, тоесть например выводишь пользователю ответ, что он лох и такой логин нельзя использовать, так как он есть в базе данных....
                $('.reg h2').after('<p class="error">' + data.error + '</p>');
                if (data.fields) {
                    data.fields.forEach(function(item) {
                        $('input[name=' + item + ']').addClass('error');
                    });
                }
            } else {
                //$('.reg h2').after('<p class="success">Отлично!</p>');
                $(location).attr('href', '/');
            }
        });
    });
     //login
    //аналогично с регистрацией, только для авторизации
    $('.login-button').on('click', function(e) {
        e.preventDefault();
        $('p.error').remove();
        $('input').removeClass('error');

        let data = {
            email: $('#login-email').val(),
            password: $('#login-password').val(),
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/auth/login'
        }).done(function(data) {
            if (!data.ok) {
                console.log(data);
                $('.login h2').after('<p class="error">' + data.error + '</p>');
                if (data.fields) {
                    data.fields.forEach(function(item) {
                        $('input[name=' + item + ']').addClass('error');
                    });
                }
            } else {
                //$('.login h2').after('<p class="success">Отлично!</p>');
                $(location).attr('href', '/');
            }
        });
     });

    $('.button').on('click', function(e) {
        e.preventDefault();
        $(location).attr('href', '/');
    });
});