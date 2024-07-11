import React, { useState } from 'react';
import axios from 'axios';
import { detectURL } from './Component/detectURL';
import ChatBox from './Component/ChatBox';
import './App.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

function ChatRoom() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'AI', senderAvatar: 'https://i.pravatar.cc/150?img=32', message: 'Hello 👋, How can I assist you today?' },
  ]);
  const [isTyping, setIsTyping] = useState({});
  const [stockdata, setStockData] = useState({})
  const [loading, setLoading] = useState(false);
  const sendMessage = async (sender, senderAvatar, message) => {
    const humanMessageFormat = detectURL(message)
    const humanMessageItem = {
      id: messages.length + 1,
      sender: "Human",
      senderAvatar,
      message: humanMessageFormat,
    };
    setMessages(prevMessages => [...prevMessages, humanMessageItem]);
    setLoading(true)
    const response = await axios.post('http://localhost:8000/chat', { question: message });
    const aiMessageFormat = detectURL(response.data.summary);
    const aiMessageItem = {
      id: messages.length + 2,
      sender: "AI",
      senderAvatar: "https://i.pravatar.cc/150?img=32",
      message: aiMessageFormat,
    };
    console.log(messages)
    setMessages(prevMessages => [...prevMessages, aiMessageItem]);
    setLoading(false)
    if (response.data.analyze_data) {
      const stockData = response.data.analyze_data.results
      const formatedData = stockData.map(point => ({
        date: formatDate(point.t),
        open: point.o,
        close: point.c,
        high: point.h,
        low: point.l,
        volume: point.v,
        vw: point.vw,
        transactions: point.n
      }));
      setStockData(formatedData)
      console.log(formatedData)
    }

  };

  const typing = (writer) => {
    if (!isTyping[writer]) {
      const stateTyping = { ...isTyping };
      stateTyping[writer] = true;
      setIsTyping(stateTyping);
    }
  };

  const resetTyping = (writer) => {
    const stateTyping = { ...isTyping };
    stateTyping[writer] = false;
    setIsTyping(stateTyping);
  };

  return (
    <div className="chatApp__room">
      <ChatBox
        loading={loading}
        key={0}
        owner="Human"
        ownerAvatar="https://i.pravatar.cc/150?img=56"
        sendMessage={sendMessage}
        typing={typing}
        resetTyping={resetTyping}
        messages={messages}
        isTyping={isTyping}
      />


      <div style={{ "min-width": "50%" }}>
        <h2 style={{ "color": "white" }}>Stock Prices</h2>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={stockdata}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="open" stroke="#8884d8" />
            <Line type="monotone" dataKey="close" stroke="#82ca9d" />
            <Line type="monotone" dataKey="high" stroke="#ffc658" />
            <Line type="monotone" dataKey="low" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>

      </div>
    </div >
  );
}

export default ChatRoom;
