const jwt = require('jsonwebtoken');

function auth(roles = []) {
  return (req, res, next) => {
    try {
      const hdr = req.headers.authorization || '';
      const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
      if (!token) return res.status(401).json({ message: 'No autorizado' });
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ message: 'Prohibido' });
      }
      next();
    } catch (e) {
      res.status(401).json({ message: 'Token inválido' });
    }
  };
}

module.exports = auth;
