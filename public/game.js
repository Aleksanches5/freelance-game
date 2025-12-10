// game.js
// Игра "Фрилансер и клиенты" — 5 уровней

// Инициализация Telegram WebApp (если запущено в Телеге)
if (window.Telegram && window.Telegram.WebApp) {
  const tg = window.Telegram.WebApp;
  tg.expand();
  tg.ready();
}

// ---------- БАЗОВЫЙ UI (телефон, чат, кнопки) ---------- //

function createLayout() {
  document.body.style.margin = "0";
  document.body.style.background = "#d7d7dc";
  document.body.style.fontFamily = "'JetBrains Mono', 'Fira Code', monospace";

  const wrapper = document.createElement("div");
  wrapper.style.maxWidth = "420px";
  wrapper.style.margin = "0 auto";
  wrapper.style.minHeight = "100vh";
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "flex-start";
  wrapper.style.padding = "16px";
  document.body.innerHTML = "";
  document.body.appendChild(wrapper);

  const title = document.createElement("h1");
  title.id = "level-title";
  title.style.fontSize = "18px";
  title.style.margin = "8px 0 16px 0";
  title.style.textAlign = "center";
  wrapper.appendChild(title);

  const phone = document.createElement("div");
  phone.style.width = "320px";
  phone.style.borderRadius = "24px";
  phone.style.background = "#f0f0f3";
  phone.style.boxShadow = "0 8px 20px rgba(0,0,0,0.25)";
  phone.style.padding = "16px 14px 18px 14px";
  phone.style.display = "flex";
  phone.style.flexDirection = "column";
  wrapper.appendChild(phone);

  // "Аватарка"
  const head = document.createElement("div");
  head.style.display = "flex";
  head.style.flexDirection = "column";
  head.style.alignItems = "center";
  head.style.marginBottom = "8px";

  const avatarCircle = document.createElement("div");
  avatarCircle.id = "avatar-circle";
  avatarCircle.style.width = "40px";
  avatarCircle.style.height = "40px";
  avatarCircle.style.borderRadius = "50%";
  avatarCircle.style.background = "#c8c8c8";
  avatarCircle.style.display = "flex";
  avatarCircle.style.alignItems = "center";
  avatarCircle.style.justifyContent = "center";
  avatarCircle.style.fontSize = "20px";
  head.appendChild(avatarCircle);

  const nameLabel = document.createElement("div");
  nameLabel.id = "avatar-name";
  nameLabel.style.fontSize = "12px";
  nameLabel.style.marginTop = "4px";
  nameLabel.style.color = "#444";
  head.appendChild(nameLabel);

  phone.appendChild(head);

  // Чат
  const chat = document.createElement("div");
  chat.id = "chat";
  chat.style.flex = "1";
  chat.style.minHeight = "260px";
  chat.style.background = "#e4e4ea";
  chat.style.borderRadius = "18px";
  chat.style.padding = "10px";
  chat.style.overflowY = "auto";
  phone.appendChild(chat);

  // Подсказки / ошибки
  const hint = document.createElement("div");
  hint.id = "hint";
  hint.style.minHeight = "32px";
  hint.style.marginTop = "8px";
  hint.style.fontSize = "11px";
  hint.style.color = "#c53030";
  hint.style.display = "flex";
  hint.style.alignItems = "flex-start";
  hint.style.gap = "4px";
  phone.appendChild(hint);

  // Зона кнопок выбора
  const controls = document.createElement("div");
  controls.id = "controls";
  controls.style.marginTop = "8px";
  phone.appendChild(controls);

  // Панель под телефоном – кнопки "повторить / следующий"
  const footer = document.createElement("div");
  footer.id = "footer-controls";
  footer.style.marginTop = "12px";
  wrapper.appendChild(footer);
}

function addMessage(text, from) {
  const chat = document.getElementById("chat");
  const row = document.createElement("div");
  row.style.display = "flex";
  row.style.marginBottom = "6px";

  const bubble = document.createElement("div");
  bubble.textContent = text;
  bubble.style.padding = "8px 10px";
  bubble.style.borderRadius = "14px";
  bubble.style.fontSize = "12px";
  bubble.style.maxWidth = "80%";
  bubble.style.lineHeight = "1.3";
  bubble.style.border = "1px solid rgba(0,0,0,0.12)";

  if (from === "client") {
    row.style.justifyContent = "flex-start";
    bubble.style.background = "#bcdcff";
  } else if (from === "user") {
    row.style.justifyContent = "flex-end";
    bubble.style.background = "#c6f7bf";
  } else {
    row.style.justifyContent = "center";
    bubble.style.background = "#fff";
  }

  row.appendChild(bubble);
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;
}

function setHint(text) {
  const hint = document.getElementById("hint");
  if (!text) {
    hint.textContent = "";
    return;
  }
  hint.innerHTML = "";
  const ex = document.createElement("span");
  ex.textContent = "!";
  ex.style.fontWeight = "bold";
  ex.style.fontSize = "16px";
  ex.style.marginRight = "2px";
  hint.appendChild(ex);

  const span = document.createElement("span");
  span.textContent = text;
  hint.appendChild(span);
}

function clearControls() {
  const controls = document.getElementById("controls");
  controls.innerHTML = "";
}

function renderButtons(options, onClick) {
  clearControls();
  const controls = document.getElementById("controls");

  options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.style.width = "100%";
    btn.style.marginBottom = "6px";
    btn.style.padding = "8px 10px";
    btn.style.borderRadius = "16px";
    btn.style.border = "2px solid #000";
    btn.style.background = "#ffffff";
    btn.style.fontSize = "11px";
    btn.style.fontFamily = "'JetBrains Mono', 'Fira Code', monospace";
    btn.style.cursor = "pointer";
    btn.onmouseenter = () => (btn.style.background = "#aef4a5");
    btn.onmouseleave = () => (btn.style.background = "#ffffff");
    btn.onclick = () => onClick(index, opt);
    controls.appendChild(btn);
  });
}

function disableButtons() {
  const controls = document.getElementById("controls");
  Array.from(controls.querySelectorAll("button")).forEach((b) => {
    b.disabled = true;
    b.style.opacity = "0.7";
    b.style.cursor = "default";
  });
}

// ---------- ОПИСАНИЕ УРОВНЕЙ (универсальный формат) ---------- //
//
// Каждый уровень — объект вида:
// {
//   id, name, avatar,
//   entryMessage: "первое сообщение клиента",
//   steps: [
//     {
//       choices: [строки кнопок],
//       errors: [строки ошибок или null],
//       dialog: [
//         { from: "user"|"client", text: "..." },
//         ...
//       ]
//     },
//     ...
//   ],
//   correctFinal: "adequate" | "inadequate",
//   result: {
//     correct: { title, subtitle, reasons: [] },
//     wrong:   { title, subtitle, reasons: [] }
//   }
// }

const level1 = {
  id: 1,
  name: "Елена",
  avatar: "👩‍💻",
  entryMessage:
    "Привет! Хочу заказать лендинг. Есть текст и структура, нужен дизайн + вёрстка.",
  steps: [
    {
      // Первый и единственный выбор
      choices: [
        "Здравствуйте! Как вы будете оплачивать?",
        "Здравствуйте! Какой стиль вам больше всего подходит?",
        "Здравствуйте! Какие примерно сроки и бюджет?"
      ],
      errors: [
        "Рановато говорить об оплате — сначала уточни общие детали.",
        "Сначала лучше уточнить сроки и бюджет, а стиль обсудить позже.",
        null // третья — правильная
      ],
      dialog: [
        { from: "user", text: "Здравствуйте! Какие примерно сроки и бюджет?" },
        {
          from: "client",
          text: "10 дней, оплата по этапам. Если всё ок — буду работать с тобой дальше."
        }
      ]
    }
  ],
  correctFinal: "adequate",
  result: {
    correct: {
      title: "УСПЕХ!",
      subtitle: "Почему выбор верный:",
      reasons: [
        "Клиент чётко ставит задачу и описывает формат оплаты.",
        "Сроки адекватны для лендинга.",
        "Оплата по этапам снижает риски для фрилансера."
      ]
    },
    wrong: {
      title: "ПРОВАЛ!",
      subtitle: "Почему выбор неверный:",
      reasons: [
        "Клиент даёт понятные сроки и формат работы.",
        "Нет признаков неуважения или токсичного поведения.",
        "Такого клиента лучше отнести к адекватным."
      ]
    }
  }
};

const level2 = {
  id: 2,
  name: "Игорь",
  avatar: "👨‍💼",
  entryMessage:
    "Добрый день! Нужен сайт-портфолио. Фото есть, тексты частично, хочу за 3 дня и «чтоб вау».",
  steps: [
    {
      // Шаг 1 — фиксируем реальность задачи
      choices: [
        "Давайте уточним объём работ, сроки и бюджет — похоже, задачи много.",
        "Сколько готовы заплатить? Сроки обсудим потом.",
        "Без проблем, сделаем за 3 дня, даже если не высплюсь!"
      ],
      errors: [
        null,
        "Сначала важно понять и объём, и сроки, и бюджет вместе.",
        "Опасно сразу соглашаться на нереальные сроки."
      ],
      dialog: [
        {
          from: "user",
          text: "Давайте уточним объём работ, сроки и бюджет — похоже, задачи много."
        },
        {
          from: "client",
          text: "Окей, давай реалистичнее — неделя и по этапам. Главное, чтобы смотрелось круто."
        }
      ]
    },
    {
      // Шаг 2 — уточняем формат работы
      choices: [
        "Сделаем. Подготовлю структуру, прототип и дизайн, заложим два круга правок.",
        "Сделаем, но без правок вообще — это сильно замедляет работу.",
        "Я могу только сверстать по готовому дизайну, концепцию делать не буду."
      ],
      errors: [
        null,
        "Полный отказ от правок создаёт напряжение даже с нормальным клиентом.",
        "Клиент изначально просил портфолио «под ключ», а ты сужаешь задачу без обсуждения."
      ],
      dialog: [
        {
          from: "user",
          text: "Сделаем. Подготовлю структуру, прототип и дизайн, заложим два круга правок."
        },
        {
          from: "client",
          text: "Отлично, давай так. Жду от тебя первые наброски."
        }
      ]
    }
  ],
  correctFinal: "adequate",
  result: {
    correct: {
      title: "УСПЕХ!",
      subtitle: "Почему выбор верный:",
      reasons: [
        "Клиент готов обсуждать сроки и бюджет.",
        "Соглашается на вменяемое количество правок.",
        "Ожидания можно зафиксировать и работать поэтапно."
      ]
    },
    wrong: {
      title: "ПРОВАЛ!",
      subtitle: "Почему выбор неверный:",
      reasons: [
        "Клиент проявлял гибкость и готовность к диалогу.",
        "Нереальное требование «3 дня и вау» удалось перевести в реальность.",
        "Это скорее сложный, но адекватный клиент, а не токсичный."
      ]
    }
  }
};

// Уровень 3 — логика как у "токсичного" клиента: 2 шага, финал — неадекватный
const level3 = {
  id: 3,
  name: "Мария",
  avatar: "👩‍🦰",
  entryMessage:
    "Здравствуйте! Мне нужен интернет-магазин косметики. Очень срочно. В идеале — сегодня.",
  steps: [
    {
      // Шаг 1
      choices: [
        "Здравствуйте! Давайте уточним объём магазина?",
        "Здравствуйте! А сегодня — это до какого времени?",
        "Здравствуйте! Уточните, пожалуйста, функционал магазина."
      ],
      errors: [
        "Лучше начать с функционала и объёма, а не с абстрактного «магазина».",
        null,
        null
      ],
      dialog: [
        {
          from: "user",
          text: "Здравствуйте! Уточните, пожалуйста, функционал магазина."
        },
        {
          from: "client",
          text: "Мне нужно просто, чтобы магазин работал! Каталог, корзина, оплата. Это же делается быстро!"
        }
      ]
    },
    {
      // Шаг 2
      choices: [
        "Для такого магазина нужны и дизайн, и бэкенд — за один день это нереалистично.",
        "Хорошо, но нужен подробный список страниц и функций. Без него сроки не оценить.",
        "Можно попробовать, если убрать каталог и оставить только одну страницу."
      ],
      errors: [
        null,
        null,
        "Ты сразу сильно режешь функционал, не обсудив ожидания по итоговому результату."
      ],
      dialog: [
        {
          from: "user",
          text: "Для такого магазина нужны и дизайн, и бэкенд — за один день это нереалистично."
        },
        {
          from: "client",
          text: "Почему вы всё усложняете? Я думала, вы профессионал! Разве сложно просто сделать магазин?!"
        }
      ]
    }
  ],
  correctFinal: "inadequate",
  result: {
    correct: {
      title: "УСПЕХ!",
      subtitle: "Почему выбор верный:",
      reasons: [
        "Клиент ставит заведомо нереалистичные сроки.",
        "Не слышит объяснения про объём и технические ограничения.",
        "Начинает обвинять исполнителя вместо диалога."
      ]
    },
    wrong: {
      title: "ПРОВАЛ!",
      subtitle: "Почему выбор неверный:",
      reasons: [
        "Игнорируются красные флаги: нереальные сроки и агрессия.",
        "Такие проекты часто заканчиваются конфликтами и выгоранием.",
        "Фрилансеру важно уметь отказывать токсичным клиентам."
      ]
    }
  }
};

// Уровень 4 — та же логика, что и у 3-го: 2 шага, финал — неадекватный
const level4 = {
  id: 4,
  name: "Сергей",
  avatar: "👨‍🎨",
  entryMessage:
    "Привет. Нужен логотип, фирстиль, презентация и сайт. Бюджет маленький, но если понравится — «порекомендуем друзьям».",
  steps: [
    {
      // Шаг 1 — выявляем объём
      choices: [
        "Здравствуйте! Давайте разделим задачи: логотип, фирстиль, презентация и сайт — это четыре больших блока.",
        "Здравствуйте! Сколько вы готовы заплатить?",
        "Здравствуйте! Сколько у вас уже есть материалов?"
      ],
      errors: [
        null,
        "Первая реакция только на бюджет может создать впечатление, что тебе не важны задачи.",
        null
      ],
      dialog: [
        {
          from: "user",
          text: "Здравствуйте! Давайте разделим задачи: логотип, фирстиль, презентация и сайт — это четыре больших блока."
        },
        {
          from: "client",
          text: "Да, всё сразу. Хочется, чтобы бренд выглядел как у крупных компаний, но бюджет как у стартапа."
        }
      ]
    },
    {
      // Шаг 2 — пытаемся зафиксировать рамки
      choices: [
        "При таком объёме важно либо увеличить бюджет и сроки, либо сократить задачи.",
        "Давайте начнём бесплатно, а потом вы решите, стоит ли платить.",
        "Сделаю всё за ваш бюджет, но без правок."
      ],
      errors: [
        null,
        "Бесплатный старт — классический красный флаг для фрилансера.",
        "Полный отказ от правок при большом брендинговом проекте — путь к конфликту."
      ],
      dialog: [
        {
          from: "user",
          text: "При таком объёме важно либо увеличить бюджет и сроки, либо сократить задачи."
        },
        {
          from: "client",
          text: "Нет, увеличивать бюджет не будем. Хочется всё и сразу. Если ты хороший специалист, тебе это несложно."
        }
      ]
    }
  ],
  correctFinal: "inadequate",
  result: {
    correct: {
      title: "УСПЕХ!",
      subtitle: "Почему выбор верный:",
      reasons: [
        "Клиент хочет максимум за минимум, без готовности к компромиссам.",
        "Не готов увеличивать бюджет при огромном объёме работ.",
        "Давит на «если ты хороший специалист», вместо конструктивного диалога."
      ]
    },
    wrong: {
      title: "ПРОВАЛ!",
      subtitle: "Почему выбор неверный:",
      reasons: [
        "Игнорируются признаки обесценивания работы.",
        "Фраза «максимум за минимум» почти всегда сигнализирует о проблемах.",
        "Такие проекты редко заканчиваются без конфликтов и выгорания."
      ]
    }
  }
};

// Уровень 5 — сложный клиент, 3 шага, финал адекватный
const level5 = {
  id: 5,
  name: "Анна",
  avatar: "👩‍💼",
  entryMessage:
    "Здравствуйте! Нужен лендинг для сервиса подписки. Дедлайн жёсткий, бюджет ограничен, правок может быть много.",
  steps: [
    {
      // Шаг 1 — приветствие и первичное прояснение
      choices: [
        "Здравствуйте! Давайте зафиксируем дедлайн, бюджет и основные блоки лендинга.",
        "Здравствуйте! Я смогу помочь, если вы будете брать минимум правок.",
        "Здравствуйте! Мне нужны все тексты и визуал до начала работы."
      ],
      errors: [
        null,
        "Ставить условие по правкам в самом приветствии — слишком жёстко.",
        "Тексты и визуал можно доработать по ходу, если есть базовая структура."
      ],
      dialog: [
        {
          from: "user",
          text: "Здравствуйте! Давайте зафиксируем дедлайн, бюджет и основные блоки лендинга."
        },
        {
          from: "client",
          text: "Дедлайн — 10 дней, бюджет ограничен, но если всё пойдёт хорошо, будем работать дальше."
        }
      ]
    },
    {
      // Шаг 2 — обсуждаем объём и границы
      choices: [
        "Тогда предлагаю: один основной лендинг + простая благодарность, без сложных анимаций.",
        "Давайте сразу заложим максимум сценариев и уникальных блоков, чтобы точно «зашло».",
        "Сделаем только структуру, без дизайна и верстки."
      ],
      errors: [
        null,
        "Слишком большой объём при ограниченном бюджете и сроках — это риск для тебя.",
        "Клиент просил именно лендинг, а не только структуру."
      ],
      dialog: [
        {
          from: "user",
          text: "Тогда предлагаю: один основной лендинг + простая благодарность, без сложных анимаций."
        },
        {
          from: "client",
          text: "Хорошо, главное — чтобы оффер был понятен, а структура логичной."
        }
      ]
    },
    {
      // Шаг 3 — согласование подхода к правкам
      choices: [
        "Давайте заложим два круга правок: первый по структуре, второй по визуалу.",
        "Правки принимаю только один раз, иначе проект не двинется.",
        "Любое количество правок — главное, чтобы вы были довольны."
      ],
      errors: [
        null,
        "Один жёсткий круг правок может вызвать сопротивление у адекватного клиента.",
        "Любое количество правок без ограничений — риск бесконечного проекта."
      ],
      dialog: [
        {
          from: "user",
          text: "Давайте заложим два круга правок: первый по структуре, второй по визуалу."
        },
        {
          from: "client",
          text: "Отличный подход. Так будет проще контролировать процесс и не застрять в бесконечных правках."
        }
      ]
    }
  ],
  correctFinal: "adequate",
  result: {
    correct: {
      title: "УСПЕХ!",
      subtitle: "Почему выбор верный:",
      reasons: [
        "Клиент честно обозначает риски: сроки, бюджет и правки.",
        "Готов обсуждать рамки проекта и идти на компромисс.",
        "Соглашается на адекватное количество правок и понятную структуру."
      ]
    },
    wrong: {
      title: "ПРОВАЛ!",
      subtitle: "Почему выбор неверный:",
      reasons: [
        "Клиент был готов к диалогу и ограничениям.",
        "Ты сам(а) предложил(а) разумную структуру и правила по правкам.",
        "Такого клиента лучше отнести к требовательным, но адекватным."
      ]
    }
  }
};

const levels = [level1, level2, level3, level4, level5];

// ---------- ЛОГИКА ИГРЫ ---------- //

let currentLevelIndex = 0;
let currentStepIndex = 0;

function startLevel(index) {
  currentLevelIndex = index;
  currentStepIndex = 0;

  const level = levels[currentLevelIndex];

  const titleEl = document.getElementById("level-title");
  titleEl.textContent = `Уровень ${level.id}: ${level.name}`;

  const avatarCircle = document.getElementById("avatar-circle");
  avatarCircle.textContent = level.avatar || "";

  const avatarName = document.getElementById("avatar-name");
  avatarName.textContent = level.name;

  const chat = document.getElementById("chat");
  chat.innerHTML = "";

  setHint("");

  // Первое сообщение клиента
  addMessage(level.entryMessage, "client");

  // Первый шаг
  renderStep(level, currentStepIndex);

  // Очистить нижнюю панель (кнопки "повторить"/"следующий")
  const footer = document.getElementById("footer-controls");
  footer.innerHTML = "";
}

function renderStep(level, stepIndex) {
  const step = level.steps[stepIndex];
  renderButtons(step.choices, (choiceIndex, text) =>
    handleStepChoice(level, stepIndex, choiceIndex, text)
  );
}

function handleStepChoice(level, stepIndex, choiceIndex, text) {
  const step = level.steps[stepIndex];
  const errorText =
    step.errors && step.errors[choiceIndex] ? step.errors[choiceIndex] : null;

  if (errorText) {
    setHint(errorText);
    return;
  }

  setHint("");
  disableButtons();

  // Сообщение пользователя — выбранная фраза (или зашитая в диалоге)
  // Здесь мы показываем именно текст кнопки
  addMessage(text, "user");

  // Затем проигрываем сценарий диалога для этого шага
  const dialog = step.dialog || [];
  let delay = 400;
  dialog.forEach((replica) => {
    setTimeout(() => {
      addMessage(replica.text, replica.from);
    }, delay);
    delay += 400;
  });

  // После диалога переходим к следующему шагу или к финальному выбору
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
  const options = ["Неадекватный", "Адекватный"];

  renderButtons(options, (index, text) => {
    const value = text === "Адекватный" ? "adequate" : "inadequate";
    handleFinalChoice(level, value, text);
  });
}

function handleFinalChoice(level, value, labelText) {
  disableButtons();
  setHint("");
  addMessage(labelText, "user");

  const isCorrect = value === level.correctFinal;

  setTimeout(() => {
    showResult(level, isCorrect);
  }, 600);
}

function showResult(level, isCorrect) {
  const chat = document.getElementById("chat");
  const controls = document.getElementById("controls");
  const hint = document.getElementById("hint");
  const footer = document.getElementById("footer-controls");

  chat.innerHTML = "";
  controls.innerHTML = "";
  hint.innerHTML = "";

  const box = document.createElement("div");
  box.style.width = "100%";
  box.style.textAlign = "center";
  box.style.marginTop = "20px";

  const svgWrap = document.createElement("div");
  svgWrap.style.marginBottom = "16px";
  svgWrap.style.display = "flex";
  svgWrap.style.justifyContent = "center";
  svgWrap.style.gap = "10px";

  if (isCorrect) {
    // Звёзды
    for (let i = 0; i < 3; i++) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", i === 1 ? "80" : "60");
      svg.setAttribute("height", i === 1 ? "80" : "60");
      svg.setAttribute("viewBox", "0 0 100 100");
      const poly = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon"
      );
      poly.setAttribute(
        "points",
        "50,15 61,40 88,40 67,57 73,85 50,70 27,85 33,57 12,40 39,40"
      );
      poly.setAttribute("fill", "#FFD700");
      poly.setAttribute("stroke", "#FFA500");
      poly.setAttribute("stroke-width", "2");
      svg.appendChild(poly);
      svgWrap.appendChild(svg);
    }
  } else {
    // Череп
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "90");
    svg.setAttribute("height", "90");
    svg.setAttribute("viewBox", "0 0 100 100");
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "40");
    circle.setAttribute("r", "25");
    circle.setAttribute("fill", "#fff");
    circle.setAttribute("stroke", "#000");
    circle.setAttribute("stroke-width", "2");
    svg.appendChild(circle);

    const eye1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "ellipse"
    );
    eye1.setAttribute("cx", "42");
    eye1.setAttribute("cy", "38");
    eye1.setAttribute("rx", "5");
    eye1.setAttribute("ry", "7");
    eye1.setAttribute("fill", "#000");
    svg.appendChild(eye1);

    const eye2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "ellipse"
    );
    eye2.setAttribute("cx", "58");
    eye2.setAttribute("cy", "38");
    eye2.setAttribute("rx", "5");
    eye2.setAttribute("ry", "7");
    eye2.setAttribute("fill", "#000");
    svg.appendChild(eye2);

    const mouth = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    mouth.setAttribute("d", "M 40 55 Q 50 50 60 55");
    mouth.setAttribute("stroke", "#000");
    mouth.setAttribute("stroke-width", "3");
    mouth.setAttribute("fill", "none");
    svg.appendChild(mouth);

    svgWrap.appendChild(svg);
  }

  box.appendChild(svgWrap);

  const title = document.createElement("div");
  title.textContent = isCorrect
    ? level.result.correct.title
    : level.result.wrong.title;
  title.style.fontSize = "28px";
  title.style.fontWeight = "bold";
  title.style.marginBottom = "12px";
  box.appendChild(title);

  const infoBox = document.createElement("div");
  infoBox.style.borderRadius = "18px";
  infoBox.style.padding = "12px";
  infoBox.style.textAlign = "left";
  infoBox.style.fontSize = "12px";
  infoBox.style.lineHeight = "1.4";
  infoBox.style.background = isCorrect ? "#90EE90" : "#FFB6C1";
  infoBox.style.color = "#000";

  const subtitle = document.createElement("div");
  subtitle.textContent = isCorrect
    ? level.result.correct.subtitle
    : level.result.wrong.subtitle;
  subtitle.style.fontWeight = "bold";
  subtitle.style.marginBottom = "6px";
  infoBox.appendChild(subtitle);

  const reasons = isCorrect
    ? level.result.correct.reasons
    : level.result.wrong.reasons;

  reasons.forEach((r) => {
    const line = document.createElement("div");
    line.textContent = "✓ " + r;
    infoBox.appendChild(line);
  });

  box.appendChild(infoBox);
  chat.appendChild(box);

  // Кнопки снизу
  footer.innerHTML = "";
  const btn = document.createElement("button");
  btn.style.marginTop = "12px";
  btn.style.padding = "8px 14px";
  btn.style.borderRadius = "999px";
  btn.style.border = "none";
  btn.style.cursor = "pointer";
  btn.style.fontFamily = "'JetBrains Mono', 'Fira Code', monospace";
  btn.style.background = "#3390ec";
  btn.style.color = "#fff";
  btn.style.fontSize = "12px";

  const isLastLevel = currentLevelIndex === levels.length - 1;

  if (isLastLevel) {
    btn.textContent = "Пройти игру заново";
    btn.onclick = () => startLevel(0);
  } else {
    btn.textContent = "Следующий уровень";
    btn.onclick = () => startLevel(currentLevelIndex + 1);
  }

  footer.appendChild(btn);
}

// ---------- СТАРТ ---------- //

window.addEventListener("DOMContentLoaded", () => {
  createLayout();
  startLevel(0);
});
