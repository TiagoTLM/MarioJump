/*Teste de versionamento*/

const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {

    const pipePosicao = pipe.offsetLeft;
    const marioPosicao = +window.getComputedStyle(mario).bottom.replace('px', '');
    /*console.log(pipePosicao)*/
    if (pipePosicao <= 60 && pipePosicao > 0 && marioPosicao < 70) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosicao}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosicao}px`;

        mario.src = './images/gameOver.png';
        mario.style.width = '60px'
        /*mario.style.marginLeft = '50px'*/

        clearInterval(loop);
    }

}, 10);

document.addEventListener('keydown', jump);