const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.cookies.auth_token;
  if (!token) return res.status(403).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
}
