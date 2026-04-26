import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login"; // Login component ta create korte hobe
import { useStateValue } from "./StateProvider";

function App() {
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue(); // Context API theke user state ana

  // Messages fetch kora (Real-time sync)
  useEffect(() => {
    axios.get('/messages/sync').then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('95e3e591bbcce2c5bf3b', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      {!user ? (
        <Login /> // Jodi user login na thake, login screen dekhabe
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Routes>
              {/* URL-e /rooms/:roomId thakle oi specific chat khulbe */}
              <Route path="/rooms/:roomId" element={<Chat messages={messages} />} />

              {/* Default path-e thakleo chat dekhabe */}
              <Route path="/" element={<Chat messages={messages} />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;