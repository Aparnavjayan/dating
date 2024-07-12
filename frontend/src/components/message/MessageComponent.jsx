import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './messageComponent.module.css';

function MessageComponent({ userId, onClose }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    newSocket.emit('join', userId);

    newSocket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/getMessages/${userId}`, { withCredentials: true });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to fetch messages. ' + (error.response ? error.response.data : ''));
      }
    };

    fetchMessages();

    return () => {
      newSocket.off('receiveMessage');
      newSocket.disconnect();
    };
  }, [userId]);

  const sendMessage = async () => {
    try {
      const response = await axios.post(`/api/sendMessage/${userId}`, { message }, { withCredentials: true });
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setMessage('');
      socket.emit('sendMessage', response.data); // Emit the message after sending
      setError(null);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. ' + (error.response ? error.response.data : ''));
    }
  };

  return (
    <div className={styles.messageContainer}>
      <div className={styles.header}>
        <h2>Messages</h2>
        <FontAwesomeIcon icon={faTimes} className={styles.closeIcon} onClick={onClose} />
      </div>
      <div className={styles.messageContent}>
        <ul className={styles.messageList}>
          {messages.map((msg, index) => (
            <li key={index} className={msg.sender === userId ? styles.sentMessage : styles.receivedMessage}>
              {msg.content}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.messageInput}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className={styles.textArea}
        />
        <FontAwesomeIcon icon={faPaperPlane} className={styles.sendIcon} onClick={sendMessage} />
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

export default MessageComponent;
