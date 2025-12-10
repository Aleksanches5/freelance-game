// game.js
// Мини-игра "Фрилансер и клиенты" – 3 уровня

// ---------- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ UI ---------- //

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

  // Зона кнопок
  const controls = document.createElement("div");
  controls.id = "controls";
  controls.style.marginTop = "8px";
  phone.appendChild(controls);

  // Панель под телефоном – кнопка "повторить / следующий"
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

// ---------- ОПИСАНИЕ УРОВНЕЙ ---------- //

const level1 = {
  id: 1,
  name: "Елена",
  avatar: "👩‍💻",
  startMessage:
    "Привет! Хочу заказать лендинг. Есть текст и структура, нужен дизайн + вёрстка.",
  firstChoices: [
    "Здравствуйте! Как вы будете оплачивать?",
    "Здравствуйте! Какой стиль вам больше всего подходит?",
    "Здравствуйте! Какие примерно сроки и бюджет?"
  ],
  firstErrors: [
    "Рановато говорить об оплате — сначала уточни общие детали.",
    "Сначала лучше уточнить сроки и бюджет, а не стили.",
    null // третья — правильная
  ],
  firstClientReply:
    "10 дней, оплата по этапам. Если всё ок — буду работать с тобой дальше.",
  // Уровень 1 — без второго набора реплик
  secondChoices: null,
  secondClientReply: null,
  correctFinal: "adequate",
  result: {
    correct: {
      title: "УСПЕХ!",
      subtitle: "Почему выбор верный:",
      reasons: [
        "Клиент чётко ставит задачу и описывает этапы работы",
        "Сроки вменяемые для лендинга",
        "Оплата по этапам — здоровый формат сотрудничества"
      ]
    },
    wrong: {
      title: "ПРОВАЛ!",
      subtitle: "Почему выбор неверный:",
      reasons: [
        "Клиент даёт понятные сроки и формат оплаты",
        "Нет признаков неуважения или странных требований",
        "Такого клиента лучше отнести к адекватным"
      ]
    }
  }
};

const level2 = {
  id: 2,
  name: "Андрей",
  avatar: "👨‍💼",
  startMessage:
    "Добрый день! Нужен лендинг под запуск курса. Структура есть, но придётся додумать блоки.",
  firstChoices: [
    "Сколько блоков вы планируете и какие дедлайны?",
    "Сколько будет стоить ваш курс?",
    "Сделаем, но только если без правок."
  ],
  firstErrors: [
    null, // первая — правильная
    "Цена курса сейчас не важна — лучше уточнить объём и сроки.",
    "Жёсткий отказ от правок может отпугнуть нормального клиента."
  ],
  firstClientReply:
    "Хотелось бы уложиться за 2 недели. По блокам — штук 8–10, нужен современный дизайн.",
  // Второе сообщение фрилансера с выбором
  secondChoices: [
    "Сделаем. Подготовлю прототип и дизайн, заложим 2 круга правок.",
    "Сделаем, но без правок вообще.",
    "Я могу только сверстать по готовому дизайну."
  ],
  secondClientReply:
    "Окей, давай тогда прототип + дизайн. С правками договорились.",
  correctFinal: "adequate",
  result: {
    correct: {
      title: "УСПЕХ!",
      subtitle: "Почему выбор верный:",
      reasons: [
        "Клиент обсуждает сроки и объём спокойно",
        "Готов работать по этапной логике и с правками",
        "Уважает профессиональное мнение исполнителя"
      ]
    },
    wrong: {
      title: "ПРОВАЛ!",
      subtitle: "Почему выбор неверный:",
      reasons: [
        "Клиент вёл себя конструктивно и был готов к диалогу",
        "Требования реалистичны для такого объёма работы",
        "Нет красных флагов, чтобы записывать его в неадекватные"
      ]
    }
  }
};

const level3 = {
  id: 3,
  name: "Мария",
  avatar: "👩‍🦰",
  startMessage:
    "Здравствуйте! Мне нужен интернет-магазин косметики. Очень срочно. В идеале — сегодня.",
  firstChoices: [
    "Здравствуйте! Давайте уточним объём магазина?",
    "Здравствуйте! А сегодня — это до какого времени?",
    "Здравствуйте! Уточните, пожалуйста, функционал магазина."
  ],
  firstErrors: [
    "Лучше начать с функционала и объёма, а не с абстрактного магазина.",
    null, // вторая — норм, но не лучшая
    null // третья — тоже допустима
  ],
  firstClientReply:
    "Мне нужно просто, чтобы магазин работал! Каталог, корзина, оплата. Это же делается быстро!",
  // Вторая реплика фрилансера с ВЫБОРОМ из трёх фраз
  secondChoices: [
    "Для такого магазина нужны и дизайн, и бэкенд — за один день это нереалистично.",
    "Хорошо, но нужен подробный список страниц и функций. Без него сроки не оценить.",
    "Можно попробовать, если убрать каталог и оставить только одну страницу."
  ],
  secondClientReply:
    "Почему вы всё усложняете? Я думала, вы профессионал! Разве сложно просто сделать магазин?!",
  correctFinal: "inadequate", // ВАЖНО: правильный ответ — НЕАДЕКВАТНЫЙ
  result: {
    correct: {
      title: "УСПЕХ!",
      subtitle: "Почему выбор верный:",
      reasons: [
        "Клиент ставит заведомо нереалистичные сроки",
        "Не слышит объяснения про объём и технические ограничения",
        "Начинает обвинять исполнителя вместо диалога"
      ]
    },
    wrong: {
      title: "ПРОВАЛ!",
      subtitle: "Почему выбор неверный:",
      reasons: [
        "Игнорируются красные флаги: нереальные сроки и агрессия",
        "Такое поведение быстро приведёт к выгоранию и конфликтам",
        "Важно уметь вовремя распознавать токсичных клиентов"
      ]
    }
  }
};

const levels = [level1, level2, level3];

// ---------- ЛОГИКА ИГРЫ ---------- //

let currentLevelIndex = 0;
let stage = 0; // 0 — первый выбор, 1 — второй выбор (если есть), 2 — финальная оценка

function startLevel(index) {
  currentLevelIndex = index;
  stage = 0;

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

  addMessage(level.startMessage, "client");

  // Первый выбор
  renderButtons(level.firstChoices, handleFirstChoice);

  // Очистить нижнюю панель (кнопки "повторить"/"следующий")
  const footer = document.getElementById("footer-controls");
  footer.innerHTML = "";
}

function handleFirstChoice(index, text) {
  const level = levels[currentLevelIndex];
  const errorText =
    level.firstErrors && level.firstErrors[index]
      ? level.firstErrors[index]
      : null;

  if (errorText) {
    setHint(errorText);
    return;
  }

  setHint("");
  disableButtons();
  addMessage(text, "user");

  setTimeout(() => {
    addMessage(level.firstClientReply, "client");

    // Есть ли второй набор реплик у фрилансера?
    if (level.secondChoices && level.secondChoices.length) {
      stage = 1;
      setTimeout(() => {
        renderButtons(level.secondChoices, handleSecondChoice);
      }, 400);
    } else {
      stage = 2;
      setTimeout(() => {
        renderFinalChoice();
      }, 400);
    }
  }, 500);
}

function handleSecondChoice(index, text) {
  const level = levels[currentLevelIndex];
  disableButtons();
  setHint("");
  addMessage(text, "user");

  setTimeout(() => {
    addMessage(level.secondClientReply, "client");
    stage = 2;
    setTimeout(() => {
      renderFinalChoice();
    }, 500);
  }, 500);
}

function renderFinalChoice() {
  const options = ["Неадекватный", "Адекватный"];

  renderButtons(options, (index, text) => {
    const value = text === "Адекватный" ? "adequate" : "inadequate";
    handleFinalChoice(value, text);
  });
}

function handleFinalChoice(value, labelText) {
  const level = levels[currentLevelIndex];
  disableButtons();
  setHint("");
  addMessage(labelText, "user");

  const isCorrect = value === level.correctFinal;

  setTimeout(() => {
    showResult(level, isCorrect);
  }, 600);
}

function showResult(level, isCorrect) {
  const wrapper = document.body.firstChild;
  const footer = document.getElementById("footer-controls");
  const chat = document.getElementById("chat");
  const controls = document.getElementById("controls");
  const hint = document.getElementById("hint");

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

    const eye1 = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    eye1.setAttribute("cx", "42");
    eye1.setAttribute("cy", "38");
    eye1.setAttribute("rx", "5");
    eye1.setAttribute("ry", "7");
    eye1.setAttribute("fill", "#000");
    svg.appendChild(eye1);

    const eye2 = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    eye2.setAttribute("cx", "58");
    eye2.setAttribute("cy", "38");
    eye2.setAttribute("rx", "5");
    eye2.setAttribute("ry", "7");
    eye2.setAttribute("fill", "#000");
    svg.appendChild(eye2);

    const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");
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

  // Кнопки внизу
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

// ---------- ЗАПУСК ---------- //

window.addEventListener("DOMContentLoaded", () => {
  createLayout();
  startLevel(0);
});
