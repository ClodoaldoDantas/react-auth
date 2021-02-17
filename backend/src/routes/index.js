const authRoutes = require('./authRoutes');
const appRoutes = require('./appRoutes');

module.exports = app => {
  app.use(authRoutes);
  app.use(appRoutes);
};
