export function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/auth/login');
}

export function isAdmin(req, res, next) {
  if (req.session.user?.role === 'admin') return next();
  res.status(403).send('Access Denied');
}

export function isCustomer(req, res, next) {
  if (req.session.user?.role === 'customer') return next();
  res.status(403).send('Access Denied');
}
