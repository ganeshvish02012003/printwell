const CardPosition = require("../../models/CardPosition");

// Save positions
const saveCardPositionController = async (req, res) => {
  const { positions } = req.body; // expecting: { cardId1: boardId1, cardId2: boardId2, ... }

  try {
    await CardPosition.deleteMany({});

    const positionArray = Object.entries(positions).map(([cardId, boardId]) => ({
      cardId,
      boardId,
    }));

    await CardPosition.insertMany(positionArray);

    res.status(200).json({ message: 'Positions saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving positions.' });
  }
};

// Get positions
const getCardPositionController = async (req, res) => {
  try {
    const positions = await CardPosition.find({});
    res.status(200).json({ positions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving positions.' });
  }
};

module.exports = {
  saveCardPositionController,
  getCardPositionController,
};
