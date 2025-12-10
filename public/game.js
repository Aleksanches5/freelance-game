// =======================================================
//  FREELANCER MINI GAME — ПОЛНЫЙ ФИНАЛЬНЫЙ ФАЙЛ
//  Все правки учтены
// =======================================================

// --- Telegram WebApp интеграция ---
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.expand();
    tg.ready();
}

// =======================================================
//  ДАННЫЕ ВСЕХ 5 УРОВНЕЙ
// =======================================================

const LEVELS = [
    // LEVEL 1 -----------------------------------------------------
    {
        id: 1,
        title: "Уровень 1: Елена",
        clientName: "Елена",
        avatarEmoji: "👩‍💼",
        firstMessage:
            "Привет! Хочу заказать лендинг. Есть текст и структура, нужен дизайн + вёрстка.",
        clientIsAdequate: true,

        steps: [
            {
                kind: "choice",
                buttons: [
                    "Здравствуйте! Как вы будете оплачивать? 💳",
                    "Здравствуйте! Какой стиль вам больше всего подходит? 🎨",
                    "Здравствуйте! Какие примерно сроки и бюджет? 📅💰",
                ],
                errors: [
                    "Рановато говорить про оплату — сначала нужно понять задачу и объём. ⚠️",
                    "Стиль обсудим позже, а пока важно понять сроки и бюджет. ⚠️",
                    null,
                ],
                dialog: [
                    { from: "user", text: "Здравствуйте! Какие примерно сроки и бюджет? 📅💰" },
                    {
                        from: "client",
                        text: "10 дней, оплата по этапам. Если всё ок — буду работать с тобой дальше. 🙂",
                    },
                ],
            },
        ],

        finalSuccess: "Отлично, работа выглядит понятной — готов двигаться дальше! 🤝",
        finalFail: "Кажется, ожидания не совпадают. Не смогу продолжить работу. 🚪",

        successBullets: [
            "Сначала уточнил(а) сроки и бюджет. 🎯",
            "Не перепрыгнул(а) сразу к оплате или стилю. 🧠",
            "Сформировал(а) рабочие ожидания по проекту. 🤝",
        ],
        failBullets: [
            "Фокус на деталях вместо общей картинки. 🧩",
            "Сложнее оценить риски и объём работ. ⚠️",
            "Клиенту важна уверенность, что ты понимаешь задачу. 💬",
        ],
    },

    // LEVEL 2 -----------------------------------------------------
    {
        id: 2,
        title: "Уровень 2: Игорь",
        clientName: "Игорь",
        avatarEmoji: "🧑‍💻",
        firstMessage:
            "Добрый день! Нужен сайт-портфолио. Фото есть, тексты частично, хочу за 3 дня и «чтоб вау».",
        clientIsAdequate: true,

        steps: [
            {
                kind: "choice",
                buttons: [
                    "Давайте уточним объём работ, сроки и бюджет — похоже, задач много. ✍️",
                    "За 3 дня «вау» не получится, давайте просто быстро что-нибудь соберём. 😅",
                    "Давайте начнём с дизайна, а тексты потом придумаем. ✏️",
                ],
                errors: [
                    null,
                    "Если сразу соглашаться на заведомо нереальные ожидания, всё закончится выгоранием. 🔥",
                    "Игнорировать контент и структуру — риск получить «красиво, но бессмысленно». ⚠️",
                ],
                dialog: [
                    {
                        from: "user",
                        text: "Давайте уточним объём работ, сроки и бюджет — похоже, задач много. ✍️",
                    },
                    {
                        from: "client",
                        text: "Окей, давай реалистичнее — неделя и по этапам. Главное, чтобы смотрелось круто. 😎",
                    },
                ],
            },
        ],

        finalSuccess: "Хорошо, давайте утвердим этапы и начнём работу. 🚀",
        finalFail:
            "Без согласованных сроков и структуры я не смогу качественно выполнить задачу. 🚪",

        successBullets: [
            "Помог(ла) клиенту перейти от фантазий к реалистичным срокам. 🕒",
            "Сохранил(а) фокус на структуре и объёме работ. 🧱",
            "Не пообещал(а) невозможное ради «вау-эффекта». 💡",
        ],
        failBullets: [
            "Соглашение на нереальные ожидания ведёт к срывам сроков. ⏰",
            "Отсутствие чётких рамок по объёму и бюджету — путь к конфликтам. ⚠️",
            "Клиенту нужна экспертность, а не притворное всемогущества. 🎭",
        ],
    },

    // LEVEL 3 -----------------------------------------------------
    {
        id: 3,
        title: "Уровень 3: Анна",
        clientName: "Анна",
        avatarEmoji: "👩‍🎤",
        firstMessage:
            "Привет! Нужен интернет-магазин одежды. Интеграции, большой каталог, маленький бюджет и запуск за неделю.",
        clientIsAdequate: false,

        steps: [
            {
                kind: "choice",
                buttons: [
                    "Давайте сначала разберёмся с объёмом и интеграциями. 🧩",
                    "Сделаем всё, уложимся за неделю. 😉",
                    "Давайте возьмём шаблон и потом доделаем. 🪛",
                ],
                errors: [
                    null,
                    "Обещать всё и сразу — путь к выгоранию. ⚠️",
                    "Шаблон не решает задачу сложного магазина. 🧱",
                ],
                dialog: [
                    { from: "user", text: "Давайте сначала разберёмся с объёмом и интеграциями. 🧩" },
                    {
                        from: "client",
                        text: "Хочу всё как у больших брендов, но в мой бюджет и за неделю!",
                    },
                ],
            },

            {
                kind: "choice",
                buttons: [
                    "Предлагаю MVP: минимум сейчас, остальное — этапами. 📦",
                    "Давайте попробуем сделать максимум, а там посмотрим. 🤷‍♀️",
                    "Тогда делайте часть сами, а я помогу. 😬",
                ],
                errors: [
                    null,
                    "Снова соглашаться на невозможное — ошибка. ⛔️",
                    "Пассивная агрессия не поможет. 😶‍🌫️",
                ],
                dialog: [
                    {
                        from: "user",
                        text: "Предлагаю MVP: минимум сейчас, остальное — этапами. 📦",
                    },
                    {
                        from: "client",
                        text: "Нет, хочу всё и сразу. И без увеличения срока и бюджета. 😤",
                    },
                ],
            },
        ],

        finalSuccess:
            "С учётом условий проект выглядит токсичным — я откажусь. Берегу ресурсы. 🔥🚪",
        finalFail: "Кажется, я переоценил(а) условия проекта — нужно было остановиться. 😬",

        successBullets: [
            "Увидел(а) красные флаги: завышенные ожидания при маленьком бюджете. 🚩",
            "Предложил(а) реалистичный формат (MVP), но клиент отказался. 🧱",
            "Сделал(а) вывод, что сотрудничество токсично. 🧯",
        ],
        failBullets: [
            "Игнорирование красных флагов ведёт к выгоранию. 🔥",
            "Даже идеально выстроенный процесс не спасёт при провальных вводных. ⚠️",
            "Иногда лучший проект — тот, который ты не взяла. 🚪",
        ],
    },

    // LEVEL 4 -----------------------------------------------------
    {
        id: 4,
        title: "Уровень 4: Максим",
        clientName: "Максим",
        avatarEmoji: "🧔",
        firstMessage:
            "Нужен лендинг. Я люблю всё контролировать: правки могу кидать до ночи, главное — чтобы было идеально.",
        clientIsAdequate: false,

        steps: [
            {
                kind: "choice",
                buttons: [
                    "Давайте договоримся о рамках: этапы, правки, сроки. 📝",
                    "Могу править хоть каждый час. 💪",
                    "Сделаю, а вы потом скажете, нравится или нет. 🎲",
                ],
                errors: [
                    null,
                    "Жить в режиме 24/7 невозможно. ⚠️",
                    "Без правил будет хаос. ♾️",
                ],
                dialog: [
                    {
                        from: "user",
                        text: "Давайте договоримся о рамках: этапы, правки, сроки. 📝",
                    },
                    {
                        from: "client",
                        text: "Мне рамки не нравятся. Хочу возможность менять всё в любой момент.",
                    },
                ],
            },
            {
                kind: "choice",
                buttons: [
                    "Тогда давайте ограничим время ответа и количество правок. ⏰",
                    "Буду подстраиваться под ваш ритм. 🙃",
                    "Давайте без правил вообще. 💬",
                ],
                errors: [
                    null,
                    "Подстраиваться под хаос — значит брать хаос на себя. ⚠️",
                    "Без договорённостей хаос только усилится. ⚡️",
                ],
                dialog: [
                    {
                        from: "user",
                        text: "Тогда давайте ограничим время ответа и количество правок. ⏰",
                    },
                    {
                        from: "client",
                        text: "Если нужны ограничения — вы мне не подходите. Мне нужен исполнитель всегда на связи. 😠",
                    },
                ],
            },
        ],

        finalSuccess:
            "К сожалению, такой уровень контроля и вовлечения мне не подходит. Отклоняю проект. 🚪",
        finalFail:
            "Похоже, я согласился(лась) на нереалистичные условия — это ошибка. 😣",

        successBullets: [
            "Клиент не готов к здоровым рамкам. 🎛️",
            "Попробовал(а) договориться — клиент отказался. 🚧",
            "Ожидания по вовлечению нереалистичны. ⚠️",
        ],
        failBullets: [
            "Готовность жить в работе 24/7 разрушает границы. 🚨",
            "Клиент, который не признаёт рамок, редко доволен. 😓",
            "Умение отказывать важно. 🧠",
        ],
    },

    // LEVEL 5 -----------------------------------------------------
    {
        id: 5,
        title: "Уровень 5: Сергей",
        clientName: "Сергей",
        avatarEmoji: "🧑‍💼",
        firstMessage:
            "Запускаем курс. Нужен лендинг, email-цепочка и баннеры. Бюджет ограничен, но хочу долгосрочную работу.",
        clientIsAdequate: true,

        steps: [
            {
                kind: "choice",
                buttons: [
                    "Супер! Давайте начнём с приоритетов: что важно к старту? 🎯",
                    "Давайте сделаем всё сразу! 🔥",
                    "Я могу только лендинг. 🙈",
                ],
                errors: [
                    null,
                    "«Сделать всё сразу» — путь к провалу. ⚠️",
                    "Резкий отказ от задач без обсуждения приоритетов. 🤔",
                ],
                dialog: [
                    {
                        from: "user",
                        text: "Супер! Давайте начнём с приоритетов: что важно к старту? 🎯",
                    },
                    {
                        from: "client",
                        text: "Главное — лендинг и пара писем. Остальное позже. 🙂",
                    },
                ],
            },

            {
                kind: "choice",
                buttons: [
                    "Предлагаю фиксировать объём на первый спринт. 📚",
                    "Без договорённостей, всё равно всё поменяется. 🌪️",
                    "Давайте обсуждать голосом. 🎙️",
                ],
                errors: [
                    null,
                    "Без фиксации объёма проект развалится. ⏳",
                    "Голосом удобно, но сложно фиксировать. ⚠️",
                ],
                dialog: [
                    {
                        from: "user",
                        text: "Предлагаю фиксировать объём на первый спринт. 📚",
                    },
                    {
                        from: "client",
                        text: "Отлично, я за структурный подход. 🤝",
                    },
                ],
            },

            {
                kind: "choice",
                buttons: [
                    "Пакет: лендинг + email-цепочка; баннеры позже. 🧩",
                    "Только лендинг.",
                    "Давайте всё отложим.",
                ],
                errors: [
                    null,
                    "Слишком узко для долгосрочного проекта. ⚠️",
                    "Отложить всё — сорвать старт. 🚫",
                ],
                dialog: [
                    {
                        from: "user",
                        text: "Пакет: лендинг + email-цепочка; баннеры позже. 🧩",
                    },
                    {
                        from: "client",
                        text: "Отлично, так нам будет проще планировать. 🙌",
                    },
                ],
            },
        ],

        finalSuccess: "Отлично! Формат работы понятен — готов двигаться дальше. 🤝✨",
        finalFail:
            "Так мы не сможем эффективно работать. Возможно, стоит вернуться к планированию позже. 🚪",

        successBullets: [
            "Помог(ла) клиенту расставить приоритеты. 🎯",
            "Зафиксировал(а) объём работ. 📋",
            "Предложил(а) адекватный пакет задач. 📈",
        ],
        failBullets: [
            "Без приоритетов легко утонуть в задачах. 🌊",
            "Без договорённостей даже адекватный клиент станет проблемным. ⚠️",
            "Важно видеть долгосрочных партнёров. 🤝",
        ],
    },
];

// =======================================================
//  UI ЭЛЕМЕНТЫ
// =======================================================

let root;
let headerTitleEl;
let avatarEmojiEl;
let avatarCircleEl;
let avatarNameEl;
let chatContainer;
let hintEl;
let buttonsContainer;

let currentLevelIndex = 0;
let currentStepIndex = 0;

// -------------------------------------------------------

function initLayout() {
    document.body.style.margin = "0";
    document.body.style.fontFamily = "'LCD 16x2 Display', monospace";
    document.body.style.backgroundColor = "#dcdde1";

    root = document.createElement("div");
    root.style.minHeight = "100vh";
    root.style.display = "flex";
    root.style.justifyContent = "center";
    root.style.alignItems = "center";
    root.style.padding = "16px";
    document.body.appendChild(root);

    const card = document.createElement("div");
    card.style.width = "100%";
    card.style.maxWidth = "420px";
    card.style.backgroundColor = "#f5f6fa";
    card.style.borderRadius = "32px";
    card.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.padding = "20px 20px 12px 20px";
    root.appendChild(card);

    // ----- HEADER -----

    const header = document.createElement("div");
    header.style.textAlign = "center";
    header.style.marginBottom = "12px";
    card.appendChild(header);

    headerTitleEl = document.createElement("div");
    headerTitleEl.style.fontSize = "20px";
    headerTitleEl.style.fontWeight = "700";
    headerTitleEl.style.letterSpacing = "2px";
    headerTitleEl.style.marginBottom = "6px";
    headerTitleEl.style.color = "#000";
    headerTitleEl.style.textTransform = "uppercase";
    header.appendChild(headerTitleEl);

    // ----- AVATAR -----

    const avatarWrap = document.createElement("div");
    avatarWrap.style.display = "flex";
    avatarWrap.style.flexDirection = "column";
    avatarWrap.style.alignItems = "center";
    avatarWrap.style.marginBottom = "10px";
    card.appendChild(avatarWrap);

    avatarCircleEl = document.createElement("div");
    avatarCircleEl.style.width = "68px";
    avatarCircleEl.style.height = "68px";
    avatarCircleEl.style.borderRadius = "50%";
    avatarCircleEl.style.backgroundColor = "#BDBCBC";
    avatarCircleEl.style.border = "1px solid black";
    avatarCircleEl.style.display = "flex";
    avatarCircleEl.style.alignItems = "center";
    avatarCircleEl.style.justifyContent = "center";
    avatarCircleEl.style.fontSize = "34px";
    avatarCircleEl.style.marginBottom = "6px";
    avatarWrap.appendChild(avatarCircleEl);

    avatarEmojiEl = document.createElement("div");
    avatarCircleEl.appendChild(avatarEmojiEl);

    avatarNameEl = document.createElement("div");
    avatarNameEl.style.fontSize = "14px";
    avatarNameEl.style.fontWeight = "600";
    avatarNameEl.style.letterSpacing = "1px";
    avatarNameEl.style.textTransform = "uppercase";
    avatarNameEl.style.color = "#555";
    avatarWrap.appendChild(avatarNameEl);

    // ----- CHAT -----

    chatContainer = document.createElement("div");
    chatContainer.style.flex = "1";
    chatContainer.style.padding = "12px";
    chatContainer.style.borderRadius = "24px";
    chatContainer.style.backgroundColor = "#e0e4f1";
    chatContainer.style.overflowY = "auto";
    chatContainer.style.maxHeight = "60vh";
    card.appendChild(chatContainer);

    // ----- HINT -----

    hintEl = document.createElement("div");
    hintEl.style.minHeight = "20px";
    hintEl.style.fontSize = "13px";
    hintEl.style.margin = "6px 6px 4px";
    hintEl.style.color = "#e74c3c";
    card.appendChild(hintEl);

    // ----- BUTTONS -----

    buttonsContainer = document.createElement("div");
    buttonsContainer.style.marginTop = "6px";
    buttonsContainer.style.paddingTop = "6px";
    buttonsContainer.style.borderTop = "2px solid rgba(0,0,0,0.08)";
    card.appendChild(buttonsContainer);
}

// =======================================================
//  UI УТИЛИТЫ
// =======================================================

function addMessage(text, from) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.marginBottom = "6px";
    row.style.justifyContent = from === "user" ? "flex-end" : "flex-start";

    const bubble = document.createElement("div");
    bubble.style.maxWidth = "80%";
    bubble.style.padding = "10px 12px";
    bubble.style.borderRadius = "16px";
    bubble.style.fontSize = "14px";
    bubble.style.lineHeight = "1.4";
    bubble.style.border = "1px solid black";
    bubble.style.fontFamily = "'LCD 16x2 Display', monospace";

    if (from === "client") {
        bubble.style.backgroundColor = "#B0C8FF";
    } else {
        bubble.style.backgroundColor = "#A2E3B7";
    }

    bubble.textContent = text;
    row.appendChild(bubble);
    chatContainer.appendChild(row);

    setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 50);
}

function setHint(text) {
    hintEl.textContent = text || "";
}

function clearButtons() {
    buttonsContainer.innerHTML = "";
}

function renderButtons(buttonLabels, onClick) {
    clearButtons();

    buttonLabels.forEach((label, index) => {
        const btn = document.createElement("button");
        btn.textContent = label;
        btn.style.width = "100%";
        btn.style.margin = "4px 0";
        btn.style.padding = "10px 12px";
        btn.style.borderRadius = "14px";
        btn.style.border = "1px solid black";
        btn.style.backgroundColor = "#BDBCBC";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "14px";
        btn.style.fontFamily = "'LCD 16x2 Display', monospace";

        btn.onmouseenter = () => (btn.style.opacity = "0.85");
        btn.onmouseleave = () => (btn.style.opacity = "1");

        btn.onclick = () => onClick(index, label);
        buttonsContainer.appendChild(btn);
    });
}

function disableButtons() {
    Array.from(buttonsContainer.querySelectorAll("button")).forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.6";
        btn.style.cursor = "default";
    });
}

// =======================================================
//  ЛОГИКА ИГРЫ
// =======================================================

function startLevel(index) {
    const level = LEVELS[index];
    currentLevelIndex = index;
    currentStepIndex = 0;

    headerTitleEl.textContent = level.title.toUpperCase();
    avatarEmojiEl.textContent = level.avatarEmoji;
    avatarNameEl.textContent = level.clientName;
    setHint("");

    chatContainer.innerHTML = "";
    addMessage(level.firstMessage, "client");

    renderStep(level, 0);
}

function renderStep(level, stepIndex) {
    const step = level.steps[stepIndex];

    if (!step) {
        renderFinalChoice(level);
        return;
    }

    renderButtons(step.buttons, (choiceIndex, label) =>
        handleStepChoice(level, stepIndex, choiceIndex, label)
    );
}

// -------- исправленная логика без задвоений --------
function handleStepChoice(level, stepIndex, choiceIndex, buttonText) {
    const step = level.steps[stepIndex];

    const errorText =
        step.errors && step.errors[choiceIndex] ? step.errors[choiceIndex] : null;

    if (errorText) {
        setHint(errorText);
        return;
    }

    setHint("");
    disableButtons();

    const dialog =
        step.dialog && step.dialog.length
            ? step.dialog
            : [{ from: "user", text: buttonText }];

    let delay = 0;
    dialog.forEach(replica => {
        setTimeout(() => addMessage(replica.text, replica.from), delay);
        delay += 450;
    });

    setTimeout(() => {
        currentStepIndex++;
        if (currentStepIndex < level.steps.length) {
            renderStep(level, currentStepIndex);
        } else {
            renderFinalChoice(level);
        }
    }, delay + 200);
}

function renderFinalChoice(level) {
    renderButtons(
        ["Клиент адекватный ✅", "Клиент неадекватный ❌"],
        index => handleFinalChoice(level, index === 0)
    );
}

function handleFinalChoice(level, playerThinksAdequate) {
    disableButtons();
    setHint("");

    const success = playerThinksAdequate === level.clientIsAdequate;
    const text = success ? level.finalSuccess : level.finalFail;

    addMessage(text, "user");

    setTimeout(() => {
        showResultScreen(level, success);
    }, 800);
}

// =======================================================
//  ЭКРАН РЕЗУЛЬТАТА ⭐ / 💀
// =======================================================

function showResultScreen(level, success) {
    root.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.style.width = "100%";
    wrap.style.maxWidth = "420px";
    wrap.style.margin = "0 auto";
    wrap.style.minHeight = "100vh";
    wrap.style.display = "flex";
    wrap.style.flexDirection = "column";
    wrap.style.alignItems = "center";
    wrap.style.justifyContent = "center";
    wrap.style.padding = "24px 16px";
    root.appendChild(wrap);

    const icon = document.createElement("div");
    icon.style.fontSize = "72px";
    icon.style.marginBottom = "12px";
    icon.textContent = success ? "⭐️" : "💀";
    wrap.appendChild(icon);

    const title = document.createElement("div");
    title.textContent = success ? "УСПЕХ!" : "ПРОВАЛ!";
    title.style.fontSize = "40px";
    title.style.fontWeight = "700";
    title.style.marginBottom = "16px";
    wrap.appendChild(title);

    const box = document.createElement("div");
    box.style.backgroundColor = success ? "#A2E3B7" : "#FFB6C1";
    box.style.borderRadius = "20px";
    box.style.padding = "16px";
    box.style.width = "100%";
    box.style.marginBottom = "16px";
    wrap.appendChild(box);

    const header = document.createElement("div");
    header.textContent = success
        ? "Почему выбор верный:"
        : "Почему выбор неверный:";
    header.style.fontSize = "16px";
    header.style.fontWeight = "600";
    header.style.marginBottom = "10px";
    box.appendChild(header);

    const ul = document.createElement("ul");
    ul.style.paddingLeft = "20px";

    const bullets = success ? level.successBullets : level.failBullets;

    bullets.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t;
        ul.appendChild(li);
    });

    box.appendChild(ul);

    const btn = document.createElement("button");
    btn.textContent =
        level.id < LEVELS.length ? "Следующий уровень ▶︎" : "Сыграть снова 🔁";
    btn.style.marginTop = "18px";
    btn.style.padding = "12px 18px";
    btn.style.borderRadius = "14px";
    btn.style.border = "none";
    btn.style.backgroundColor = "#3390ec";
    btn.style.color = "white";
    btn.style.fontSize = "15px";
    btn.style.cursor = "pointer";
    btn.onmouseenter = () => (btn.style.opacity = "0.9");
    btn.onmouseleave = () => (btn.style.opacity = "1");

    btn.onclick = () => {
    root.innerHTML = "";
    initLayout();

    if (currentLevelIndex < LEVELS.length - 1) {
        startLevel(currentLevelIndex + 1);
    } else {
        startLevel(0);
    }
};


// =======================================================
//  СТАРТ
// =======================================================

initLayout();
startLevel(0);}
