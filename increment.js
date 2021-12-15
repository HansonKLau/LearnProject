function incrementNum() {
    // var element = document.getElementById('number');
    // var value = element.innerHTML;

    // ++value;
    // document.getElementById('number').innerHTML = value;

    if (localStorage.getItem('count') === null) {
        document.querySelector('#number').innerHTML = 0;
    }
    else {
        document.querySelector('#number').innerHTML = Number(localStorage.getItem('count'));
        let value = document.querySelector('#number').innerHTML;
        value++;
        localStorage.setItem('count', value.toString());
        document.querySelector('#number').innerHTML = Number(localStorage.getItem('count'));
    }
}