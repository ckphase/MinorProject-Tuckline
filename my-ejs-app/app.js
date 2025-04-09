const express = require('express');
const app = express();
const PORT = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
  res.render('index', { name: 'Alice' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


