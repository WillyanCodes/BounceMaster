import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatIA from './components/ChatIA';
import TicketList from './components/TicketList';
import Dashboard from './components/Dashboard';
import ticketsData from './data/tickets.json';

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { text: "Olá! Sou o assistente virtual. Como posso ajudar?", sender: "ia" }
  ]);

  useEffect(() => {
    setTickets(ticketsData);
  }, []);

  const addMessage = (text, sender) => {
    setChatMessages(prev => [...prev, { text, sender }]);
  };

  const handleNewTicket = (cliente, assunto) => {
    const novo = {
      id: tickets.length + 1,
      cliente,
      assunto,
      status: "Aberto",
      data: new Date().toLocaleDateString('pt-BR'),
      mensagens: 1
    };
    setTickets(prev => [novo, ...prev]);
    addMessage(`Ticket criado: "${assunto}"`, "ia");
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Dashboard tickets={tickets} />
          <TicketList 
            tickets={tickets} 
            onSelect={setSelectedTicket}
            onNewTicket={handleNewTicket}
          />
        </div>
        <div className="lg:col-span-1">
          <ChatIA 
            messages={chatMessages} 
            onSend={addMessage}
            selectedTicket={selectedTicket}
          />
        </div>
      </div>
    </>
  );
}
