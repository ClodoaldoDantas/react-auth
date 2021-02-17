const knex = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async register(request, response) {
    const { email, password } = request.body;

    const userExists = await knex('users')
      .select('id')
      .where({ email })
      .first();

    if (userExists) {
      return response.status(400).json({ message: 'E-mail já cadastrado' });
    }

    const hash = await bcrypt.hash(password, 10);

    const [id] = await knex('users')
      .insert({ email, password: hash })
      .returning('id');

    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: '1d' });

    return response.json({ email, token });
  },
  async login(request, response) {
    const { email, password } = request.body;

    const user = await knex('users').select('*').where({ email }).first();

    if (!user) {
      return response.status(400).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return response.status(400).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: '1d',
    });

    return response.json({ email: user.email, token });
  },
};
