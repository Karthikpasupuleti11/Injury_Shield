import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, MinusSquare } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCeEgC568bwgOy0uxjeuWwR8zODK5RsggM');

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your InjuryShield assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typingEffect, setTypingEffect] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, isMinimized]);

  // Typing effect for first bot message on initial load
  useEffect(() => {
    if (isOpen && !isMinimized && messages.length === 1) {
      const text = messages[0].text;
      let i = 0;
      setShowTyping(true);
      setTypingEffect("");
      
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setTypingEffect((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setShowTyping(false);
        }
      }, 25);
      
      return () => clearInterval(typingInterval);
    }
  }, [isOpen, isMinimized, messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const generateResponse = async (userInput: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const systemPrompt = `You are InjuryShield's AI assistant, a professional, helpful, and friendly expert.
      You can answer:
      - InjuryShield-specific questions (real-time biomechanical analysis, injury prediction, training optimization, etc.)
      - General sports science and injury prevention queries
      - Broader AI/tech-related or unrelated questions, but always gently promote InjuryShield when possible.
      Remain professional and supportive.`;

      const chat = model.startChat({ history: [] });
      const result = await chat.sendMessage(`${systemPrompt}\n\nUser: ${userInput}`);
      const response = await result.response;
      const text = await response.text();
      return text;
    } catch (error) {
      console.error('Error generating response:', error);
      return "Sorry, I'm currently unable to respond. Please try again later.";
    }
  };

  const handleSendMessage = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Add slight delay to make interaction feel more natural
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const botReply = await generateResponse(inputText);

    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: botReply,
      sender: "bot",
      timestamp: new Date()
    }]);

    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <button
        onClick={toggleChat}
        className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <div
          className={`bg-gray-900 rounded-xl shadow-xl flex flex-col mt-4 transition-all duration-300 border border-gray-800 ${
            isMinimized ? 'h-16 w-64' : 'h-96 w-80 md:w-96'
          }`}
          style={{
            animation: isMinimized ? 'none' : 'fadeIn 0.3s ease-in-out'
          }}
        >
          <div className="bg-black rounded-t-xl p-4 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center">
              <div className="text-red-500 mr-2 animate-pulse">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white">InjuryShield Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={minimizeChat}
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                <MinusSquare className="w-5 h-5" />
              </button>
              <button
                onClick={toggleChat}
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-950">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`mb-4 max-w-[80%] ${
                      message.sender === "user"
                        ? "ml-auto bg-gradient-to-r from-red-500 to-red-600 text-white"
                        : "mr-auto bg-gradient-to-r from-gray-800 to-gray-700 text-white"
                    } rounded-xl p-3 shadow-md transition-all hover:shadow-lg`}
                    style={{
                      animation: `${message.sender === "user" ? 'slideInRight' : 'slideInLeft'} 0.3s ease-out`
                    }}
                  >
                    {index === 0 && showTyping ? (
                      <p>{typingEffect}<span className="animate-pulse">|</span></p>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    )}
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))}
                {isLoading && (
                  <div 
                    className="mb-4 max-w-[80%] mr-auto bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-xl p-3 shadow-md"
                    style={{
                      animation: 'slideInLeft 0.3s ease-out'
                    }}
                  >
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={handleSendMessage}
                className="p-3 border-t border-gray-800 flex items-center"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className={`bg-red-500 px-4 py-2 rounded-r-lg transition-colors ${
                    !inputText.trim() || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
                  } transform hover:scale-105 active:scale-95 transition-transform`}
                >
                  {isLoading ? (
                    <svg className="w-5 h-5 text-white animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <Send className="w-5 h-5 text-white" />
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default ChatBot;