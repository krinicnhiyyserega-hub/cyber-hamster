// Переменные для игры (задаем стартовые значения по умолчанию)
let score = 0;          
let clickPower = 1;     
let cps = 0;            

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

// Функция сохранения прогресса
function saveGame() {
    localStorage.setItem('cyber_score', score);
    localStorage.setItem('cyber_clickPower', clickPower);
    localStorage.setItem('cyber_cps', cps);
    localStorage.setItem('cyber_cost1', upgradeCost1);
    localStorage.setItem('cyber_cost2', upgradeCost2);
    localStorage.setItem('cyber_cost3', upgradeCost3);
}

// Функция загрузки прогресса при старте игры
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
// 🕹️ ЛОГИКА ИГРЫ
// ==========================================

// 1. Клик по хомяку с эффектом вылетающих цифр
hamsterBtn.addEventListener('click', (event) => {
    score += clickPower;
    updateUI();
    saveGame(); // Сохраняем прогресс после каждого клика

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

// 2. Покупка улучшения 1 (Кибер-Лапка)
buyUpgrade1Btn.addEventListener('click', () => {
    if (score >= upgradeCost1) {
        score -= upgradeCost1;
        cps += 1;
        upgradeCost1 = Math.round(upgradeCost1 * 1.5); 
        updateUI();
        saveGame(); // Сохраняем после покупки
    } else {
        alert('Не хватает кибер-монет!');
    }
});

// 3. Покупка улучшения 2 (Шедеврум-Бот)
buyUpgrade2Btn.addEventListener('click', () => {
    if (score >= upgradeCost2) {
        score -= upgradeCost2;
        cps += 5; 
        upgradeCost2 = Math.round(upgradeCost2 * 1.6); 
        updateUI();
        saveGame(); // Сохраняем после покупки
    } else {
        alert('Не хватает кибер-монет!');
    }
});

// 4. Покупка улучшения 3 (Квантовый Сервер)
buyUpgrade3Btn.addEventListener('click', () => {
    if (score >= upgradeCost3) {
        score -= upgradeCost3;
        cps += 25; 
        clickPower += 2; 
        upgradeCost3 = Math.round(upgradeCost3 * 1.7); 
        updateUI();
        saveGame(); // Сохраняем после покупки
    } else {
        alert('Не хватает кибер-монет!');
    }
});

// 5. Функция обновления текста на экране
function updateUI() {
    scoreEl.textContent = score;
    cpsEl.textContent = cps;
    upgradeCost1El.textContent = upgradeCost1;
    upgradeCost2El.textContent = upgradeCost2;
    upgradeCost3El.textContent = upgradeCost3;
}

// 6. Таймер: начисление пассивного дохода каждую секунду
setInterval(() => {
    if (cps > 0) {
        score += cps;
        updateUI();
        saveGame(); // Сохраняем пассивный доход каждую секунду
    }
}, 1000);

// ==========================================
// 🚀 ЗАПУСК ИГРЫ
// ==========================================
loadGame();  // Первым делом загружаем старые сохранения, если они есть
updateUI();  // Показываем актуальные цифры на экране
// ==========================================
// 🏆 ЛОГИКА СИСТЕМЫ РЕЙТИНГА
// ==========================================

// Находим элементы рейтинга
const leaderboardBtn = document.getElementById('leaderboard-button');
const leaderboardModal = document.getElementById('leaderboard-modal');
const closeLeaderboardBtn = document.getElementById('close-leaderboard');
const leaderboardList = document.getElementById('leaderboard-list');

// Список вымышленных конкурентов (базовые значения)
let bots = [
    { name: "⚡ Cyber_Anonym", score: 2500 },
    { name: "🤖 Neo_Hamster", score: 1200 },
    { name: "👾 Matrix_Rat", score: 300 },
    { name: "💾 Bug_Hunter", score: 50 }
];

// Функция обновления и отрисовки рейтинга
function renderLeaderboard() {
    // Очищаем старый список
    leaderboardList.innerHTML = "";

    // Создаем единый список игроков, добавляя туда Самого Пользователя
    let allPlayers = [
        { name: "😎 Вы (Макс)", score: score, isPlayer: true },
        ...bots
    ];

    // Сортируем игроков от большего баланса к меньшему
    allPlayers.sort((a, b) => b.score - a.score);

    // Выводим каждого игрока на экран
    allPlayers.forEach((player, index) => {
        const item = document.createElement('div');
        item.classList.add('leaderboard-item');
        
        // Подсвечиваем строку, если это сам игрок
        if (player.isPlayer) {
            item.classList.add('player');
        }

        // Красивые смайлики для первых трех мест
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

// Открытие окна рейтинга
leaderboardBtn.addEventListener('click', () => {
    renderLeaderboard();
    leaderboardModal.classList.add('active');
});

// Закрытие окна рейтинга
closeLeaderboardBtn.addEventListener('click', () => {
    leaderboardModal.classList.remove('active');
});

// Добавим немного азарта: боты тоже пассивно "копят" монеты раз в 5 секунд!
setInterval(() => {
    bots.forEach(bot => {
        bot.score += Math.floor(Math.random() * 15) + 5; // Прибавляем случайные 5-20 монет
    });
    // Если окно рейтинга открыто в этот момент — перерисовываем его
    if (leaderboardModal.classList.contains('active')) {
        renderLeaderboard();
    }
}, 5000);
// ==========================================
// 🎬 ПОДКЛЮЧЕНИЕ НАСТОЯЩЕЙ РЕКЛАМЫ ИЗ РСЯ
// ==========================================

// Твой личный ID из личного кабинета Яндекса
const AD_BLOCK_ID = 'R-A-19746878-1'; 

const adButton = document.getElementById('ad-button');
const adModal = document.getElementById('ad-modal');
const closeAdReal = document.getElementById('close-ad-real');

// Нажатие на кнопку рекламы
if (adButton) {
    adButton.addEventListener('click', () => {
        adModal.classList.add('active');
        
        // Прячем кнопку завершения, пока реклама загружается или идет
        if (closeAdReal) closeAdReal.style.display = 'none'; 

        // Вызываем показ полноэкранной рекламы Яндекса
        window.yaContextCb.push(() => {
            Ya.Context.AdvManager.render({
                blockId: AD_BLOCK_ID,
                type: "fullscreen",
                platform: "touch",
                onRender: () => {
                    // Яндекс успешно показал рекламу — включаем кнопку награды
                    if (closeAdReal) closeAdReal.style.display = 'block'; 
                }
            });
        });
    });
}

// Нажатие на кнопку «Забрать монеты» после просмотра
if (closeAdReal) {
    closeAdReal.addEventListener('click', () => {
        adModal.classList.remove('active');
        
        // Начисляем заслуженную награду
        score += 50; 
        updateUI();
        saveGame();
    });
}

