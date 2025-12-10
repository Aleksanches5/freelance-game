// ВАЖНО: файл должен быть загружен как type="text/babel" в index.html

const { useState, useEffect } = React;

const FreelanceChatGame = () => {
  const [stage, setStage] = useState(0);
  const [messages, setMessages] = useState([]);
  const [showButtons, setShowButtons] = useState(true);
  const [gameResult, setGameResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand();
      tg.ready();
    }

    setMessages([
      { type: 'client', text: 'Привет! Хочу заказать лендинг. Есть текст и структура, нужен дизайн + вёрстка.' }
    ]);
  }, []);

  const handleChoice = (choice) => {
    if (stage === 0) {
      if (choice === 'a') {
        setErrorMessage('Рановато говорить об этом! Сначала узнай общие детали.');
        return;
      } else if (choice === 'b') {
        setErrorMessage('Лучше узнай побольше деталей! Выбери другой вариант.');
        return;
      } else if (choice === 'c') {
        setErrorMessage('');
        setShowButtons(false);

        setTimeout(() => {
          setMessages(prev => [...prev, { type: 'user', text: 'Здравствуйте! Какие примерно сроки и бюджет?' }]);

          setTimeout(() => {
            setMessages(prev => [...prev, { type: 'client', text: '10 дней, оплата по этапам. Если всё ок — буду работать с тобой дальше.' }]);

            setTimeout(() => {
              setStage(1);
              setShowButtons(true);
            }, 500);
          }, 1000);
        }, 300);
      }
    } else if (stage === 1) {
      setShowButtons(false);
      const finalResponse = choice === 'adequate'
        ? 'Отлично, мои услуги будут стоить...'
        : 'Извините, я не готов(а) принимать клиентов на данный момент!';

      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'user', text: finalResponse }]);
        setTimeout(() => setGameResult(choice), 1000);
      }, 300);
    }
  };

  if (gameResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#efeff3' }}>
        <div className="text-center max-w-md">
          {gameResult === 'adequate' ? (
            <>
              <h1 className="text-6xl font-bold mb-8">УСПЕХ!</h1>
            </>
          ) : (
            <>
              <h1 className="text-6xl font-bold mb-8">ПРОВАЛ!</h1>
            </>
          )}
          <button onClick={() => window.location.reload()} className="mt-8 px-8 py-3 rounded-full text-white font-bold" style={{ backgroundColor: '#3390ec' }}>
            Играть снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-32" style={{ backgroundColor: '#efeff3' }}>
      <div className="text-center mb-6 pt-4">
        <h2 className="text-xl font-bold">Уровень 1: Елена</h2>
      </div>

      <div className="space-y-3 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[80%] p-4 rounded-2xl" style={{ backgroundColor: msg.type === 'client' ? '#fff' : '#a8daff' }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {showButtons && (
        <div className="fixed bottom-0 left-0 right-0 p-4" style={{ backgroundColor: '#efeff3' }}>
          {stage === 0 && (
            <>
              {errorMessage && <div className="text-red-600 mb-2">{errorMessage}</div>}

              <button onClick={() => handleChoice('a')} className="w-full mb-3 p-4 rounded-2xl border-2 border-black">Здравствуйте! Как вы будете оплачивать?</button>
              <button onClick={() => handleChoice('b')} className="w-full mb-3 p-4 rounded-2xl border-2 border-black">Здравствуйте! Какой стиль вам подходит?</button>
              <button onClick={() => handleChoice('c')} className="w-full p-4 rounded-2xl border-2 border-black">Здравствуйте! Какие сроки и бюджет?</button>
            </>
          )}

          {stage === 1 && (
            <div className="flex gap-3">
              <button onClick={() => handleChoice('inadequate')} className="flex-1 p-4 rounded-full" style={{ backgroundColor: '#ff6b6b' }}>Неадекватный</button>
              <button onClick={() => handleChoice('adequate')} className="flex-1 p-4 rounded-full" style={{ backgroundColor: '#90EE90' }}>Адекватный</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<FreelanceChatGame />, document.getElementById('root'));
