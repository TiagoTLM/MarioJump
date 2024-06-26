const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');
const finalScoreElement = document.querySelector('.final-score');
let score = 0;
let pipeInterval = 1500; // Intervalo inicial entre os canos em milissegundos (menor para mais frequência)
let pipeAnimationDuration = 2000; // Duração da animação dos canos em milissegundos

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);

    // Aumentar pontuação
    score += 100;
    scoreElement.textContent = `Score: ${score}`;

    // Aumentar dificuldade a cada 500 pontos
    if (score % 500 === 0) {
        increaseDifficulty();
    }
}

const startPipeAnimation = () => {
    pipe.style.display = 'block';
    pipe.style.animation = `pipe-animation ${pipeAnimationDuration / 1000}s linear`;

    // Reiniciar a animação após a duração atual do pipe
    setTimeout(() => {
        pipe.style.display = 'none';
        const randomDelay = Math.random() * pipeInterval + 500; // Intervalo aleatório baseado no pipeInterval
        setTimeout(() => {
            pipe.style.display = 'block';
            pipe.style.animation = `pipe-animation ${pipeAnimationDuration / 1000}s linear`;
            startPipeAnimation();
        }, randomDelay);
    }, pipeAnimationDuration); // Duração da animação do pipe
}

const increaseDifficulty = () => {
    pipeInterval = Math.max(800, pipeInterval - 200); // Reduzir o intervalo mínimo para 800ms
    console.log(`Increased difficulty: pipeInterval=${pipeInterval}`);
}

const checkCollision = () => {
    const pipePosicao = pipe.offsetLeft;
    const marioPosicao = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosicao <= 60 && pipePosicao > 0 && marioPosicao < 70) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosicao}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosicao}px`;

        mario.src = './images/gameOver.png';
        mario.style.width = '60px';

        clearInterval(loop);

        // Esconder a pontuação atual e mostrar a pontuação final
        scoreElement.style.display = 'none';
        finalScoreElement.textContent = `Game Over! Your final score: ${score}`;
        finalScoreElement.style.display = 'block';
    }
}

const loop = setInterval(checkCollision, 10);

document.addEventListener('keydown', jump);

// Iniciar a animação do cano
startPipeAnimation();
