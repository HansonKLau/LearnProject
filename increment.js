function incrementNum() {
    var element = document.getElementById('number');
    var value = element.innerHTML;

    ++value;
    document.getElementById('number').innerHTML = value;
}