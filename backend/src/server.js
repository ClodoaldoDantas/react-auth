const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

routes(app);

app.listen(3333, () => {
  console.log('🔥 Server started at http://localhost:3333');
});
