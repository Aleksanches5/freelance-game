const express = require('express');
const path = require('path');

const app = express();

// Amvera обычно пробрасывает PORT, но на всякий случай ставим 3000 по умолчанию
const PORT = process.env.PORT || 3000;

// Раздаём статические файлы из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Для любых маршрутов отдаём index.html (SPA)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
