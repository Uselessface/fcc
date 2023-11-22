const colors = [
    'rgba(133,122,200)',
    '#f15025',
    '#1F3438',
    '#909090',
    '#434750',
]

const btn = document.querySelector('#btn');
const color = document.querySelector(".color");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
btn.addEventListener('click', (e) => {
    // get random number
    const randomNumber = getRandomInt(0,colors.length - 1);
    document.querySelector('main').style.backgroundColor = colors[randomNumber]
    color.textContent = colors[randomNumber]
    color.style.color = colors[randomNumber]
})