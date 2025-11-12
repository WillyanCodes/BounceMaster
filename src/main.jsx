import React from 'https://cdn.jsdelivr.net/npm/react@18/umd/react.development.js';
import ReactDOM from 'https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.development.js';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'https://cdn.jsdelivr.net/npm/recharts@2.12.7/umd/Recharts.min.js';

const { useState } = React;

const ticketsData = [
  { id: 1, cliente: "Maria Silva", assunto: "Erro no login", status: "Em Andamento", data: "12/04" },
  { id: 2, cliente: "João Costa", assunto: "Dúvida sobre pagamento", status: "Resolvido", data: "11/04" },
  { id: 3, cliente: "Ana Souza", assunto: "Reembolso", status: "Aberto", data: "12/04" }
];

const aiResponses = [
  "Entendido! Vou verificar agora.",
  "Me envie mais detalhes.",
  "Em até 5 minutos resolvo.",
  "Chamado aberto.",
  "Priorizado."
];

function App() {
  const [chat, setChat] = useState([{ text: "Olá! Sou o assistente virtual. Como posso ajudar?", sender: "ia" }]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setChat(prev => [...prev, { text: input, sender: "user" }]);
    setTimeout(() => {
      const resposta = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setChat(prev => [...prev, { text: resposta, sender: "ia" }]);
    }, 800);
    setInput("");
  };

  const statusCount = ticketsData.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(statusCount).map(([name, value]) => ({ name, value }));
  const COLORS = { Aberto: '#3B82F6', 'Em Andamento': '#F59E0B', Resolvido: '#10B981' };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '25px', borderRadius: '12px', textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '2.2em' }}>BounceMaster</h1>
        <p style={{ margin: '8px 0 0', opacity: 0.9 }}>Suporte Inteligente com Chat IA</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', '@media (min-width: 1024px)': { gridTemplateColumns: '2fr 1fr' } }}>
        <div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: '15px' }}>Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
              <div style={{ textAlign: 'center', padding: '15px', background: '#ebf5ff', borderRadius: '8px' }}>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#3B82F6' }}>{ticketsData.length}</div>
                <div>Total</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', background: '#fff4e6', borderRadius: '8px' }}>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#F59E0B' }}>
                  {ticketsData.filter(t => t.status === 'Em Andamento').length}
                </div>
                <div>Em Andamento</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', background: '#e6f9f0', borderRadius: '8px' }}>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#10B981' }}>
                  {ticketsData.filter(t => t.status === 'Resolvido').length}
                </div>
                <div>Resolvidos</div>
              </div>
            </div>
            <div style={{ height: '220px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" outerRadius={70} label>
                    {chartData.map((entry, i) => (
                      <Cell key={i} fill={COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '15px' }}>Chat com IA</h3>
            <div style={{ flex: 1, overflowY: 'auto', background: '#f9f9f9', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
              {chat.map((msg, i) => (
                <div key={i} style={{ 
                  margin: '8px 0', 
                  padding: '10px', 
                  borderRadius: '12px', 
                  maxWidth: '80%', 
                  background: msg.sender === 'user' ? '#007bff' : '#e9ecef',
                  color: msg.sender === 'user' ? 'white' : '#333',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginLeft: msg.sender === 'user' ? 'auto' : '0',
                  marginRight: msg.sender === 'ia' ? 'auto' : '0'
                }}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage()}
                placeholder="Digite aqui..."
                style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
              />
              <button onClick={sendMessage} style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer' }}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
