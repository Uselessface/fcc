const decreaseBtn = document.querySelector(".decrease");
const resetBtn = document.querySelector('.reset');
const increaseBtn = document.querySelector('.increase')
const val = document.querySelector('#value');

decreaseBtn.addEventListener('click', ()=>{
    val.textContent = `${parseInt(val.innerHTML) - 1}`;
    colorCounter()
})
increaseBtn.addEventListener('click', ()=>{
    val.textContent = `${parseInt(val.innerHTML) + 1}`;
    colorCounter();
})
resetBtn.addEventListener('click', ()=>{
    val.textContent = `0`;
    colorCounter();
})
function colorCounter(){
    if (parseInt(val.textContent) < 0){
        val.style.color = 'red'
    }
    if (parseInt(val.textContent) > 0){
        val.style.color = `green`
    }
    if (parseInt(val.textContent) === 0){
        val.style.color = '#222'
    }
}


/*

const value = document.querySelector('#value');
const buttons = document.querySelectorAll('.btn');
let count = 0


buttons.forEach(function (el) {
    el.addEventListener("click", btn => {
        const styles = btn.currentTarget.classList
        if (styles.contains('decrease')) {
            count--
        } else if (styles.contains('increase')) {
            count++
        } else {
            count = 0
        }
        if (count < 0){
            value.style.color = 'red'
        }
        if (count > 0){
            value.style.color = 'green'
        }
        if (count === 0){
            value.style.color = '#222'
        }
        value.textContent = `${count}`
    })
})*/
