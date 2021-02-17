const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

router.get('/welcome', authMiddleware, (request, response) => {
  return response.json({
    userId: request.userId,
    message:
      'Que bom que você está por aqui 😁. Em breve traremos novidades para o site. Aguarde 🚧 !',
  });
});

module.exports = router;
