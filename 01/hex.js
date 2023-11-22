const hexArr = [0,1,2,3,4,5,6,7,8,9,'A',"B","C","D","E","F"]



function randomHex() {
    let hexStr = `#`
    for (let i = 0; i < 6; i++){
        hexStr += hexArr[getRandomInt(hexArr)]
    }
    return hexStr
}

function getRandomInt(arr) {
    return Math.floor(Math.random() * arr.length);
}

const btn = document.querySelector('#btn');
const color = document.querySelector('.color');


btn.addEventListener('click', function (){
    document.querySelector('main').style.backgroundColor = randomHex();
    color.textContent = randomHex();
})