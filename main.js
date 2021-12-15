function display() {
    if (localStorage.getItem('count') === null) {
      document.querySelector('#number').innerHTML = 0;
    }
    else {
      document.querySelector('#number').innerHTML = Number(localStorage.getItem('count'));
    }
}

function resetNum() {
    localStorage.setItem("count", 0);
    document.querySelector('#number').innerHTML = Number(localStorage.getItem('count'));
}

function changeNum(incrOrDecr) {
    console.log('here');
    if (localStorage.getItem('count') === null) {
        document.querySelector('#number').innerHTML = 0;
    }
    else {
        document.querySelector('#number').innerHTML = Number(localStorage.getItem('count'));
        let value = document.querySelector('#number').innerHTML;
        if (incrOrDecr == 'i') {
            value++;
        }
        else if (incrOrDecr == 'd') {
            value--;
        }
        localStorage.setItem('count', value.toString());
        document.querySelector('#number').innerHTML = Number(localStorage.getItem('count'));
    }
}