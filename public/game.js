// public/game.js
// Простая мини-игра про фриланс с 5 уровнями

// --- Telegram WebApp интеграция ---
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.expand();
  tg.ready();
}

// --- Данные игры ---

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
          "Здравствуйте! Какие примерно сроки и бюджет? 📅💰",
        ],
        errors: [
          "Рановато говорить про оплату — сначала нужно понять задачу и объём. ⚠️",
          "Стиль обсудим позже, а пока важно понять сроки и бюджет. ⚠️",
          null, // третий вариант — правильный
        ],
        dialog: [
          {
            from: "user",
            text: "Здравствуйте! Какие примерно сроки и бюджет? 📅💰",
          },
          {
            from: "client",
            text: "10 дней, оплата по этапам. Если всё ок — буду работать с тобой дальше. 🙂",
          },
        ],
      },
    ],
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
          "Давайте просто возьмём готовый шаблон, остальное потом допилим. 🪛",
        ],
        errors: [
          null,
          "Обещать всё и сразу — это билет в овертаймы и конфликты. ⚠️",
          "Шаблон без обсуждения нюансов не решит задачу сложного магазина. 🧱",
        ],
        dialog: [
          {
            from: "user",
            text: "Давайте сначала разберёмся с объёмом, интеграциями и минимально реалистичными сроками. 🧩",
          },
          {
            from: "client",
            text: "Объём большой, интеграции нужны все, сроки двигать не хочу и бюджет поднимать тоже. 😐",
          },
        ],
      },
      {
        kind: "choice",
        buttons: [
          "Могу предложить MVP: часть функционала сейчас, остальное — отдельными этапами. 📦",
          "Ну давайте попробуем сделать максимум за неделю, там посмотрим. 🤷‍♀️",
          "Если всё так срочно и без бюджета, давайте вы будете сами разбираться, а я подсоблю по мелочам. 😬",
        ],
        errors: [
          null,
          "Снова соглашаться на заведомо невыполнимые условия — плохая стратегия. ⛔️",
          "Пассивная агрессия не помогает выстроить рабочий диалог. 😶‍🌫️",
        ],
        dialog: [
          {
            from: "user",
            text: "Могу предложить MVP: часть функционала сейчас, остальное — отдельными этапами. 📦",
          },
          {
            from: "client",
            text: "Нет, хочу «как у крупных брендов», но в мой бюджет и в мои сроки. По-другому неинтересно. 😤",
          },
        ],
      },
    ],
    successBullets: [
      "Увидел(а) красные флаги: завышенные ожидания при маленьком бюджете. 🚩",
      "Предложил(а) реалистичный формат (MVP), но клиент отказался. 🧱",
      "Сделал(а) вывод, что сотрудничество токсично и не стоит продолжения. 🧯",
    ],
    failBullets: [
      "Игнорирование красных флагов ведёт к выгоранию. 🔥",
      "Даже идеально выстроенный процесс не спасёт при провальных вводных. ⚠️",
      "Иногда лучший проект — тот, который ты вовремя не взял. 🚪",
    ],
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
          "Давайте я сделаю, а вы потом просто скажете, нравится или нет. 🎲",
        ],
        errors: [
          null,
          "Готовность работать 24/7 без рамок — путь к истощению. ⚠️",
          "Без критериев и этапов «нравится / не нравится» растягивается бесконечно. ⏳",
        ],
        dialog: [
          {
            from: "user",
            text: "Давайте сразу договоримся по этапам, количеству правок и времени ответов. 📝",
          },
          {
            from: "client",
            text: "Ну, я не люблю рамки. Мне важно иметь возможность всё переправить в любой момент. ⚡️",
          },
        ],
      },
      {
        kind: "choice",
        buttons: [
          "Тогда мне важно ограничить правки и время ответа, иначе мы не уложимся и вы останетесь недовольны. ⏰",
          "Хорошо, будем подстраиваться под ваш график, как получится. 🙃",
          "Давайте просто всё обсуждать в чате без договорённостей. 💬",
        ],
        errors: [
          null,
          "Подстраиваться под хаос клиента — значит брать хаос на себя. 🌪️",
          "Отсутствие договорённостей не сделает процесс легче. 📉",
        ],
        dialog: [
          {
            from: "user",
            text: "Тогда мне важно ограничить правки и время ответа, иначе мы не уложимся и вы останетесь недовольны. ⏰",
          },
          {
            from: "client",
            text: "Если вам нужны ограничения — вы, наверное, мне не подходите. Я хочу, чтобы исполнитель был всегда на связи. 😠",
          },
        ],
      },
    ],
    successBullets: [
      "Заметил(а), что клиент не готов к здоровым рамкам и хочет полного контроля. 🎛️",
      "Попробовал(а) договориться о правилах — клиент отказался. 🚧",
      "Сделал(а) вывод, что ожидания по вовлечению нереалистичны. ⚠️",
    ],
    failBullets: [
      "Согласие жить в вечной готовности под правки разрушает личные границы. 🚨",
      "Клиент, который не признаёт рамок, редко доволен результатом. 😓",
      "Умение отказывать — часть профессионализма. 🧠",
    ],
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
          "Могу заняться только лендингом, остальное вам лучше отдать другим. 🙈",
        ],
        errors: [
          null,
          "«Сделать всё сразу» = сильный риск завалить сроки и качество. ⚠️",
          "Резко отказываться от части задач без обсуждения приоритетов — не лучшая стратегия. 🤔",
        ],
        dialog: [
          {
            from: "user",
            text: "Супер! Давайте начнём с приоритетов: что обязательно нужно к старту, а что можно отложить. 🎯",
          },
          {
            from: "client",
            text: "Главное — лендинг и пара писем к запуску. Остальное можно доработать после первых продаж. 🙂",
          },
        ],
      },
      {
        kind: "choice",
        buttons: [
          "Предлагаю фиксировать объём на первый спринт и отдельно прописать задачи на поддержку. 📚",
          "Давайте без договорённостей, всё равно план изменится. 🌪️",
          "Давайте всё обсуждать голосом, без переписок. 🎙️",
        ],
        errors: [
          null,
          "Отсутствие фиксации объёма превращает проект в бесконечный. ⏳",
          "Голосом удобно, но без текстовых договорённостей легко всё забыть. 🧠",
        ],
        dialog: [
          {
            from: "user",
            text: "Предлагаю фиксировать объём на первый спринт и отдельно прописать задачи на поддержку. 📚",
          },
          {
            from: "client",
            text: "Отлично, так и сделаем. Я за структурный подход и долгосрочное сотрудничество. 🤝",
          },
        ],
      },
      {
        kind: "choice",
        buttons: [
          "Я могу предложить пакет: лендинг + базовая email-цепочка, а баннеры добавим вторым этапом. 🧩",
          "Сделаем только лендинг, остальное пусть делает кто-нибудь другой. 😐",
          "Давайте вообще всё отложим до первых продаж. 😅",
        ],
        errors: [
          null,
          "Резко отрезать часть задач без обсуждения стратегии — не лучшая идея. 🧊",
          "Если отложить всё, старт сорвётся. 🚫",
        ],
        dialog: [
          {
            from: "user",
            text: "Я могу предложить пакет: лендинг + базовая email-цепочка, а баннеры добавим вторым этапом. 🧩",
          },
          {
            from: "client",
            text: "Звучит отлично, так нам будет проще планировать. Готов работать по такому формату. 🙌",
          },
        ],
      },
    ],
    successBullets: [
      "Помог(ла) клиенту расставить приоритеты и не распыляться. 🎯",
      "Зафиксировал(а) объём и формат поддержки. 📋",
      "Предложил(а) адекватный пакет работ с перспективой продолжения. 📈",
    ],
    failBullets: [
      "Без приоритизации легко утонуть в задачах. 🌊",
      "Отказ от договорённостей делает даже адекватного клиента проблемным. ⚠️",
      "Важно видеть потенциальных долгосрочных партнёров. 🤝",
    ],
  },
];

// --- Глобальные переменные интерфейса ---
let root;
let headerTitleEl;
let avatarEmojiEl;
let avatarNameEl;
let chatContainer;
let hintEl;
let buttonsContainer;

let currentLevelIndex = 0;
let currentStepIndex = 0;

// --- Вспомогательные функции UI ---

function getThemeColor(varName, fallback) {
  if (!window.getComputedStyle) return fallback;
  return (
    getComputedStyle(document.documentElement).getPropertyValue(varName) ||
    fallback
  );
}

function initLayout() {
  document.body.style.margin = "0";
  document.body.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
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
  document.body.appendChild(root);

  const card = document.createElement("div");
  card.style.width = "100%";
  card.style.maxWidth = "420px";
  card.style.backgroundColor = getThemeColor(
    "--tg-theme-bg-color",
    "#f5f6fa"
  );
  card.style.borderRadius = "32px";
  card.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
  card.style.display = "flex";
  card.style.flexDirection = "column";
  card.style.padding = "20px 20px 12px 20px";
  card.style.boxSizing = "border-box";
  root.appendChild(card);

  // Header
  const header = document.createElement("div");
  header.style.textAlign = "center";
  header.style.marginBottom = "12px";
  card.appendChild(header);

  headerTitleEl = document.createElement("div");
  headerTitleEl.style.fontSize = "20px";
  headerTitleEl.style.fontWeight = "700";
  headerTitleEl.style.letterSpacing = "2px";
  headerTitleEl.style.textTransform = "uppercase";
  headerTitleEl.style.marginBottom = "6px";
  headerTitleEl.style.fontFamily = "'SF Mono', ui-monospace, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
  headerTitleEl.style.color = getThemeColor(
    "--tg-theme-text-color",
    "#111"
  );
  header.appendChild(headerTitleEl);

  // Avatar
  const avatarWrap = document.createElement("div");
  avatarWrap.style.display = "flex";
  avatarWrap.style.flexDirection = "column";
  avatarWrap.style.alignItems = "center";
  avatarWrap.style.marginBottom = "10px";
  card.appendChild(avatarWrap);

  const avatarCircle = document.createElement("div");
  avatarCircle.style.width = "68px";
  avatarCircle.style.height = "68px";
  avatarCircle.style.borderRadius = "50%";
  avatarCircle.style.backgroundColor = "#bfc5d7";
  avatarCircle.style.display = "flex";
  avatarCircle.style.alignItems = "center";
  avatarCircle.style.justifyContent = "center";
  avatarCircle.style.fontSize = "34px";
  avatarCircle.style.marginBottom = "6px";
  avatarWrap.appendChild(avatarCircle);

  avatarEmojiEl = document.createElement("div");
  avatarCircle.appendChild(avatarEmojiEl);

  avatarNameEl = document.createElement("div");
  avatarNameEl.style.fontSize = "14px";
  avatarNameEl.style.fontWeight = "600";
  avatarNameEl.style.letterSpacing = "1px";
  avatarNameEl.style.textTransform = "uppercase";
  avatarNameEl.style.fontFamily = headerTitleEl.style.fontFamily;
  avatarNameEl.style.color = getThemeColor(
    "--tg-theme-hint-color",
    "#555"
  );
  avatarWrap.appendChild(avatarNameEl);

  // Chat container
  chatContainer = document.createElement("div");
  chatContainer.style.flex = "1";
  chatContainer.style.padding = "12px";
  chatContainer.style.borderRadius = "24px";
  chatContainer.style.backgroundColor = "#e0e4f1";
  chatContainer.style.overflowY = "auto";
  chatContainer.style.maxHeight = "60vh";
  card.appendChild(chatContainer);

  // Hint
  hintEl = document.createElement("div");
  hintEl.style.minHeight = "20px";
  hintEl.style.fontSize = "13px";
  hintEl.style.margin = "6px 6px 4px";
  hintEl.style.color = "#e74c3c";
  hintEl.style.fontFamily = headerTitleEl.style.fontFamily;
  card.appendChild(hintEl);

  // Buttons container
  buttonsContainer = document.createElement("div");
  buttonsContainer.style.marginTop = "6px";
  buttonsContainer.style.paddingTop = "6px";
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
  bubble.style.fontFamily = "'SF Mono', ui-monospace, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";

  if (from === "client") {
    bubble.style.backgroundColor = "#cde3ff";
    bubble.style.color = "#000";
    bubble.style.border = "2px solid #99b9ff";
  } else if (from === "user") {
    bubble.style.backgroundColor = "#c8f7c5";
    bubble.style.color = "#000";
    bubble.style.border = "2px solid #9adf90";
  } else {
    bubble.style.backgroundColor = "#f5f5f5";
    bubble.style.color = "#333";
    bubble.style.border = "1px dashed #aaa";
  }

  bubble.textContent = text;
  row.appendChild(bubble);
  chatContainer.appendChild(row);
  chatContainer.scrollTop = chatContainer.scrollHeight;
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
    btn.style.borderRadius = "18px";
    btn.style.border = "2px solid #000";
    btn.style.backgroundColor = "#ffffff";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "14px";
    btn.style.fontFamily = "'SF Mono', ui-monospace, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
    btn.onmouseenter = () => (btn.style.backgroundColor = "#c8f7c5");
    btn.onmouseleave = () => (btn.style.backgroundColor = "#ffffff");
    btn.onclick = () => onClick(index, label);
    buttonsContainer.appendChild(btn);
  });
}

function disableButtons() {
  Array.from(buttonsContainer.querySelectorAll("button")).forEach((btn) => {
    btn.disabled = true;
    btn.style.opacity = "0.6";
    btn.style.cursor = "default";
  });
}

// --- Логика уровней ---

function startLevel(index) {
  const level = LEVELS[index];
  currentLevelIndex = index;
  currentStepIndex = 0;

  headerTitleEl.textContent = level.title.toUpperCase();
  avatarEmojiEl.textContent = level.avatarEmoji;
  avatarNameEl.textContent = level.clientName;
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
    renderButtons(step.buttons, (choiceIndex, label) =>
      handleStepChoice(level, stepIndex, choiceIndex, label)
    );
  }
}

// --- ВАЖНО: исправленная функция без задвоения реплик ---
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

  // Диалог берём только из step.dialog.
  // Если вдруг он отсутствует — показываем хотя бы текст кнопки.
  const dialog =
    step.dialog && step.dialog.length
      ? step.dialog
      : [{ from: "user", text: buttonText }];

  let delay = 0;
  dialog.forEach((replica) => {
    setTimeout(() => {
      addMessage(replica.text, replica.from);
    }, delay);
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

// --- Финальное решение по уровню ---

function renderFinalChoice(level) {
  renderButtons(
    ["Клиент адекватный ✅", "Клиент неадекватный ❌"],
    (index) => {
      const playerThinksAdequate = index === 0;
      handleFinalChoice(level, playerThinksAdequate);
    }
  );
}

function handleFinalChoice(level, playerThinksAdequate) {
  disableButtons();
  setHint("");

  const text =
    playerThinksAdequate && level.clientIsAdequate
      ? "Считаю, что клиент вполне адекватный и с ним можно работать. 🙂"
      : !playerThinksAdequate && !level.clientIsAdequate
      ? "Считаю, что сотрудничество не выглядит здоровым, лучше отказаться. 🚪"
      : playerThinksAdequate && !level.clientIsAdequate
      ? "Кажется, я переоценил(а) этого клиента и проигнорировал(а) красные флаги. 😬"
      : "Я, похоже, слишком подозрителен(на) к этому клиенту. 😅";

  addMessage(text, "user");

  const isSuccess = playerThinksAdequate === level.clientIsAdequate;

  setTimeout(() => {
    showResultScreen(level, isSuccess);
  }, 700);
}

// --- Экран результата ---

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
    ["⭐️", "🌟", "⭐️"].forEach((emoji) => {
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
    "'SF Mono', ui-monospace, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
  title.style.marginBottom = "16px";
  title.style.letterSpacing = "6px";
  title.style.textTransform = "uppercase";
  title.style.color = getThemeColor(
    "--tg-theme-text-color",
    "#000"
  );
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
    "'SF Mono', ui-monospace, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
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
  bullets.forEach((t) => {
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
  btn.style.color = getThemeColor(
    "--tg-theme-button-text-color",
    "#fff"
  );
  btn.onclick = () => {
    if (currentLevelIndex < LEVELS.length - 1) {
      root.innerHTML = "";
      initLayout();
      startLevel(currentLevelIndex + 1);
    } else {
      root.innerHTML = "";
      initLayout();
      startLevel(0);
    }
  };
  wrap.appendChild(btn);
}

// --- Старт игры ---
initLayout();
startLevel(0);
