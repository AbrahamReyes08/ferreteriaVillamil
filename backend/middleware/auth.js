const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ferreteria_villamil_secret_key_2024');
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
