const mongoose = require('mongoose');

const cardPositionSchema = new mongoose.Schema({
  cardId: String,
  boardId: String,
});

module.exports = mongoose.model('CardPosition', cardPositionSchema);
