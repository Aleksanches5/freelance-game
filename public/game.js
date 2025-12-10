// ======================================================
//  FREELANCE CHAT GAME — PART 1/3
//  UI, BASE ENGINE, MESSAGE RENDERING
// ======================================================

// Telegram WebApp init
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.expand();
    tg.ready();
}

// GLOBAL ELEMENTS
let app, chatBox, buttonBox, titleBox, avatarBox, nameBox, hintBox;

function autoScroll() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ===============================
// CREATE MAIN UI LAYOUT
// ===============================
function initUI() {
    document.body.innerHTML = "";
    document.body.style.margin = "0";
    document.body.style.background = "#d7d7dc";
    document.body.style.fontFamily = "'LCD 16x2 Display', monospace";

    app = document.createElement("div");
    app.style.maxWidth = "420px";
    app.style.margin = "0 auto";
    app.style.padding = "20px";
    app.style.display = "flex";
    app.style.flexDirection = "column";
    document.body.appendChild(app);

    // TITLE
    titleBox = document.createElement("h2");
    titleBox.style.textAlign = "center";
    titleBox.style.marginBottom = "8px";
    app.appendChild(titleBox);

    // AVATAR + NAME
    const header = document.createElement("div");
    header.style.textAlign = "center";
    header.style.marginBottom = "12px";

    avatarBox = document.createElement("div");
    avatarBox.style.fontSize = "48px";
    avatarBox.style.marginBottom = "4px";
    header.appendChild(avatarBox);

    nameBox = document.createElement("div");
    nameBox.style.fontSize = "16px";
    nameBox.style.fontWeight = "600";
    header.appendChild(nameBox);

    app.appendChild(header);

    // CHAT BOX
    chatBox = document.createElement("div");
    chatBox.style.background = "#eef0f5";
    chatBox.style.height = "320px";
    chatBox.style.borderRadius = "20px";
    chatBox.style.padding = "12px";
    chatBox.style.overflowY = "auto";
    chatBox.style.display = "flex";
    chatBox.style.flexDirection = "column";
    chatBox.style.gap = "8px";
    chatBox.style.boxShadow = "inset 0 0 6px rgba(0,0,0,0.1)";
    app.appendChild(chatBox);

    // HINT / ERROR
    hintBox = document.createElement("div");
    hintBox.style.minHeight = "20px";
    hintBox.style.marginTop = "8px";
    hintBox.style.fontSize = "13px";
    hintBox.style.color = "#c0392b";
    hintBox.style.textAlign = "center";
    app.appendChild(hintBox);

    // BUTTON AREA
    buttonBox = document.createElement("div");
    buttonBox.style.marginTop = "12px";
    buttonBox.style.display = "flex";
    buttonBox.style.flexDirection = "column";
    buttonBox.style.gap = "8px";
    app.appendChild(buttonBox);
}

// ===============================
// MESSAGE BUBBLES
// ===============================

function addMessage(text, from = "client") {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.width = "100%";

    const bubble = document.createElement("div");
    bubble.textContent = text;
    bubble.style.padding = "10px 14px";
    bubble.style.borderRadius = "16px";
    bubble.style.fontSize = "15px";
    bubble.style.maxWidth = "75%";
    bubble.style.lineHeight = "1.35";

    if (from === "client") {
        row.style.justifyContent = "flex-start";
        bubble.style.background = "#B0C8FF";
        bubble.style.border = "1px solid #8EA6D8";
    } else {
        row.style.justifyContent = "flex-end";
        bubble.style.background = "#A2E3B7";
        bubble.style.border = "1px solid #82C796";
    }

    row.appendChild(bubble);
    chatBox.appendChild(row);
    autoScroll();
}

// ===============================
// BUTTONS
// ===============================

function clearButtons() {
    buttonBox.innerHTML = "";
}

function renderButtons(options, callback) {
    clearButtons();

    options.forEach((label, idx) => {
        const btn = document.createElement("button");
        btn.textContent = label;
        btn.style.width = "100%";
        btn.style.padding = "12px";
        btn.style.borderRadius = "14px";
        btn.style.border = "none";
        btn.style.background = "#D9D9D9";
        btn.style.fontFamily = "'LCD 16x2 Display', monospace";
        btn.style.fontSize = "15px";
        btn.style.cursor = "pointer";

        btn.addEventListener("click", () => callback(idx));

        buttonBox.appendChild(btn);
    });
}

function disableButtons() {
    Array.from(buttonBox.querySelectorAll("button")).forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.6";
        btn.style.cursor = "default";
    });
}

// ===============================
// FINISH SCREEN (STAR ⭐ OR SKULL 💀)
// ===============================

function showFinishScreen(success, onRestart, onNext) {
    document.body.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.style.maxWidth = "420px";
    wrap.style.margin = "0 auto";
    wrap.style.padding = "32px 20px";
    wrap.style.textAlign = "center";
    document.body.appendChild(wrap);

    const icon = document.createElement("div");
    icon.style.fontSize = "80px";
    icon.style.marginBottom = "12px";
    icon.textContent = success ? "⭐" : "💀";
    wrap.appendChild(icon);

    const title = document.createElement("div");
    title.style.fontSize = "32px";
    title.style.fontWeight = "900";
    title.style.marginBottom = "20px";
    title.textContent = success ? "УСПЕХ!" : "ПРОВАЛ!";
    wrap.appendChild(title);

    const explanation = document.createElement("div");
    explanation.style.background = success ? "#D4F8D4" : "#FFD6D6";
    explanation.style.borderRadius = "14px";
    explanation.style.padding = "14px";
    explanation.style.fontSize = "15px";
    explanation.style.lineHeight = "1.4";
    explanation.style.marginBottom = "20px";

    explanation.innerHTML = success
        ? "✓ Клиент подходящий<br>✓ Вы верно оценили ситуацию<br>✓ Отличная работа!"
        : "✓ Клиент был проблемным<br>✓ Вы неправильно оценили риски<br>✓ Попробуйте ещё раз!";

    wrap.appendChild(explanation);

    // Restart button
    const retry = document.createElement("button");
    retry.textContent = "Пройти уровень заново 🔁";
    retry.style.display = "block";
    retry.style.width = "100%";
    retry.style.padding = "12px";
    retry.style.borderRadius = "14px";
    retry.style.border = "none";
    retry.style.background = "#D9D9D9";
    retry.style.fontFamily = "'LCD 16x2 Display', monospace";
    retry.style.fontSize = "15px";
    retry.style.marginBottom = "10px";
    retry.onclick = onRestart;
    wrap.appendChild(retry);

    // Next level button
    if (onNext) {
        const next = document.createElement("button");
        next.textContent = "Следующий уровень ▶️";
        next.style.display = "block";
        next.style.width = "100%";
        next.style.padding = "12px";
        next.style.borderRadius = "14px";
        next.style.border = "none";
        next.style.background = "#D9D9D9";
        next.style.fontFamily = "'LCD 16x2 Display', monospace";
        next.style.fontSize = "15px";
        next.onclick = onNext;
        wrap.appendChild(next);
    }
}
// ======================================================
//  FREELANCE CHAT GAME — PART 2/3
//  LEVEL DEFINITIONS (ALL 5 LEVELS)
// ======================================================

// Each step: 
// {
//    buttons: [ "вариант1", "вариант2", ...],
//    correct: index,
//    dialog: [ { from: "user"|"client", text: "..." }, ... ],
//    errors: [ "ошибка для варианта 0", null, "ошибка для варианта 2", ... ]
// }

const LEVELS = [

    // ============================
    //        LEVEL 1 — ЕЛЕНА
    // ============================
    {
        id: 1,
        name: "Елена",
        avatar: "👩‍💼",
        adequate: true,
        firstMsg: "Привет! Хочу заказать лендинг. Есть текст и структура, нужен дизайн + вёрстка.",

        steps: [
            {
                buttons: [
                    "Здравствуйте! Как будете оплачивать? 💳",
                    "Здравствуйте! Какой стиль вам ближе? 🎨",
                    "Здравствуйте! Какие сроки и бюджет? 📅💰"
                ],
                correct: 2,
                dialog: [
                    { from: "user", text: "Здравствуйте! Какие сроки и бюджет? 📅💰" },
                    { from: "client", text: "10 дней, оплата по этапам. Если всё пойдёт хорошо — продолжим работу. 🙂" }
                ],
                errors: [
                    "Рано обсуждать оплату — сначала нужны вводные. ⚠️",
                    "Стиль пока не важен — нужно уточнить сроки и бюджет. ⚠️",
                    null
                ]
            }
        ]
    },

    // ============================
    //        LEVEL 2 — ИГОРЬ
    // ============================
    {
        id: 2,
        name: "Игорь",
        avatar: "🧑‍💻",
        adequate: true,
        firstMsg: "Добрый день! Нужен сайт-портфолио. Есть фото и частичные тексты. Хочу за 3 дня и «чтоб вау».",

        steps: [
            {
                buttons: [
                    "Здравствуйте! Уточним объём работ, сроки и бюджет. ✍️",
                    "Здравствуйте! Сделаем всё за 3 дня, будет вау! 😅",
                    "Здравствуйте! Начнём с дизайна, тексты потом. ✏️"
                ],
                correct: 0,
                dialog: [
                    { from: "user", text: "Здравствуйте! Уточним объём работ, сроки и бюджет. ✍️" },
                    { from: "client", text: "Хмм… ладно, давай реалистичнее — неделя и по этапам. 😎" }
                ],
                errors: [
                    null,
                    "Нереальные обещания — прямой путь к срыву сроков. ⚠️",
                    "Нельзя начинать с дизайна без структуры. ⚠️"
                ]
            }
        ]
    },

    // ============================
    //        LEVEL 3 — АННА
    // ============================
    {
        id: 3,
        name: "Анна",
        avatar: "👩‍🎤",
        adequate: false,
        firstMsg: "Нужен интернет-магазин одежды. Срок — неделя. Интеграции обязательны. Бюджет минимальный.",

        steps: [
            {
                buttons: [
                    "Здравствуйте! Давайте обсудим интеграции и объём. 🧩",
                    "Здравствуйте! Сделаем всё за неделю! 😉",
                    "Здравствуйте! Возьмём шаблон, будет быстро. 🪛"
                ],
                correct: 0,
                dialog: [
                    { from: "user", text: "Здравствуйте! Давайте обсудим интеграции и объём. 🧩" },
                    { from: "client", text: "Объём большой, интеграции нужны ВСЕ, сроки менять не хочу. 😐" }
                ],
                errors: [
                    null,
                    "Нельзя обещать невозможное — это токсично. ❌",
                    "Шаблон не решает вопрос интеграций. 🔧"
                ]
            },
            {
                buttons: [
                    "Предлагаю MVP — главное сейчас, остальное позже. 📦",
                    "Ладно, постараемся влезть в сроки. 🤷‍♀️",
                    "Раз так, делайте тогда сами. 😬"
                ],
                correct: 0,
                dialog: [
                    { from: "user", text: "Предлагаю MVP — главное сейчас, остальное позже. 📦" },
                    { from: "client", text: "Нет. Хочу всё, как у крупных брендов, в мои сроки и бюджет. 😤" }
                ],
                errors: [
                    null,
                    "Нереалистично — нельзя так соглашаться. ⚠️",
                    "Пассивная агрессия не поможет. ⚠️"
                ]
            }
        ]
    },

    // ============================
    //        LEVEL 4 — МАКСИМ
    // ============================
    {
        id: 4,
        name: "Максим",
        avatar: "🧔",
        adequate: false,
        firstMsg: "Нужен лендинг. Я люблю всё контролировать — правки могу слать хоть ночью. Хочу идеально.",

        steps: [
            {
                buttons: [
                    "Здравствуйте! Договоримся о правках и рамках. 📝",
                    "Здравствуйте! Могу править хоть каждый час. 💪",
                    "Здравствуйте! Вы скажете нравится или нет — и всё. 🎲"
                ],
                correct: 0,
                dialog: [
                    { from: "user", text: "Здравствуйте! Договоримся о правках и рамках. 📝" },
                    { from: "client", text: "Мне рамки не нравятся. Я хочу менять всё в любой момент. ⚡️" }
                ],
                errors: [
                    null,
                    "Работа 24/7 = выгорание. 🔥",
                    "Без критериев — бесконечные правки. ♾️"
                ]
            },
            {
                buttons: [
                    "Ограничим время ответов и правок. ⏰",
                    "Подстроюсь под ваш ритм. 🙃",
                    "Давайте без правил. 💬"
                ],
                correct: 0,
                dialog: [
                    { from: "user", text: "Ограничим время ответов и правок. ⏰" },
                    { from: "client", text: "Если нужны ограничения — вы мне не подходите. Хочу, чтобы исполнитель был всегда на связи. 😠" }
                ],
                errors: [
                    null,
                    "Подстраиваться под хаос нельзя. ⚠️",
                    "Без правил будет хаос. ⚡️"
                ]
            }
        ]
    },

    // ============================
    //        LEVEL 5 — СЕРГЕЙ
    // ============================
    {
        id: 5,
        name: "Сергей",
        avatar: "🧑‍💼",
        adequate: true,
        firstMsg: "Запускаем курс. Нужен лендинг, email-цепочка и баннеры. Бюджет ограничен, но долгосрочно.",

        steps: [
            {
                buttons: [
                    "Здравствуйте! Определим приоритеты к запуску. 🎯",
                    "Здравствуйте! Сделаем всё сразу! 🔥",
                    "Здравствуйте! Я делаю только лендинг. 🙈"
                ],
                correct: 0,
                dialog: [
                    { from: "user", text: "Здравствуйте! Определим приоритеты к запуску. 🎯" },
                    { from: "client", text: "Лендинг и пара писем в первую очередь. Остальное позже. 🙂" }
                ],
                errors: [
                    null,
                    "Так можно сорвать сроки. ⚠️",
                    "Не стоит так резко отказываться. ✂️"
                ]
            },
            {
                buttons: [
                    "Фиксируем объём на первый спринт. 📚",
                    "Давайте без договорённостей. 🌪️",
                    "Будем обсуждать всё голосом. 🎙️"
                ],
                correct: 0,
                dialog: [
                    { from: "user", text: "Фиксируем объём на первый спринт. 📚" },
                    { from: "client", text: "Отлично, я за структурный подход. 🤝" }
                ],
                errors: [
                    null,
                    "Без фиксации объёма проект развалится. ⏳",
                    "Удобно, но легко забыть. ⚠️"
                ]
            },
            {
                buttons: [
                    "Пакет: лендинг + email-цепочка. 🧩",
                    "Делаю только лендинг. 😐",
                    "Давайте отложим всё. 😅"
                ],
                correct: 0,
                dialog: [
                    { from: "user", text: "Пакет: лендинг + email-цепочка. 🧩" },
                    { from: "client", text: "Отлично, так и сделаем. 🙌" }
                ],
                errors: [
                    null,
                    "Слишком узко для долгосрочного проекта. ⚠️",
                    "Отложить всё — значит сорвать старт. 🚫"
                ]
            }
        ]
    }
];
// ======================================================
//  FREELANCE CHAT GAME — PART 3/3
//  GAME LOGIC (STATE MACHINE + LEVEL FLOW)
// ======================================================

let currentLevel = 0;
let currentStep = 0;

// Start level
function startLevel(levelIndex) {
    currentLevel = levelIndex;
    currentStep = 0;

    const L = LEVELS[currentLevel];

    initUI();

    // Set header
    titleBox.textContent = `Уровень ${L.id}: ${L.name}`;
    avatarBox.textContent = L.avatar;
    nameBox.textContent = L.name;

    // Start message
    addMessage(L.firstMsg, "client");

    // Render step 0
    setTimeout(() => renderStep(), 500);
}

// Render one step of the level
function renderStep() {
    clearButtons();
    hintBox.textContent = "";

    const L = LEVELS[currentLevel];
    const step = L.steps[currentStep];

    // No step → time to pick adequate / not adequate
    if (!step) {
        return renderFinalDecision();
    }

    renderButtons(step.buttons, (choiceIndex) => {
        if (choiceIndex !== step.correct) {
            hintBox.textContent = step.errors[choiceIndex];
            return;
        }

        // Correct choice
        disableButtons();
        playDialog(step.dialog);
    });
}

// Play dialog sequence for one step
function playDialog(sequence) {
    let delay = 0;

    sequence.forEach((replica, i) => {
        setTimeout(() => {
            addMessage(replica.text, replica.from);
        }, delay);
        delay += 550;
    });

    // After dialog, move to next step
    setTimeout(() => {
        currentStep++;
        renderStep();
    }, delay + 300);
}

// Final decision buttons (adequate/not adequate)
function renderFinalDecision() {
    clearButtons();
    hintBox.textContent = "";

    renderButtons(
        ["Клиент адекватный ✅", "Клиент неадекватный ❌"],
        (choice) => {
            disableButtons();

            const L = LEVELS[currentLevel];
            const playerThinksAdequate = choice === 0;
            const correct = playerThinksAdequate === L.adequate;

            // Client reacts
            setTimeout(() => {
                addMessage(
                    playerThinksAdequate
                        ? "Отлично! Я готов работать с вами дальше. 🤝"
                        : "К сожалению, я не смогу продолжить работу. 😔",
                    "client"
                );
            }, 400);

            // Show finish screen
            setTimeout(() => {
                showFinishScreen(
                    correct,
                    () => startLevel(currentLevel),
                    currentLevel < LEVELS.length - 1
                        ? () => startLevel(currentLevel + 1)
                        : null
                );
            }, 1200);
        }
    );
}

// Start the whole game
window.addEventListener("DOMContentLoaded", () => {
    startLevel(0);
});
