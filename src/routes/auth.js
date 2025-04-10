import express from 'express';

const router = express.Router();

const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'john', password: 'john123', role: 'customer' },
];

// GET
router.get('/login', (req, res) => res.render('auth/login'));
router.get('/register/:role', (req, res) => {
  const role = req.params.role;
  if (!['admin', 'customer'].includes(role))
    return res.status(404).send('Not found');
  res.render('auth/register', { role });
});

// POST
router.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role)
    return res.send('All fields are required.');
  const exists = users.find((u) => u.username === username);
  if (exists) return res.send('Username exists.');
  const newUser = { id: users.length + 1, username, password, role };
  users.push(newUser);
  req.session.user = newUser;
  res.redirect(role === 'admin' ? '/admin/dashboard' : '/shop/portal');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.send('Invalid credentials');
  req.session.user = user;
  res.redirect(user.role === 'admin' ? '/admin/dashboard' : '/shop/portal');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

export default router;
