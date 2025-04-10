const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// Dummy users
const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'john', password: 'john123', role: 'customer' }
];

// Middleware
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

function isAdmin(req, res, next) {
  if (req.session.user?.role === 'admin') return next();
  res.status(403).send('Access Denied');
}

// Routes
app.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});

// 🔽 Registration routes placed BEFORE login
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.send('All fields are required.');
  }

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.send('Username already exists.');
  }

  const newUser = {
    id: users.length + 1,
    username,
    password,
    role
  };

  users.push(newUser);
  req.session.user = newUser;
  res.redirect(role === 'admin' ? '/dashboard' : '/customer');
});

// 🔽 Login routes
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.user = user;
    return res.redirect(user.role === 'admin' ? '/dashboard' : '/customer');
  }
  res.send('Invalid credentials');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Admin dashboard
app.get('/dashboard', isAuthenticated, isAdmin, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

// Customer portal (protected route)
app.get('/customer', isAuthenticated, (req, res) => {
  if (req.session.user.role !== 'customer') return res.status(403).send('Access Denied');
  res.render('customer', { user: req.session.user });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
