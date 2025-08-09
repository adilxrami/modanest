import { useEffect, useRef, useState } from 'react';

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = generateBotReply(input);
      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
      setIsTyping(false);
    }, 1200);
  };

  const generateBotReply = (input) => {
    const normalized = input.toLowerCase();
    if (normalized.includes('price') || normalized.includes('cost')) {
      return "Our products range from $25 to $250 depending on the item. Let me know what you're looking for!";
    }
    if (normalized.includes('return')) {
      return "We offer a 30-day return policy. Would you like to read our return guide?";
    }
    if (normalized.includes('hi') || normalized.includes('hello')) {
      return "Hello! How can I help you today? 😊";
    }
    return "That's a great question! I'm here to help with anything about ModaNest.";
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-[350px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-slide-up">
          {/* Header */}
          <div className="bg-[#c49b66] px-5 py-4 text-white flex items-center justify-between">
            <h2 className="text-lg font-semibold">ModaNest Assistant</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-white text-xl font-light hover:opacity-70 transition"
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>

          {/* Chat messages */}
          <div className="h-[300px] overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl text-sm max-w-[75%] transition-all duration-300 ease-in-out ${
                  msg.sender === 'user'
                    ? 'ml-auto bg-[#c49b66] text-white rounded-br-sm animate-fade-in'
                    : 'bg-white border text-gray-800 rounded-bl-sm animate-fade-in'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="bg-white border text-gray-600 text-sm rounded-xl p-3 max-w-[60%] animate-pulse">
                ModaNest Assistant is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="flex items-center px-4 py-3 border-t bg-white">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="flex-grow px-3 py-2 text-sm rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c49b66]"
              placeholder="Ask me anything..."
            />
            <button
              onClick={handleSend}
              className="bg-[#c49b66] text-white px-4 py-2 text-sm font-semibold rounded-r-lg hover:bg-[#b8874d] transition"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-14 h-14 bg-[#c49b66] text-white rounded-full shadow-lg hover:scale-110 transition text-2xl flex items-center justify-center"
          aria-label="Open chat"
        >
          💬
        </button>
      )}
    </div>
  );
}
