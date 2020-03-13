function zero_first(value) {
    if (value < 10)
        value = '0' + value;
    return value;
}

function date_time() {
    let current_datetime = new Date();
    let day = zero_first(current_datetime.getDate());
    let month = zero_first(current_datetime.getDay());
    let year = zero_first(current_datetime.getFullYear());

    document.write(day + "." + month + "." + year);
}

date_time();