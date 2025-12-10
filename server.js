const express = require('express');
const path = require('path');

const app = express();

// Порт: Amvera передаёт его через переменную окружения
const PORT = process.env.PORT || 3000;

// Раздаём статические файлы из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Для всех маршрутов возвращаем index.html (одностраничное приложение)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
