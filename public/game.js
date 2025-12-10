// ===============================
//  FREELANCING MINI-GAME JS
// ===============================

// Telegram WebApp integration
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.expand();
    tg.ready();
}

// ===============================
//  GAME DATA
// ===============================

const LEVELS = [
    {
        id: 1,
        name: "Елена",
        avatar: "👩‍💼",
        first: "Привет! Хочу заказать лендинг. Есть текст и структура, нужен дизайн + вёрстка.",

        steps: [
            {
                buttons: [
                    "Здраствуйте! Как будете оплачивать? 💳",
                    "Здраствуйте! Какой стиль вам ближе? 🎨",
                    "Здраствуйте! Какие сроки и бюджет? 📅💰"
                ],
                correct: 2,
                dialog: [
                    { from: "user", text: "Здраствуйте! Какие сроки и бюджет? 📅💰" },
                    { from: "client", text: "10 дней, оплата по этапам. Если всё пойдёт хорошо — продолжим работу. 🙂" }
                ],
                errors: [
                    "Рано обсуждать оплату — сначала нужны вводные. ⚠️",
                    "Стиль подберём позже, пока важнее сроки и бюджет. ⚠️",
                    null
                ]
            }
        ],
        adequate: true
    },

    {
        id: 2,
        name: "Игорь",
        avatar: "🧑‍💻",
        first: "Добрый день! Нужен сайт-портфолио, есть фото и частичные тексты. Хочу за 3 дня и «чтоб вау».",

        steps: [
            {
                buttons: [
                    "Здраствуйте! Уточним объём работ, сроки и бюджет. ✍️",
                    "Здраствуйте! За 3 дня сделаем всё, будет вау! 😅",
                    "Здраствуйте! Начнём с дизайна, тексты потом. ✏️"
                ],
                correct: 0,
                dialog: [
                    { from: "user", text: "Здраствуйте! Уточним объём работ, сроки и бюджет. ✍️" },
                    { from: "client", text: "Хмм… ладно, давай реалистичнее — неделя и по этапам. 😎" }
                ],
                errors: [
                    null,
                    "Нереальные ожидания → срыв сроков. ⚠️",
                    "Сначала структура и объём, не дизайн. ⚠️"
                ]
            }
        ],
        adequate: true
    },

    {
        id: 3,
        name: "Анна",
        avatar: "👩‍🎤",
        first: "Нужен интернет-магазин одежды. Ассортимент огромный, интеграции обязательны. Бюджет минимальный, срок — неделя.",

        steps: [
            {
                buttons: [
                    "Здраствуйте! Давайте разберёмся с объёмом и интеграциями. 🧩",
                    "Здраствуйте! Сделаем всё за неделю, не переживайте. 😉",
                    "Здраствуйте! Возьмём шаблон и быстро соберём. 🪛"
                ],
                correct: 0,
                dialog: [
                    { from: "user", text: "Здраствуйте! Давайте разберёмся с объёмом и интеграциями. 🧩" },
                    { from: "client", text: "Объём большой, интеграции нужны все, сроки менять не хочу. 😐" }
                ],
                errors: [
                    null,
                    "Обещать невозможное — прямой путь в конфликт. ⚠️",
                    "Шаблон не решает вопросы интеграций. 🔧"
                ]
            },

            {
                buttons: [
                    "Предлагаю MVP — минимум сейчас, остальное позже. 📦",
                    "Попробуем сделать максимум за неделю. 🤷‍♀️",
                    "Если всё так срочно, делайте сами. 😬"
                ],
                correct: 0,
                dialog: [
                    { from: "user", text: "Предлагаю MVP — минимум сейчас, остальное позже. 📦" },
                    { from: "client", text: "Нет. Хочу как у крупных брендов, но в мои сроки и бюджет. 😤" }
                ],
                errors: [
                    null,
                    "Снова соглашаться на невыполнимое нельзя. ❌",
                    "Пассивная агрессия не поможет. ⚠️"
                ]
            }
        ],
        adequate: false
    },

    {
        id: 4,
        name: "Максим",
        avatar: "🧔",
        first: "Нужен лендинг. Я люблю всё контролировать — правки могу слать хоть ночью, мне важно «идеально».",

        steps: [
            {
                buttons: [
                    "Здраствуйте! Договоримся о правках и рамках. 📝",
                    "Здраствуйте! Могу править хоть каждый час. 💪",
                    "Здраствуйте! Вы скажете нравится или нет, и всё. 🎲"
                ],
                correct: 0,
                dialog: [
                    { from: "user", text: "Здраствуйте! Договоримся о правках и рамках. 📝" },
                    { from: "client", text: "Мне рамки не нравятся. Я хочу менять всё в любой момент. ⚡️" }
                ],
                errors: [
                    null,
                    "Работа 24/7 приведёт к выгоранию. 🔥",
                    "Без критериев «нравится / не нравится» процесс бесконечный. ♾️"
                ]
            },

            {
                buttons: [
                    "Ограничим правки и время ответов, иначе будет хаос. ⏰",
                    "Подстроюсь под ваш график. 🙃",
                    "Обойдёмся без правил. 💬"
                ],
                correct: 0,
                dialog: [
                    { from: "user", text: "Ограничим правки и время ответов, иначе будет хаос. ⏰" },
                    { from: "client", text: "Если нужны ограничения — вы мне не подходите. Хочу, чтобы исполнитель был всегда на связи. 😠" }
                ],
                errors: [
                    null,
                    "Подстраиваться под хаос нельзя. ⚠️",
                    "Правил нет → хаос. ⚡️"
                ]
            }
        ],
        adequate: false
    },

    {
        id: 5,
        name: "Сергей",
        avatar: "🧑‍💼",
        first: "Запускаем курс. Нужен лендинг, email-цепочка и баннеры. Бюджет ограничен, хочу долгосрочное сотрудничество.",

        steps: [
            {
                buttons: [
                    "Здраствуйте! Определим приоритеты: что нужно к запуску? 🎯",
                    "Здраствуйте! Сделаем всё сразу. 🔥",
                    "Здраствуйте! Я делаю только лендинг. 🙈"
                ],
                correct: 0,
                dialog: [
                    { from: "user", text: "Определим приоритеты: что нужно к запуску? 🎯" },
                    { from: "client", text: "Лендинг и пара писем в первую очередь. Остальное позже. 🙂" }
                ],
                errors: [
                    null,
                    "Так можно сорвать сроки. ⚠️",
                    "Важно обсуждать приоритеты, а не сразу отрезать задачи. ✂️"
                ]
            },

            {
                buttons: [
                    "Фиксируем объём на первый спринт. 📚",
                    "Давайте без договорённостей. 🌪️",
                    "Будем всё обсуждать голосом. 🎙️"
                ],
                correct: 0,
                dialog: [
                    { from: "user", text: "Фиксируем объём на первый спринт. 📚" },
                    { from: "client", text: "Отлично, я за структурный подход. 🤝" }
                ],
                errors: [
                    null,
                    "Без фиксации объёма проект растянется. ⏳",
                    "Голосом удобно, но без фиксации легко всё забыть. ⚠️"
                ]
            },

            {
                buttons: [
                    "Пакет: лендинг + базовая email-цепочка. Баннеры позже. 🧩",
                    "Делаю только лендинг. 😐",
                    "Отложим всё до продаж. 😅"
                ],
                correct: 0,
                dialog: [
                    { from: "user", text: "Пакет: лендинг + email-цепочка. 🧩" },
                    { from: "client", text: "Отлично, так и сделаем. 🙌" }
                ],
                errors: [
                    null,
                    "Резко отрезать задачи — не лучшая стратегия. ⚠️",
                    "Если всё отложить — старт сорвётся. 🚫"
                ]
            }
        ],
        adequate: true
    }
];

// ===============================
//  UI ELEMENTS
// ===============================

let chatBox, btnBox, titleEl, avatarEl, nameEl, hintEl;

function initUI() {
    document.body.innerHTML = "";
    document.body.style.margin = "0";
    document.body.style.fontFamily = "system-ui, sans-serif";

    const app = document.createElement("div");
    app.style.maxWidth = "420px";
    app.style.margin = "0 auto";
    app.style.padding = "20px";
    document.body.appendChild(app);

    titleEl = document.createElement("h2");
    titleEl.style.textAlign = "center";
    app.appendChild(titleEl);

    const av = document.createElement("div");
    av.style.textAlign = "center";
    avatarEl = document.createElement("div");
    avatarEl.style.fontSize = "48px";
    av.appendChild(avatarEl);
    nameEl = document.createElement("div");
    nameEl.style.marginTop = "4px";
    nameEl.style.fontWeight = "600";
    av.appendChild(nameEl);
    app.appendChild(av);

    chatBox = document.createElement("div");
    chatBox.style.background = "#eef0f5";
    chatBox.style.height = "280px";
    chatBox.style.borderRadius = "16px";
    chatBox.style.padding = "12px";
    chatBox.style.overflowY = "auto";
    chatBox.style.marginTop = "12px";
    app.appendChild(chatBox);

    hintEl = document.createElement("div");
    hintEl.style.color = "#c0392b";
    hintEl.style.minHeight = "20px";
    hintEl.style.margin = "6px";
    app.appendChild(hintEl);

    btnBox = document.createElement("div");
    btnBox.style.marginTop = "12px";
    app.appendChild(btnBox);
}

function addMsg(text, from) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.marginBottom = "6px";
    row.style.justifyContent = from === "user" ? "flex-end" : "flex-start";

    const msg = document.createElement("div");
    msg.style.padding = "8px 12px";
    msg.style.borderRadius = "14px";
    msg.style.maxWidth = "75%";
    msg.style.fontSize = "14px";

    if (from === "client") {
        msg.style.background = "#cde3ff";
        msg.style.border = "1px solid #99b9ff";
    } else {
        msg.style.background = "#c8f7c5";
        msg.style.border = "1px solid #9adf90";
    }

    msg.textContent = text;
    row.appendChild(msg);
    chatBox.appendChild(row);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function buttonList(buttons, onSelect) {
    btnBox.innerHTML = "";
    buttons.forEach((label, i) => {
        const btn = document.createElement("button");
        btn.textContent = label;
        btn.style.width = "100%";
        btn.style.marginBottom = "6px";
        btn.style.padding = "10px";
        btn.style.borderRadius = "12px";
        btn.style.border = "2px solid #000";
        btn.style.background = "#fff";
        btn.onclick = () => onSelect(i);
        btnBox.appendChild(btn);
    });
}

// ===============================
//  GAME LOGIC
// ===============================

let levelIndex = 0;
let stepIndex = 0;

function startLevel(i) {
    levelIndex = i;
    stepIndex = 0;

    const L = LEVELS[i];
    titleEl.textContent = `Уровень ${L.id}: ${L.name}`;
    avatarEl.textContent = L.avatar;
    nameEl.textContent = L.name;

    chatBox.innerHTML = "";
    addMsg(L.first, "client");

    renderStep();
}

function renderStep() {
    const L = LEVELS[levelIndex];
    const step = L.steps[stepIndex];
    if (!step) return finalChoice();

    hintEl.textContent = "";

    buttonList(step.buttons, (chosenIndex) => {
        if (chosenIndex !== step.correct) {
            hintEl.textContent = step.errors[chosenIndex];
            return;
        }

        step.dialog.forEach((rep, i) =>
            setTimeout(
                () => addMsg(rep.text, rep.from),
                i * 500
            )
        );

        stepIndex++;
        setTimeout(renderStep, step.dialog.length * 500 + 400);
    });
}

function finalChoice() {
    buttonList(
        ["Клиент адекватный ✅", "Клиент неадекватный ❌"],
        (choice) => {
            const L = LEVELS[levelIndex];
            const player = choice === 0;
            const correct = player === L.adequate;

            chatBox.innerHTML = "";
            addMsg(
                player
                    ? "Считаю клиента адекватным. 🙂"
                    : "Считаю клиента неадекватным. 🚪",
                "user"
            );

            setTimeout(() => showFinal(correct), 700);
        }
    );
}

function showFinal(success) {
    document.body.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.style.maxWidth = "420px";
    wrap.style.margin = "0 auto";
    wrap.style.padding = "40px 20px";
    wrap.style.textAlign = "center";
    document.body.appendChild(wrap);

    const title = document.createElement("div");
    title.style.fontSize = "38px";
    title.style.fontWeight = "900";
    title.style.marginBottom = "20px";
    title.textContent = success ? "УСПЕХ!" : "ПРОВАЛ!";
    wrap.appendChild(title);

    const btn = document.createElement("button");
    btn.style.padding = "14px 20px";
    btn.style.fontSize = "16px";
    btn.style.borderRadius = "12px";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.textContent =
        levelIndex < LEVELS.length - 1
            ? "Следующий уровень ▶️"
            : "Сыграть снова 🔁";
    btn.onclick = () => {
        initUI();
        startLevel(
            levelIndex < LEVELS.length - 1 ? levelIndex + 1 : 0
        );
    };
    wrap.appendChild(btn);
}

// ===============================
//  START
// ===============================

initUI();
startLevel(0);
