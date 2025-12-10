// public/game.js
// Мини-игра про фриланс с 5 уровнями (vanilla JS)

// --- Telegram WebApp интеграция ---
const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
if (tg) {
  tg.expand();
  tg.ready();
}

// ----------------------------------------------------
//                  ДАННЫЕ ИГРЫ
// ----------------------------------------------------

const LEVELS = [
  // ---------- УРОВЕНЬ 1 ----------
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
          "Здравствуйте! Какие примерно сроки и бюджет? 📅💰"
        ],
        // null = правильный ответ
        errors: [
          "Рановато говорить про оплату — сначала нужно понять задачу и объём. ⚠️",
          "Стиль обсудим позже, а пока важно понять сроки и бюджет. ⚠️",
          null
        ],
        dialog: [
          {
            from: "user",
            text: "Здравствуйте! Какие примерно сроки и бюджет? 📅💰"
          },
          {
            from: "client",
            text: "10 дней, оплата по этапам. Если всё пойдёт хорошо — продолжим работу. 🙂"
          }
        ]
      }
    ],
    closingTexts: {
      correct: "Отлично, я готов продолжать работу с таким клиентом. 🤝",
      wrong:
        "Кажется, я не до конца прочитал сигналы и мог лучше оценить ситуацию. 🤔"
    },
    successBullets: [
      "Сначала уточнил(а) сроки и бюджет. 🎯",
      "Не перепрыгнул(а) сразу к оплате или стилю. 🧠",
      "Сформировал(а) рабочие ожидания по проекту. 🤝"
    ],
    failBullets: [
      "Фокус на деталях вместо общей картинки усложняет старт. 🧩",
      "Сложнее оценить риски и объём работ. ⚠️",
      "Клиенту важна уверенность, что ты понимаешь задачу. 💬"
    ]
  },

  // ---------- УРОВЕНЬ 2 ----------
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
          "Давайте начнём с дизайна, а тексты потом придумаем. ✏️"
        ],
        errors: [
          null,
          "Если сразу соглашаться на заведомо нереальные ожидания, всё закончится выгоранием. 🔥",
          "Игнорировать контент и структуру — риск получить «красиво, но бессмысленно». ⚠️"
        ],
        dialog: [
          {
            from: "user",
            text: "Давайте уточним объём работ, сроки и бюджет — похоже, задач много. ✍️"
          },
          {
            from: "client",
            text: "Окей, давай реалистичнее — неделя и по этапам. Главное, чтобы смотрелось круто. 😎"
          }
        ]
      }
    ],
    closingTexts: {
      correct: "Класс, с таким подходом есть шанс на долгосрочное сотрудничество. 🤝",
      wrong:
        "Я недооценил(а) важность реалистичных ожиданий и упустил(а) хорошего клиента. 😕"
    },
    successBullets: [
      "Помог(ла) клиенту перейти от фантазий к реалистичным срокам. 🕒",
      "Сохранил(а) фокус на структуре и объёме работ. 🧱",
      "Не пообещал(а) невозможное ради «вау-эффекта». 💡"
    ],
    failBullets: [
      "Соглашение на нереальные ожидания ведёт к срывам сроков. ⏰",
      "Отсутствие чётких рамок по объёму и бюджету — путь к конфликтам. ⚠️",
      "Клиенту нужна экспертность, а не притворное всемогущество. 🎭"
    ]
  },

  // ---------- УРОВЕНЬ 3 ----------
  {
    id: 3,
    title: "Уровень 3: Анна",
    clientName: "Анна",
    avatarEmoji: "👩‍🎤",
    firstMessage:
      "Привет! Нужен интернет-магазин одежды. Ассортимент большой, интеграции с оплатой и доставкой, но бюджет небольшой и надо «запуститься за неделю».",
    clientIsAdequate: false,
    steps: [
      {
        kind: "choice",
        buttons: [
          "Давайте сначала разберёмся с объёмом, интеграциями и минимально реалистичными сроками. 🧩",
          "Сделаем всё, уложимся за неделю, по ходу разберёмся. 😉",
          "Давайте просто возьмём готовый шаблон, остальное потом допилим. 🪛"
        ],
        errors: [
          null,
          "Обещать всё и сразу — это билет в овертаймы и конфликты. ⚠️",
          "Шаблон без обсуждения нюансов не решит задачу сложного магазина. 🧱"
        ],
        dialog: [
          {
            from: "user",
            text: "Давайте сначала разберёмся с объёмом, интеграциями и минимально реалистичными сроками. 🧩"
          },
          {
            from: "client",
            text: "Объём большой, интеграции нужны все, сроки двигать не хочу и бюджет поднимать тоже. 😐"
          }
        ]
      },
      {
        kind: "choice",
        buttons: [
          "Могу предложить MVP: часть функционала сейчас, остальное — отдельными этапами. 📦",
          "Ну давайте попробуем сделать максимум за неделю, там посмотрим. 🤷‍♀️",
          "Если всё так срочно и без бюджета, давайте вы будете сами разбираться, а я подсоблю по мелочам. 😬"
        ],
        errors: [
          null,
          "Снова соглашаться на заведомо невыполнимые условия — плохая стратегия. ⛔️",
          "Пассивная агрессия не помогает выстроить рабочий диалог. 😶‍🌫️"
        ],
        dialog: [
          {
            from: "user",
            text: "Могу предложить MVP: часть функционала сейчас, остальное — отдельными этапами. 📦"
          },
          {
            from: "client",
            text: "Нет, хочу «как у крупных брендов», но в мой бюджет и в мои сроки. По-другому неинтересно. 😤"
          }
        ]
      }
    ],
    closingTexts: {
      correct:
        "К сожалению, с таким набором ожиданий работать нельзя — лучше честно отказаться. 🚪",
      wrong:
        "Я закрыл(а) глаза на красные флаги и, скорее всего, попал(а) бы в очень токсичный проект. 😵"
    },
    successBullets: [
      "Увидел(а) красные флаги: завышенные ожидания при маленьком бюджете. 🚩",
      "Предложил(а) реалистичный формат (MVP), но клиент отказался. 🧱",
      "Сделал(а) вывод, что сотрудничество токсично и не стоит продолжения. 🧯"
    ],
    failBullets: [
      "Игнорирование красных флагов ведёт к выгоранию. 🔥",
      "Даже идеально выстроенный процесс не спасёт при провальных вводных. ⚠️",
      "Иногда лучший проект — тот, который ты вовремя не взял. 🚪"
    ]
  },

  // ---------- УРОВЕНЬ 4 ----------
  {
    id: 4,
    title: "Уровень 4: Максим",
    clientName: "Максим",
    avatarEmoji: "🧔",
    firstMessage:
      "Нужен лендинг для сервиса. Концепция есть, но я люблю всё контролировать: правки могу кидать до ночи, главное — чтобы было «идеально».",
    clientIsAdequate: false,
    steps: [
      {
        kind: "choice",
        buttons: [
          "Давайте сразу договоримся по этапам, количеству правок и времени ответов. 📝",
          "Окей, скидывайте всё, буду править хоть каждый час. 💪",
          "Давайте я сделаю, а вы потом просто скажете, нравится или нет. 🎲"
        ],
        errors: [
          null,
          "Готовность работать 24/7 без рамок — путь к истощению. ⚠️",
          "Без критериев и этапов «нравится / не нравится» растягивается бесконечно. ⏳"
        ],
        dialog: [
          {
            from: "user",
            text: "Давайте сразу договоримся по этапам, количеству правок и времени ответов. 📝"
          },
          {
            from: "client",
            text: "Ну, я не люблю рамки. Мне важно иметь возможность всё переправить в любой момент. ⚡️"
          }
        ]
      },
      {
        kind: "choice",
        buttons: [
          "Тогда мне важно ограничить правки и время ответа, иначе мы не уложимся и вы останетесь недовольны. ⏰",
          "Хорошо, будем подстраиваться под ваш график, как получится. 🙃",
          "Давайте просто всё обсуждать в чате без договорённостей. 💬"
        ],
        errors: [
          null,
          "Подстраиваться под хаос клиента — значит брать хаос на себя. 🌪️",
          "Отсутствие договорённостей не сделает процесс легче. 📉"
        ],
        dialog: [
          {
            from: "user",
            text: "Тогда мне важно ограничить правки и время ответа, иначе мы не уложимся и вы останетесь недовольны. ⏰"
          },
          {
            from: "client",
            text: "Если вам нужны ограничения — вы, наверное, мне не подходите. Я хочу, чтобы исполнитель был всегда на связи. 😠"
          }
        ]
      }
    ],
    closingTexts: {
      correct: "Лучше сразу сказать «нет», чем жить в режиме бесконечных правок. 🚪",
      wrong:
        "Я, похоже, недооценил(а), насколько тяжёлым может быть такой формат работы. 😓"
    },
    successBullets: [
      "Заметил(а), что клиент не готов к здоровым рамкам и хочет полного контроля. 🎛️",
      "Попробовал(а) договориться о правилах — клиент отказался. 🚧",
      "Сделал(а) вывод, что ожидания по вовлечению нереалистичны. ⚠️"
    ],
    failBullets: [
      "Согласие жить в вечной готовности под правки разрушает личные границы. 🚨",
      "Клиент, который не признаёт рамок, редко доволен результатом. 😓",
      "Умение отказывать — часть профессионализма. 🧠"
    ]
  },

  // ---------- УРОВЕНЬ 5 ----------
  {
    id: 5,
    title: "Уровень 5: Сергей",
    clientName: "Сергей",
    avatarEmoji: "🧑‍💼",
    firstMessage:
      "Добрый день! Запускаем новый онлайн-курс. Нужен лендинг, email-цепочка и несколько баннеров. Бюджет ограничен, но хочу выстроить долгосрочную работу.",
    clientIsAdequate: true,
    steps: [
      {
        kind: "choice",
        buttons: [
          "Супер! Давайте начнём с приоритетов: что обязательно нужно к старту, а что можно отложить. 🎯",
          "Давайте сделаем всё сразу, а там по ходу разберёмся. 🔥",
          "Могу заняться только лендингом, остальное вам лучше отдать другим. 🙈"
        ],
        errors: [
          null,
          "«Сделать всё сразу» = сильный риск завалить сроки и качество. ⚠️",
          "Резко отказываться от части задач без обсуждения приоритетов — не лучшая стратегия. 🤔"
        ],
        dialog: [
          {
            from: "user",
            text: "Супер! Давайте начнём с приоритетов: что обязательно нужно к старту, а что можно отложить. 🎯"
          },
          {
            from: "client",
            text: "Главное — лендинг и пара писем к запуску. Остальное можно доработать после первых продаж. 🙂"
          }
        ]
      },
      {
        kind: "choice",
        buttons: [
          "Предлагаю фиксировать объём на первый спринт и отдельно прописать задачи на поддержку. 📚",
          "Давайте без договорённостей, всё равно план изменится. 🌪️",
          "Давайте всё обсуждать голосом, без переписок. 🎙️"
        ],
        errors: [
          null,
          "Отсутствие фиксации объёма превращает проект в бесконечный. ⏳",
          "Голосом удобно, но без текстовых договорённостей легко всё забыть. 🧠"
        ],
        dialog: [
          {
            from: "user",
            text: "Предлагаю фиксировать объём на первый спринт и отдельно прописать задачи на поддержку. 📚"
          },
          {
            from: "client",
            text: "Отлично, так и сделаем. Я за структурный подход и долгосрочное сотрудничество. 🤝"
          }
        ]
      },
      {
        kind: "choice",
        buttons: [
          "Я могу предложить пакет: лендинг + базовая email-цепочка, а баннеры добавим вторым этапом. 🧩",
          "Сделаем только лендинг, остальное пусть делает кто-нибудь другой. 😐",
          "Давайте вообще всё отложим до первых продаж. 😅"
        ],
        errors: [
          null,
          "Резко отрезать часть задач без обсуждения стратегии — не лучшая идея. 🧊",
          "Если отложить всё, старт сорвётся. 🚫"
        ],
        dialog: [
          {
            from: "user",
            text: "Я могу предложить пакет: лендинг + базовая email-цепочка, а баннеры добавим вторым этапом. 🧩"
          },
          {
            from: "client",
            text:
              "Звучит отлично, так нам будет проще планировать. Готов работать по такому формату. 🙌"
          }
        ]
      }
    ],
    closingTexts: {
      correct:
        "Супер, это клиент с адекватными ожиданиями — хороший кандидат на долгосрочное партнёрство. 🤝",
      wrong:
        "Я недооценил(а) потенциал этого клиента и рискую упустить классный проект. 😅"
    },
    successBullets: [
      "Помог(ла) клиенту расставить приоритеты и не распыляться. 🎯",
      "Зафиксировал(а) объём и формат поддержки. 📋",
      "Предложил(а) адекватный пакет работ с перспективой продолжения. 📈"
    ],
    failBullets: [
      "Без приоритизации легко утонуть в задачах. 🌊",
      "Отказ от договорённостей делает даже адекватного клиента проблемным. ⚠️",
      "Важно видеть потенциальных долгосрочных партнёров. 🤝"
    ]
  }
];

// ----------------------------------------------------
//                 ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ UI
// ----------------------------------------------------

let root;
let headerTitleEl;
let avatarEmojiEl;
let avatarNameEl;
let chatContainer;
let hintEl;
let buttonsContainer;

let currentLevelIndex = 0;
let currentStepIndex = 0;

// ----------------------------------------------------
//               ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ UI
// ----------------------------------------------------

function getThemeColor(varName, fallback) {
  if (!window.getComputedStyle) return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(
    varName
  );
  return v && v.trim() ? v.trim() : fallback;
}

function initLayout() {
  document.body.style.margin = "0";
  document.body.style.fontFamily =
    "system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
  document.body.style.backgroundColor = getThemeColor(
    "--tg-theme-secondary-bg-color",
    "#dcdde1"
  );

  root = document.createElement("div");
  root.style.minHeight = "100vh";
  root.style.display = "flex";
  root.style.justifyContent = "center";
  root.style.alignItems = "center";
  root.style.padding = "16px";
  root.style.boxSizing = "border-box";
  document.body.appendChild(root);

  const card = document.createElement("div");
  card.style.width = "100%";
  card.style.maxWidth = "420px";
  card.style.backgroundColor = getThemeColor("--tg-theme-bg-color", "#f5f6fa");
  card.style.borderRadius = "32px";
  card.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
  card.style.display = "flex";
  card.style.flexDirection = "column";
  card.style.padding = "20px 20px 12px 20px";
  card.style.boxSizing = "border-box";
  root.appendChild(card);

  // header
  const header = document.createElement("div");
  header.style.textAlign = "center";
  header.style.marginBottom = "10px";
  card.appendChild(header);

  headerTitleEl = document.createElement("div");
  headerTitleEl.style.fontSize = "22px";
  headerTitleEl.style.fontWeight = "700";
  headerTitleEl.style.letterSpacing = "2px";
  headerTitleEl.style.textTransform = "uppercase";
  headerTitleEl.style.fontFamily =
    "'SF Mono', ui-monospace, Menlo, Monaco, Consolas, 'Courier New', monospace";
  headerTitleEl.style.color = getThemeColor("--tg-theme-text-color", "#111");
  header.appendChild(headerTitleEl);

  // avatar
  const avatarWrap = document.createElement("div");
  avatarWrap.style.display = "flex";
  avatarWrap.style.flexDirection = "column";
  avatarWrap.style.alignItems = "center";
  avatarWrap.style.marginBottom = "10px";
  card.appendChild(avatarWrap);

  const avatarCircle = document.createElement("div");
  avatarCircle.style.width = "72px";
  avatarCircle.style.height = "72px";
  avatarCircle.style.borderRadius = "50%";
  avatarCircle.style.backgroundColor = "#BDBCBC";
  avatarCircle.style.border = "1px solid #000";
  avatarCircle.style.display = "flex";
  avatarCircle.style.alignItems = "center";
  avatarCircle.style.justifyContent = "center";
  avatarCircle.style.fontSize = "36px";
  avatarCircle.style.marginBottom = "6px";
  avatarWrap.appendChild(avatarCircle);

  avatarEmojiEl = document.createElement("div");
  avatarCircle.appendChild(avatarEmojiEl);

  avatarNameEl = document.createElement("div");
  avatarNameEl.style.fontSize = "15px";
  avatarNameEl.style.fontWeight = "600";
  avatarNameEl.style.letterSpacing = "1px";
  avatarNameEl.style.textTransform = "uppercase";
  avatarNameEl.style.fontFamily = headerTitleEl.style.fontFamily;
  avatarNameEl.style.color = getThemeColor("--tg-theme-hint-color", "#555");
  avatarWrap.appendChild(avatarNameEl);

  // chat container
  chatContainer = document.createElement("div");
  chatContainer.style.flex = "1";
  chatContainer.style.padding = "12px";
  chatContainer.style.borderRadius = "24px";
  chatContainer.style.backgroundColor = "#F5F5F7";
  chatContainer.style.overflowY = "auto";
  chatContainer.style.maxHeight = "58vh";
  chatContainer.style.boxSizing = "border-box";
  card.appendChild(chatContainer);

  // hint
  hintEl = document.createElement("div");
  hintEl.style.minHeight = "20px";
  hintEl.style.fontSize = "13px";
  hintEl.style.margin = "6px 6px 4px";
  hintEl.style.color = "#e74c3c";
  hintEl.style.fontFamily = headerTitleEl.style.fontFamily;
  card.appendChild(hintEl);

  // buttons container
  buttonsContainer = document.createElement("div");
  buttonsContainer.style.marginTop = "6px";
  buttonsContainer.style.paddingTop = "8px";
  buttonsContainer.style.borderTop = "2px solid rgba(0,0,0,0.08)";
  card.appendChild(buttonsContainer);
}

function clearChat() {
  chatContainer.innerHTML = "";
}

function addMessage(text, from) {
  const row = document.createElement("div");
  row.style.display = "flex";
  row.style.marginBottom = "6px";
  row.style.justifyContent = from === "user" ? "flex-end" : "flex-start";

  const bubble = document.createElement("div");
  bubble.style.maxWidth = "80%";
  bubble.style.padding = "8px 10px";
  bubble.style.borderRadius = "18px";
  bubble.style.fontSize = "14px";
  bubble.style.lineHeight = "1.4";
  bubble.style.fontFamily =
    "'SF Mono', ui-monospace, Menlo, Monaco, Consolas, 'Courier New', monospace";

  if (from === "client") {
    bubble.style.backgroundColor = "#B0C8FF";
    bubble.style.border = "2px solid #8FAEF5";
    bubble.style.color = "#000";
  } else if (from === "user") {
    bubble.style.backgroundColor = "#A2E3B7";
    bubble.style.border = "2px solid #78C58E";
    bubble.style.color = "#000";
  } else {
    bubble.style.backgroundColor = "#f5f5f5";
    bubble.style.border = "1px dashed #aaa";
    bubble.style.color = "#333";
  }

  bubble.textContent = text;
  row.appendChild(bubble);
  chatContainer.appendChild(row);

  // автоскролл
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function setHint(text) {
  hintEl.textContent = text || "";
}

function clearButtons() {
  buttonsContainer.innerHTML = "";
}

function renderButtons(labels, onClick) {
  clearButtons();
  labels.forEach(function (label, index) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.style.width = "100%";
    btn.style.margin = "4px 0";
    btn.style.padding = "10px 12px";
    btn.style.borderRadius = "22px";
    btn.style.border = "1px solid #000";
    btn.style.backgroundColor = "#BDBCBC";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "14px";
    btn.style.fontFamily =
      "'SF Mono', ui-monospace, Menlo, Monaco, Consolas, 'Courier New', monospace";
    btn.style.transition = "background-color 0.15s ease, opacity 0.15s ease";

    btn.onmouseenter = function () {
      btn.style.backgroundColor = "#D4D4D4";
    };
    btn.onmouseleave = function () {
      btn.style.backgroundColor = "#BDBCBC";
    };
    btn.onclick = function () {
      onClick(index, label);
    };

    buttonsContainer.appendChild(btn);
  });
}

function disableButtons() {
  const list = buttonsContainer.querySelectorAll("button");
  list.forEach(function (btn) {
    btn.disabled = true;
    btn.style.opacity = "0.6";
    btn.style.cursor = "default";
  });
}

// ----------------------------------------------------
//                 ЛОГИКА УРОВНЕЙ
// ----------------------------------------------------

function startLevel(index) {
  const level = LEVELS[index];
  currentLevelIndex = index;
  currentStepIndex = 0;

  headerTitleEl.textContent = level.title;
  avatarEmojiEl.textContent = level.avatarEmoji;
  avatarNameEl.textContent = level.clientName.toUpperCase();
  setHint("");

  clearChat();
  addMessage(level.firstMessage, "client");
  renderStep(level, currentStepIndex);
}

function renderStep(level, stepIndex) {
  const step = level.steps[stepIndex];
  if (!step) {
    renderFinalChoice(level);
    return;
  }

  if (step.kind === "choice") {
    renderButtons(step.buttons, function (choiceIndex, label) {
      handleStepChoice(level, stepIndex, choiceIndex, label);
    });
  }
}

// исправленная функция без задвоения реплик
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
  dialog.forEach(function (replica) {
    setTimeout(function () {
      addMessage(replica.text, replica.from);
    }, delay);
    delay += 450;
  });

  setTimeout(function () {
    currentStepIndex += 1;
    if (currentStepIndex < level.steps.length) {
      renderStep(level, currentStepIndex);
    } else {
      renderFinalChoice(level);
    }
  }, delay + 200);
}

// ----------------------------------------------------
//             ФИНАЛЬНОЕ РЕШЕНИЕ ПО УРОВНЮ
// ----------------------------------------------------

function renderFinalChoice(level) {
  renderButtons(
    ["Клиент адекватный ✅", "Клиент неадекватный ❌"],
    function (index) {
      const playerThinksAdequate = index === 0;
      handleFinalChoice(level, playerThinksAdequate);
    }
  );
}

function handleFinalChoice(level, playerThinksAdequate) {
  disableButtons();
  setHint("");

  const isSuccess = playerThinksAdequate === level.clientIsAdequate;
  const closingText = isSuccess
    ? level.closingTexts.correct
    : level.closingTexts.wrong;

  // Финальная реплика — ВСЕГДА от нас, зелёный пузырь
  addMessage(closingText, "user");

  setTimeout(function () {
    showResultScreen(level, isSuccess);
  }, 700);
}

// ----------------------------------------------------
//                ЭКРАН РЕЗУЛЬТАТА
// ----------------------------------------------------

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
  wrap.style.boxSizing = "border-box";
  root.appendChild(wrap);

  const iconRow = document.createElement("div");
  iconRow.style.display = "flex";
  iconRow.style.gap = "12px";
  iconRow.style.marginBottom = "16px";
  iconRow.style.alignItems = "center";
  wrap.appendChild(iconRow);

  if (success) {
    ["⭐️", "🌟", "⭐️"].forEach(function (emoji) {
      const span = document.createElement("span");
      span.textContent = emoji;
      span.style.fontSize = "40px";
      iconRow.appendChild(span);
    });
  } else {
    const span = document.createElement("span");
    span.textContent = "☠️";
    span.style.fontSize = "54px";
    iconRow.appendChild(span);
  }

  const title = document.createElement("div");
  title.style.fontSize = "40px";
  title.style.fontWeight = "900";
  title.style.fontFamily =
    "'SF Mono', ui-monospace, Menlo, Monaco, Consolas, 'Courier New', monospace";
  title.style.marginBottom = "16px";
  title.style.letterSpacing = "6px";
  title.style.textTransform = "uppercase";
  title.style.color = getThemeColor("--tg-theme-text-color", "#000");
  title.textContent = success ? "УСПЕХ!" : "ПРОВАЛ!";
  wrap.appendChild(title);

  const box = document.createElement("div");
  box.style.backgroundColor = success ? "#c8f7c5" : "#ffb6c1";
  box.style.borderRadius = "24px";
  box.style.padding = "18px 16px";
  box.style.maxWidth = "420px";
  box.style.width = "100%";
  box.style.boxSizing = "border-box";
  wrap.appendChild(box);

  const subtitle = document.createElement("div");
  subtitle.style.fontSize = "16px";
  subtitle.style.fontWeight = "700";
  subtitle.style.fontFamily =
    "'SF Mono', ui-monospace, Menlo, Monaco, Consolas, 'Courier New', monospace";
  subtitle.style.marginBottom = "10px";
  subtitle.textContent = success
    ? "Почему выбор верный:"
    : "Почему выбор неверный:";
  box.appendChild(subtitle);

  const ul = document.createElement("ul");
  ul.style.margin = "0";
  ul.style.paddingLeft = "18px";
  ul.style.fontSize = "14px";
  ul.style.fontFamily = subtitle.style.fontFamily;
  const bullets = success ? level.successBullets : level.failBullets;
  bullets.forEach(function (t) {
    const li = document.createElement("li");
    li.textContent = t;
    ul.appendChild(li);
  });
  box.appendChild(ul);

  const btn = document.createElement("button");
  btn.textContent =
    currentLevelIndex < LEVELS.length - 1
      ? "Далее к следующему уровню ▶︎"
      : "Сыграть ещё раз 🔁";
  btn.style.marginTop = "18px";
  btn.style.padding = "10px 18px";
  btn.style.borderRadius = "999px";
  btn.style.border = "none";
  btn.style.cursor = "pointer";
  btn.style.fontSize = "15px";
  btn.style.fontWeight = "600";
  btn.style.fontFamily = subtitle.style.fontFamily;
  btn.style.backgroundColor = getThemeColor(
    "--tg-theme-button-color",
    "#3390ec"
  );
  btn.style.color = getThemeColor("--tg-theme-button-text-color", "#fff");
  btn.onclick = function () {
    root.innerHTML = "";
    initLayout();
    if (currentLevelIndex < LEVELS.length - 1) {
      startLevel(currentLevelIndex + 1);
    } else {
      startLevel(0);
    }
  };
  wrap.appendChild(btn);
}

// ----------------------------------------------------
//                  СТАРТ ИГРЫ
// ----------------------------------------------------

initLayout();
startLevel(0);
