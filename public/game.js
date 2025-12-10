// Инициализация Telegram WebApp (если запущено в Телеге)
if (window.Telegram && window.Telegram.WebApp) {
  const tg = window.Telegram.WebApp;
  tg.expand();
  tg.ready();
}

const chatEl = document.getElementById('chat');
const hintEl = document.getElementById('hint');
const choicesEl = document.getElementById('choices');
const resultEl = document.getElementById('result');
const levelTitleEl = document.getElementById('level-title');
const phoneSubtitleEl = document.getElementById('phone-subtitle');

let currentLevelIndex = 0;
let stage = 'greeting'; // greeting | decision | result

// ---------- ОПИСАНИЕ УРОВНЕЙ ----------

const levels = [
  // ===== УРОВЕНЬ 1: ЕЛЕНА =====
  {
    id: 'elena',
    title: 'Уровень 1: Елена',
    clientName: 'Елена',

    firstMessage:
      'Привет! Хочу заказать лендинг. Есть текст и структура, нужен дизайн + вёрстка.',

    greetingOptions: [
      {
        id: 'pay',
        text: 'Здравствуйте! Как вы будете оплачивать?',
        wrongHint: 'Рановато говорить об этом! Сначала узнай сроки и бюджет.'
      },
      {
        id: 'style',
        text: 'Здравствуйте! Какой стиль вам больше всего подходит?',
        wrongHint:
          'Сначала важнее понять сроки и бюджет, а стиль обсудите потом.'
      },
      {
        id: 'correct',
        text: 'Здравствуйте! Какие примерно сроки и бюджет?',
        correct: true
      }
    ],

    afterCorrectDialogue: [
      {
        from: 'user',
        text: 'Здравствуйте! Какие примерно сроки и бюджет?'
      },
      {
        from: 'client',
        text: '10 дней, оплата по этапам. Если всё ок — буду работать с тобой дальше.'
      }
    ],

    decisionButtons: {
      badLabel: 'Неадекватный',
      goodLabel: 'Адекватный'
    },

    // на первых двух уровнях успех — это выбрать "Адекватный"
    successChoice: 'good',

    success: {
      title: 'УСПЕХ!',
      color: '#90EE90',
      reasons: [
        'Чётко ставит задачу',
        'Адекватные сроки',
        'Оплата по этапам'
      ]
    },

    fail: {
      title: 'ПРОВАЛ!',
      color: '#FFB6C1',
      reasons: [
        'Клиент как раз адекватный',
        'Чётко сформулировал запрос',
        'Долгоиграющее сотрудничество — это плюс'
      ]
    }
  },

  // ===== УРОВЕНЬ 2: ИГОРЬ =====
  {
    id: 'igor',
    title: 'Уровень 2: Игорь',
    clientName: 'Игорь',

    firstMessage:
      'Привет! Нужен сайт-портфолио. Фото есть, тексты частично, хочу за 3 дня и «чтоб вау».',

    greetingOptions: [
      {
        id: 'tooFast',
        text: 'Без проблем, сделаю за 3 дня, даже если не высплюсь!',
        wrongHint:
          'Опасно сразу соглашаться на нереальные сроки. Лучше сначала прояснить объём и бюджет.'
      },
      {
        id: 'budgetOnly',
        text: 'Сколько готовы заплатить? Сроки обсудим потом.',
        wrongHint:
          'Сначала лучше обсудить и сроки, и объём работ вместе с бюджетом.'
      },
      {
        id: 'correct',
        text: 'Давайте уточним объём работ, сроки и бюджет — похоже, задачи много.',
        correct: true
      }
    ],

    afterCorrectDialogue: [
      {
        from: 'user',
        text: 'Давайте уточним объём работ, сроки и бюджет — похоже, задачи много.'
      },
      {
        from: 'client',
        text: 'Ок, давай реалистично — неделя и по этапам, главное, чтобы смотрелось круто.'
      }
    ],

    decisionButtons: {
      badLabel: 'Неадекватный',
      goodLabel: 'Адекватный'
    },

    successChoice: 'good',

    success: {
      title: 'УСПЕХ!',
      color: '#90EE90',
      reasons: [
        'Ты не согласился на «3 дня и вау»',
        'Сместил акцент на реальный объём работ',
        'Перевёл запрос в адекватные рамки'
      ]
    },

    fail: {
      title: 'ПРОВАЛ!',
      color: '#FFB6C1',
      reasons: [
        'У клиента были завышенные ожидания, но ты их не отзеркалил',
        'Фрилансер должен держать границы по срокам',
        'Иначе выгорит быстрее, чем сайт запустится'
      ]
    }
  },

  // ===== УРОВЕНЬ 3: МАРИЯ (сложный, клиент неадекватный) =====
  {
    id: 'maria',
    title: 'Уровень 3: Мария',
    clientName: 'Мария',

    firstMessage:
      'Привет! Хочу интернет-магазин «под ключ». Бюджет небольшой, но нужно всё: каталог, личный кабинет, интеграции, реклама и чтобы за неделю.',

    greetingOptions: [
      {
        id: 'easy',
        text: 'Сделаем без проблем, а детали обсудим по ходу.',
        wrongHint:
          'Опасно сразу соглашаться на всё и сразу. Надо зафиксировать объём и ожидания.'
      },
      {
        id: 'freeTest',
        text: 'Давайте я сначала сделаю бесплатный тестовый макет, а потом решим с бюджетом.',
        wrongHint:
          'Бесплатная работа и размытый бюджет — тревожный флаг. Лучше сразу обозначить рамки.'
      },
      {
        id: 'correct',
        text: 'Интернет-магазин — большая задача. Давайте зафиксируем функции, сроки и реальный бюджет.',
        correct: true
      }
    ],

    // делаем диалог чуть длиннее
    afterCorrectDialogue: [
      {
        from: 'user',
        text: 'Интернет-магазин — большая задача. Давайте зафиксируем функции, сроки и реальный бюджет.'
      },
      {
        from: 'client',
        text: 'Ну функции хочу «как у маркетплейсов», но платить много не могу. Срок всё равно неделя.'
      },
      {
        from: 'user',
        text: 'При таком объёме за неделю не получится качественно. Можно сузить функционал или увеличить бюджет и сроки.'
      },
      {
        from: 'client',
        text: 'Сузить не хочу, бюджет повышать тоже. Давай ты просто сделаешь, а дальше разберёмся по ходу.'
      }
    ],

    decisionButtons: {
      badLabel: 'Неадекватный',
      goodLabel: 'Адекватный'
    },

    // на этом уровне успех — выбрать "Неадекватный"
    successChoice: 'bad',

    // Особые фразы перед итогом (две реплики)
    decisionPhrases: {
      success: [
        'Спасибо за открытость — по объёму задач и ожиданиям проект выглядит токсично.',
        'Чтобы не сгореть и не завалить дедлайны, я откажусь от этого проекта.'
      ],
      fail: [
        'Хорошо, согласен(на) взять всё «под ключ» за неделю и с текущим бюджетом.',
        'Надеюсь, бесконечные правки и новые хотелки не превратят этот проект в кошмар.'
      ]
    },

    success: {
      title: 'УСПЕХ!',
      color: '#90EE90',
      reasons: [
        'Ты считал(а) риски по объёму, срокам и бюджету',
        'Увидел(а) красные флаги: «как у маркетплейсов» и «разберёмся по ходу»',
        'Сохранил(а) свои границы и ресурсы'
      ]
    },

    fail: {
      title: 'ПРОВАЛ!',
      color: '#FFB6C1',
      reasons: [
        'Согласие на заведомо токсичный проект — прямой путь к выгоранию',
        'Нереальные сроки + огромный функционал = постоянный стресс',
        'Фрилансер тоже выбирает клиентов, а не только наоборот'
      ]
    }
  }
];

// ---------- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ----------

function clearChat() {
  chatEl.innerHTML = '';
}

function addMessage(from, text) {
  const div = document.createElement('div');
  div.className = 'bubble ' + (from === 'client' ? 'bubble-client' : 'bubble-user');
  div.textContent = text;
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
}

function setHint(message) {
  if (!message) {
    hintEl.innerHTML = '';
    return;
  }
  hintEl.innerHTML = `<span class="excl">!</span><span>${message}</span>`;
}

function setChoicesContainerAsDecision(isDecision) {
  if (isDecision) {
    choicesEl.classList.add('decision');
  } else {
    choicesEl.classList.remove('decision');
  }
}

// ---------- ОТРИСОВКА ЭКРАНОВ УРОВНЯ ----------

function startLevel(index) {
  currentLevelIndex = index;
  stage = 'greeting';
  resultEl.innerHTML = '';

  const level = levels[currentLevelIndex];
  levelTitleEl.textContent = level.title;
  phoneSubtitleEl.textContent = level.title;

  clearChat();
  setHint('');
  setChoicesContainerAsDecision(false);

  // первое сообщение клиента
  addMessage('client', level.firstMessage);

  renderGreetingChoices(level);
}

function renderGreetingChoices(level) {
  setChoicesContainerAsDecision(false);
  choicesEl.innerHTML = '';
  level.greetingOptions.forEach((opt) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = opt.text;
    btn.onclick = () => handleGreetingChoice(level, opt);
    choicesEl.appendChild(btn);
  });
}

function handleGreetingChoice(level, option) {
  if (option.correct) {
    setHint('');
    // блокируем кнопки
    choicesEl.querySelectorAll('button').forEach((b) => (b.disabled = true));

    // показываем диалог после правильного ответа
    setTimeout(() => {
      level.afterCorrectDialogue.forEach((replica, idx) => {
        setTimeout(() => {
          addMessage(replica.from, replica.text);
        }, 300 * idx);
      });

      setTimeout(() => {
        stage = 'decision';
        renderDecisionButtons(level);
      }, 1000 + 300 * (level.afterCorrectDialogue.length - 1));
    }, 200);
  } else {
    // неверный вариант
    setHint(option.wrongHint);
  }
}

function renderDecisionButtons(level) {
  setChoicesContainerAsDecision(true);
  choicesEl.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'two-buttons';

  const badBtn = document.createElement('button');
  badBtn.className = 'pill-btn bad';
  badBtn.textContent = level.decisionButtons.badLabel;
  badBtn.onclick = () => handleDecision(level, 'bad');

  const goodBtn = document.createElement('button');
  goodBtn.className = 'pill-btn good';
  goodBtn.textContent = level.decisionButtons.goodLabel;
  goodBtn.onclick = () => handleDecision(level, 'good');

  wrap.appendChild(badBtn);
  wrap.appendChild(goodBtn);
  choicesEl.appendChild(wrap);
}

// choice: 'good' | 'bad'
function handleDecision(level, choice) {
  // блокируем кнопки
  choicesEl.querySelectorAll('button').forEach((b) => (b.disabled = true));

  const successChoice = level.successChoice || 'good';
  const resultType = choice === successChoice ? 'success' : 'fail';

  // Берём фразы для этого уровня, если есть, иначе дефолт
  let messages;
  if (level.decisionPhrases && level.decisionPhrases[resultType]) {
    messages = level.decisionPhrases[resultType];
  } else {
    const defaultText =
      resultType === 'success'
        ? 'Отлично, мои услуги будут стоить...'
        : 'Извините, я не готов(а) принимать клиентов на данный момент!';
    messages = [defaultText];
  }

  // отправляем одну или две (или больше) реплики фрилансера
  let delay = 0;
  messages.forEach((text, index) => {
    setTimeout(() => {
      addMessage('user', text);
    }, delay);
    delay += 600; // небольшая пауза между пузырями
  });

  // показываем итог после всех реплик
  setTimeout(() => {
    stage = 'result';
    renderResult(level, resultType);
  }, delay + 400);
}

function renderResult(level, resultType) {
  const data = resultType === 'success' ? level.success : level.fail;
  resultEl.innerHTML = '';

  // иконки
  const iconRow = document.createElement('div');
  iconRow.className = 'result-icon-row';

  if (resultType === 'success') {
    // три звезды
    iconRow.innerHTML = `
      <svg width="60" height="60" viewBox="0 0 100 100">
        <polygon points="50,15 61,40 88,40 67,57 73,85 50,70 27,85 33,57 12,40 39,40"
          fill="#FFD700" stroke="#FFA500" stroke-width="2" />
      </svg>
      <svg width="80" height="80" viewBox="0 0 100 100">
        <polygon points="50,10 65,40 98,40 72,60 80,95 50,75 20,95 28,60 2,40 35,40"
          fill="#FFD700" stroke="#FFA500" stroke-width="2" />
      </svg>
      <svg width="60" height="60" viewBox="0 0 100 100">
        <polygon points="50,15 61,40 88,40 67,57 73,85 50,70 27,85 33,57 12,40 39,40"
          fill="#FFD700" stroke="#FFA500" stroke-width="2" />
      </svg>
    `;
  } else {
    // череп
    iconRow.innerHTML = `
      <svg width="90" height="90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#000" stroke-width="2"/>
        <ellipse cx="35" cy="40" rx="6" ry="9" fill="#000"/>
        <ellipse cx="65" cy="40" rx="6" ry="9" fill="#000"/>
        <path d="M 30 65 Q 50 55 70 65" stroke="#000" stroke-width="3" fill="none"/>
        <circle cx="50" cy="35" r="3" fill="#000"/>
        <line x1="40" y1="30" x2="30" y2="25" stroke="#000" stroke-width="2"/>
        <line x1="60" y1="30" x2="70" y2="25" stroke="#000" stroke-width="2"/>
      </svg>
    `;
  }

  const title = document.createElement('div');
  title.className = 'result-title';
  title.textContent = data.title;

  const card = document.createElement('div');
  card.className = 'result-card';
  card.style.backgroundColor = data.color;

  const h3 = document.createElement('h3');
  h3.textContent = resultType === 'success' ? 'Почему выбор верный:' : 'Почему выбор неверный:';

  const list = document.createElement('ul');
  data.reasons.forEach((r) => {
    const li = document.createElement('li');
    li.textContent = r;
    list.appendChild(li);
  });

  card.appendChild(h3);
  card.appendChild(list);

  resultEl.appendChild(iconRow);
  resultEl.appendChild(title);
  resultEl.appendChild(card);

  // Кнопки под итогом
  const primary = document.createElement('button');
  primary.className = 'primary-btn';

  if (resultType === 'success' && currentLevelIndex < levels.length - 1) {
    primary.textContent = 'Следующий уровень';
    primary.onclick = () => startLevel(currentLevelIndex + 1);
  } else {
    primary.textContent = 'Пройти уровень ещё раз';
    primary.onclick = () => startLevel(currentLevelIndex);
  }

  resultEl.appendChild(primary);

  if (resultType === 'success' && currentLevelIndex === levels.length - 1) {
    const secondary = document.createElement('button');
    secondary.className = 'secondary-btn';
    secondary.textContent = 'Вернуться к первому уровню';
    secondary.onclick = () => startLevel(0);
    resultEl.appendChild(secondary);
  }
}

// ---------- СТАРТ ----------

startLevel(0);
