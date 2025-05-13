// タイマー関連の変数
let timerInterval;
let timeLeft = 60;
const timerDisplay = document.querySelector('.timer-display');
const startTimerBtn = document.getElementById('startTimer');
const resetTimerBtn = document.getElementById('resetTimer');

// ルーレット関連の変数
let isSpinning = false;
let spinInterval;
const rouletteWheel = document.querySelector('.roulette-wheel');
const startRouletteBtn = document.getElementById('startRoulette');
const stopRouletteBtn = document.getElementById('stopRoulette');

// 参加者抽選関連の変数
const drawParticipantBtn = document.getElementById('drawParticipant');
const resultCells = document.querySelectorAll('.result-cell');
const participantChecks = document.querySelectorAll('.participant-check');
let currentSelectedCell = null;

// タイマー機能
function startTimer() {
    if (timerInterval) return;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            timeLeft = 60;
            timerDisplay.textContent = timeLeft;
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 60;
    timerDisplay.textContent = timeLeft;
}

// ルーレット機能
function startRoulette() {
    if (isSpinning) return;
    
    isSpinning = true;
    let rotation = 0;
    
    spinInterval = setInterval(() => {
        rotation += 10;
        rouletteWheel.style.transform = `rotate(${rotation}deg)`;
    }, 50);
}

function stopRoulette() {
    if (!isSpinning) return;
    
    clearInterval(spinInterval);
    isSpinning = false;
    
    // 0-99の乱数で当選範囲を決定
    const rand = Math.random() * 100;
    let section, minDeg, maxDeg;
    if (rand < 40) {
        section = 1; // お題①
        minDeg = 0;
        maxDeg = 143;
    } else if (rand < 80) {
        section = 2; // お題②
        minDeg = 144;
        maxDeg = 287;
    } else {
        section = 3; // お題③
        minDeg = 288;
        maxDeg = 359;
    }
    // 扇形内でランダムな角度
    const finalRotation = Math.floor(Math.random() * (maxDeg - minDeg + 1)) + minDeg;
    rouletteWheel.style.transform = `rotate(${finalRotation}deg)`;
    
    // 当たりのお題を表示
    const result = document.createElement('div');
    result.style.position = 'absolute';
    result.style.top = '50%';
    result.style.left = '50%';
    result.style.transform = 'translate(-50%, -50%)';
    result.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    result.style.color = 'white';
    result.style.padding = '1rem 2rem';
    result.style.borderRadius = '5px';
    result.style.fontSize = '2rem';
    result.style.zIndex = '3';
    result.textContent = `当たり：お題${section}`;
    
    const container = document.querySelector('.roulette-container');
    container.appendChild(result);
    
    // 3秒後に結果を消す
    setTimeout(() => {
        result.remove();
    }, 3000);
}

// 参加者抽選機能
function drawParticipant() {
    // 前回の選択をリセット
    if (currentSelectedCell) {
        currentSelectedCell.classList.remove('selected');
    }

    // チェックが入っていない行を取得
    const availableRows = Array.from(resultCells).filter((cell, index) => !participantChecks[index].checked);
    
    if (availableRows.length === 0) {
        alert('抽選可能な参加者がいません。');
        return;
    }

    // 2秒後に抽選結果を表示
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * availableRows.length);
        currentSelectedCell = availableRows[randomIndex];
        currentSelectedCell.classList.add('selected');
    }, 2000);
}

// イベントリスナーの設定
startTimerBtn.addEventListener('click', startTimer);
resetTimerBtn.addEventListener('click', resetTimer);
startRouletteBtn.addEventListener('click', startRoulette);
stopRouletteBtn.addEventListener('click', stopRoulette);
drawParticipantBtn.addEventListener('click', drawParticipant); 