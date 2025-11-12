import { useState } from 'react';
import { aiResponses } from '../utils/aiResponses';

export default function ChatIA({ messages, onSend, selectedTicket }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input, 'user');
    setTimeout(() => {
      const resposta = selectedTicket 
        ? `Ticket #${selectedTicket.id}: "${selectedTicket.assunto}" está em análise.`
        : aiResponses[Math.floor(Math.random() * aiResponses.length)];
      onSend(resposta, 'ia');
    }, 800);
    setInput('');
  };

  return (
    <div className="bg-white rounded-xl shadow-xl h-full flex flex-col" style={{ maxHeight: '80vh' }}>
      <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-xl">
        <h3 className="font-bold">Assistente Virtual</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-2xl ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Digite sua mensagem..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
          Enviar
        </button>
      </div>
    </div>
  );
}
