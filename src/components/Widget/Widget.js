import React, { useState, useEffect, useRef } from 'react';
import './widget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const chatEndRef = useRef(null); // Ref to scroll to the last message

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === "") return;

    const newMessages = [...messages, { from: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    // Simulate bot typing and response
    setLoading(true);
    setTimeout(() => {
      simulateTypingEffect("Thanks for your message! 😊");
    }, 1500);
  };

  const simulateTypingEffect = (fullMessage) => {
    let index = 0;
    let tempMessage = "";

    const interval = setInterval(() => {
      if (index < fullMessage.length) {
        tempMessage += fullMessage[index];
        setCurrentMessage(tempMessage);
        index++;
      } else {
        clearInterval(interval);
        setMessages((prev) => [...prev, { from: "bot", text: fullMessage }]);
        setCurrentMessage("");
        setLoading(false);
      }
    }, 50);
  };

  // Scroll to the bottom whenever the messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-widget">
      {/* Circular Button */}
      <div className="chat-button" onClick={toggleChat}>
        <span>💬</span>
      </div>

      {/* Chat Box */}
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">Chat Support</div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.from === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="bot">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            {/* The ref will scroll us to this point */}
            <div ref={chatEndRef}></div>
          </div>
          <div className="chat-footer">
            <div className="chat-input-wrapper">
              <input
                type="text"
                placeholder="Enter message"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="chat-input"
              />
              <button onClick={handleSendMessage} className="send-button">
                &#10148;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
