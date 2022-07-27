const Card = require('../models/card');
const NotFoundErrors = require('../code_errors/notFound-errors');
const ReqErrors = require('../code_errors/req-errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ReqErrors('incorrect data'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundErrors('Карточка не найдена');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ReqErrors('Недостаточно прав для удаления карточки');
      }

      Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.status(200).send(card))
        .catch(next);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundErrors('Card not found');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ReqErrors('id incorrect'));
        return;
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => {
      if (cards === null) {
        throw new NotFoundErrors('Card not found');
      }
      res.send(cards);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ReqErrors('id incorrect'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
};
