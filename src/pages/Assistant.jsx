import { useState } from 'react';

export default function Assistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'you', text: input }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: `Echo: ${input}` }]);
    }, 600);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-[#c49b66] text-white text-center py-4 font-bold text-xl">
        Real-Time Assistant Interface
      </header>

      <main className="flex-grow overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                msg.sender === 'you' ? 'bg-[#c49b66] text-white ml-auto' : 'bg-white border'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </main>

      <footer className="p-4 bg-white border-t flex">
        <input
          className="flex-grow border px-4 py-2 rounded-l focus:outline-none"
          value={input}
          placeholder="Type your message..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-[#c49b66] text-white px-6 rounded-r font-semibold"
        >
          Send
        </button>
      </footer>
    </div>
  );
}
