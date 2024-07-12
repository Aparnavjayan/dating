import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './messagePage.module.css';
import UserNavbar from '../../components/navbar/UserNavbar';

const MessagePage = () => {
  const [interactingUsers, setInteractingUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Fetch the list of interacting users
    const fetchInteractingUsers = async () => {
      const res = await axios.get('/api/interacting-users', { withCredentials: true });
      console.log('response of interacting users', res);
      setInteractingUsers(Array.isArray(res.data) ? res.data : []);
    };
    fetchInteractingUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // Initialize socket connection
      const newSocket = io('http://localhost:3000');
      setSocket(newSocket);
      newSocket.emit('join', selectedUser._id);

      newSocket.on('receiveMessage', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // Fetch messages with the selected user
      const fetchMessages = async () => {
        try {
          const res = await axios.get(`/api/messages/${selectedUser._id}`);
          console.log('fetched message', res);
          setMessages(res.data);
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
    }
  }, [selectedUser]);

  const sendMessage = async () => {
    try {
      const res = await axios.post('/api/messages', {
        receiver: selectedUser._id,
        content: newMessage
      });
      setMessages([...messages, res.data]);
      setNewMessage('');
      socket.emit('sendMessage', res.data); // Emit the message after sending
      setError(null);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. ' + (error.response ? error.response.data : ''));
    }
  };

  return (
    <div className={styles.messagesPage}>
      <UserNavbar />
      <div className={styles.container}>
        <div className={styles.userList}>
          {interactingUsers.map(user => (
            <div
              key={user._id}
              className={styles.user}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </div>
          ))}
        </div>
        <div className={styles.chatBox}>
          {selectedUser ? (
            <>
              <div className={styles.header}>
                <h2>Messages with {selectedUser.name}</h2>
                <FontAwesomeIcon icon={faTimes} className={styles.closeIcon} onClick={() => setSelectedUser(null)} />
              </div>
              <div className={styles.messages}>
                <ul className={styles.messageList}>
                  {messages.map((msg, index) => (
                    <li key={index} className={msg.sender === selectedUser._id ? styles.receivedMessage : styles.sentMessage}>
                      {msg.content}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.messageInput}>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className={styles.textArea}
                />
                <FontAwesomeIcon icon={faPaperPlane} className={styles.sendIcon} onClick={sendMessage} />
              </div>
              {error && <p className={styles.errorMessage}>{error}</p>}
            </>
          ) : (
            <div className={styles.noUserSelected}>Select a user to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
