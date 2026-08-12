// ==========================================
// 🐹 КИБЕР-ХОМЯК: ОСНОВНЫЕ ПЕРЕМЕННЫЕ ИГРЫ
// ==========================================
let score = 0;          // Текущий баланс монет
let clickPower = 1;     // Сколько монет дают за один клик
let cps = 0;            // Доход в секунду

let upgradeCost1 = 10;
let upgradeCost2 = 100;
let upgradeCost3 = 500;

// Находим элементы на странице
const scoreEl = document.getElementById('score');
const cpsEl = document.getElementById('cps');

const upgradeCost1El = document.getElementById('upgrade-cost');
const upgradeCost2El = document.getElementById('upgrade-cost-2');
const upgradeCost3El = document.getElementById('upgrade-cost-3');

const hamsterBtn = document.getElementById('hamster');
const buyUpgrade1Btn = document.getElementById('buy-upgrade');
const buyUpgrade2Btn = document.getElementById('buy-upgrade-2');
const buyUpgrade3Btn = document.getElementById('buy-upgrade-3');

// ==========================================
// 💾 ФУНКЦИИ ДЛЯ РАБОТЫ С ПАМЯТЬЮ (SAVE / LOAD)
// ==========================================
function saveGame() {
    localStorage.setItem('cyber_score', score);
    localStorage.setItem('cyber_clickPower', clickPower);
    localStorage.setItem('cyber_cps', cps);
    localStorage.setItem('cyber_cost1', upgradeCost1);
    localStorage.setItem('cyber_cost2', upgradeCost2);
    localStorage.setItem('cyber_cost3', upgradeCost3);
}

function loadGame() {
    if (localStorage.getItem('cyber_score') !== null) {
        score = parseInt(localStorage.getItem('cyber_score'));
        clickPower = parseInt(localStorage.getItem('cyber_clickPower'));
        cps = parseInt(localStorage.getItem('cyber_cps'));
        upgradeCost1 = parseInt(localStorage.getItem('cyber_cost1'));
        upgradeCost2 = parseInt(localStorage.getItem('cyber_cost2'));
        upgradeCost3 = parseInt(localStorage.getItem('cyber_cost3'));
    }
}

// ==========================================
// 🕹️ ЛОГИКА КЛИКОВ И МАГАЗИНА
// ==========================================

// 1. Клик по хомяку с эффектом вылетающих цифр
if (hamsterBtn) {
    hamsterBtn.addEventListener('click', (event) => {
        score += clickPower;
        updateUI();
        saveGame();

        const floatNum = document.createElement('div');
        floatNum.classList.add('floating-number');
        floatNum.textContent = `+${clickPower}`;

        const x = event.clientX;
        const y = event.clientY;

        floatNum.style.left = `${x - 15}px`;
        floatNum.style.top = `${y - 20}px`;

        document.body.appendChild(floatNum);

        setTimeout(() => {
            floatNum.remove();
        }, 800);
    });
}

// 2. Покупка улучшения 1 (Кибер-Лапка)
if (buyUpgrade1Btn) {
    buyUpgrade1Btn.addEventListener('click', () => {
        if (score >= upgradeCost1) {
            score -= upgradeCost1;
            cps += 1;
            upgradeCost1 = Math.round(upgradeCost1 * 1.5); 
            updateUI();
            saveGame();
        } else {
            alert('Не хватает кибер-монет!');
        }
    });
}

// 3. Покупка улучшения 2 (Шедеврум-Бот)
if (buyUpgrade2Btn) {
    buyUpgrade2Btn.addEventListener('click', () => {
        if (score >= upgradeCost2) {
            score -= upgradeCost2;
            cps += 5; 
            upgradeCost2 = Math.round(upgradeCost2 * 1.6); 
            updateUI();
            saveGame();
        } else {
            alert('Не хватает кибер-монет!');
        }
    });
}

// 4. Покупка улучшения 3 (Квантовый Сервер)
if (buyUpgrade3Btn) {
    buyUpgrade3Btn.addEventListener('click', () => {
        if (score >= upgradeCost3) {
            score -= upgradeCost3;
            cps += 25; 
            clickPower += 2; 
            upgradeCost3 = Math.round(upgradeCost3 * 1.7); 
            updateUI();
            saveGame();
        } else {
            alert('Не хватает кибер-монет!');
        }
    });
}

// 5. Функция обновления текста на экране
function updateUI() {
    if (scoreEl) scoreEl.textContent = score;
    if (cpsEl) cpsEl.textContent = cps;
    if (upgradeCost1El) upgradeCost1El.textContent = upgradeCost1;
    if (upgradeCost2El) upgradeCost2El.textContent = upgradeCost2;
    if (upgradeCost3El) upgradeCost3El.textContent = upgradeCost3;
}

// 6. Таймер: начисление пассивного дохода каждую секунду
setInterval(() => {
    if (cps > 0) {
        score += cps;
        updateUI();
        saveGame();
    }
}, 1000);

// ==========================================
// 🏆 ЛОГИКА СИСТЕМЫ РЕЙТИНГА
// ==========================================
const leaderboardBtn = document.getElementById('leaderboard-button');
const leaderboardModal = document.getElementById('leaderboard-modal');
const closeLeaderboardBtn = document.getElementById('close-leaderboard');
const leaderboardList = document.getElementById('leaderboard-list');

let bots = [
    { name: "⚡ Cyber_Anonym", score: 2500 },
    { name: "🤖 Neo_Hamster", score: 1200 },
    { name: "👾 Matrix_Rat", score: 300 },
    { name: "💾 Bug_Hunter", score: 50 }
];

function renderLeaderboard() {
    if (!leaderboardList) return;
    leaderboardList.innerHTML = "";
    let allPlayers = [
        { name: "😎 Вы (Макс)", score: score, isPlayer: true },
        ...bots
    ];
    allPlayers.sort((a, b) => b.score - a.score);
    allPlayers.forEach((player, index) => {
        const item = document.createElement('div');
        item.classList.add('leaderboard-item');
        if (player.isPlayer) item.classList.add('player');
        let placeEmoji = `${index + 1}.`;
        if (index === 0) placeEmoji = "🥇";
        if (index === 1) placeEmoji = "🥈";
        if (index === 2) placeEmoji = "🥉";
        item.innerHTML = `
            <span class="leaderboard-name">${placeEmoji} ${player.name}</span>
            <span class="leaderboard-score">${player.score} 🪙</span>
        `;
        leaderboardList.appendChild(item);
    });
}

if (leaderboardBtn) {
    leaderboardBtn.addEventListener('click', () => {
        renderLeaderboard();
        if (leaderboardModal) leaderboardModal.classList.add('active');
    });
}

if (closeLeaderboardBtn) {
    closeLeaderboardBtn.addEventListener('click', () => {
        if (leaderboardModal) leaderboardModal.classList.remove('active');
    });
}

setInterval(() => {
    bots.forEach(bot => { bot.score += Math.floor(Math.random() * 15) + 5; });
    if (leaderboardModal && leaderboardModal.classList.contains('active')) {
        renderLeaderboard();
    }
}, 5000);

// ==========================================
// 🎬 НАСТРОЙКА НАСТОЯЩЕЙ РЕКЛАМЫ ЯНДЕКСА
// ==========================================
const AD_BLOCK_ID = 'R-A-19746878-1'; 
const adButton = document.getElementById('ad-button');

if (adButton) {
    adButton.addEventListener('click', () => {
        window.yaContextCb.push(() => {
            Ya.Context.AdvManager.render({
                blockId: AD_BLOCK_ID,
                type: "fullscreen",
                platform: "touch",
                onClose: () => {
                    score += 50; 
                    updateUI();
                    saveGame();
                    alert('Спасибо за просмотр! Вам начислено +50 монет! 🪙');
                },
                onError: (error) => {
                    console.log('Ошибка загрузки рекламы:', error);
                    score += 50;
                    updateUI();
                    saveGame();
                    alert('Тестовая награда! +50 монет! 🪙');
                }
            });
        });
    });
}

// ==========================================
// 🚀 ЗАПУСК ИГРЫ И ЗАГРУЗКА ПАМЯТИ
// ==========================================
loadGame();  
updateUI();  
