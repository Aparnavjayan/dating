import express from 'express';
import authenticateJWT from '../middleware/jwtauthentication.js';
import Message from '../../database/Message.js';
import { io } from '../server.js'; 

const router = express.Router();

// Send a message
router.post('/sendMessage/:userId', authenticateJWT, async (req, res) => {
  const { userId } = req.params;
  console.log('receiver id:',userId)
  const content  = req.body.message;
  console.log('content:',content)
  const senderId = req.user._id;
  console.log('sender id:',senderId)

  try {
    const message = new Message({ sender: senderId, receiver: userId, content });
    await message.save();
    io.to(userId).emit('receiveMessage', message);
    io.to(senderId).emit('receiveMessage', message); // Emit to the sender's room as well
    res.status(201).json({ content: message.content, _id: message._id, timestamp: message.timestamp, sender: message.sender, receiver: message.receiver });
  } catch (error) {
    res.status(500).send('Error sending message');
  }
});

// Get messages between two users
router.get('/getMessages/:userId', authenticateJWT, async (req, res) => {
  const userId = req.user._id;
  const { userId: otherUserId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId }
      ]
    }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).send('Error retrieving messages');
  }
});


router.get('/interacting-users', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user._id; 
    console.log('logged user:',userId);
    const messages = await Message.find({ 
      $or: [{ sender: userId }, { receiver: userId }] 
    }).populate('sender', 'name').populate('receiver', 'name');
    console.log('message1:',messages);

    const interactingUsers = messages.reduce((acc, message) => {
      const otherUser = message.sender._id.equals(userId) ? message.receiver : message.sender;
      if (!acc.some(user => user._id.equals(otherUser._id))) {
        acc.push(otherUser);
      }
      return acc;
    }, []);
    console.log('interacting users',interactingUsers)
    res.json(interactingUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Send a new message
router.post('/messages', authenticateJWT, async (req, res) => {
  try {
    const { receiver, content } = req.body;
    const message = new Message({
      sender: req.user._id,
      receiver,
      content
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/messages/:userId', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('logged in user')
    const otherUserId = req.params.userId;
    console.log('other user',otherUserId)
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId }
      ]
    }).sort({ timestamp: 1 });
    console.log('message(2)',)
    res.json(messages);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
