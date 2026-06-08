const Message = require('../models/Message');

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

const createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Deleted'
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = {
  getMessages,
  createMessage,
  deleteMessage
};