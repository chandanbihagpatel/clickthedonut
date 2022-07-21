import gameclass from "./gameClass.js";

const newGame = new gameclass();

newGame.getValues();

const clickBtn = document.querySelector('#buyClickers');
clickBtn.addEventListener("click", () => {
    newGame.buyClicker();
})

const multBtn = document.querySelector('#buyMultipliers');
multBtn.addEventListener("click", () => {
    newGame.buyMultiplier();
})

const donutBtn = document.querySelector('.donut');
donutBtn.addEventListener("click", () => {
    newGame.addToScore();
})

const stopBtn = document.querySelector('#stop');
stopBtn.addEventListener("click", () => {
    location.reload();
})

setInterval(() => {
    newGame._score = newGame._score + (newGame._clickers * newGame._clickPower) / 20;
    newGame.getValues();
    if(newGame._clickers >0){
    const numClickers = 1 - (newGame._clickers/10);
    const t3 = gsap.timeline({defaults: {duration: `${numClickers}`, repeat: -1}})
    t3.to('.donut' , {rotation: '+=360deg'})
    }
}, 50)