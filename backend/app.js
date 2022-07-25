require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors, Joi, celebrate } = require('celebrate');
const { createUser, getlogin } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundErrors = require('./code_errors/notFound-errors');
//const cors = require('./middlewares/cors');
const cors = require('cors');

const options = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'https://domainname.mesto-full.nomoredomains.xyz',
    'http://domainname.mesto-full.nomoredomains.xyz',
  ],
  credentials: true,
};

const { PORT = 3001 } = process.env;
const app = express();
app.use('*', cors(options));
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// добавить логер

app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), getlogin);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.,~#?&//=!]*$)/),
  }),
}), createUser);
// заменить
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', (req, res, next) => {
  next(new NotFoundErrors('Sorry, Not found Error'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
    // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);
