import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export default function Dashboard({ tickets }) {
  const statusCount = tickets.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(statusCount).map(([name, value]) => ({ name, value }));
  const COLORS = { Aberto: '#3B82F6', 'Em Andamento': '#F59E0B', Resolvido: '#10B981' };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Dashboard em Tempo Real</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{tickets.length}</div>
          <div className="text-sm text-gray-600">Total de Tickets</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <div className="text-3xl font-bold text-yellow-600">
            {tickets.filter(t => t.status === 'Em Andamento').length}
          </div>
          <div className="text-sm text-gray-600">Em Andamento</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-3xl font-bold text-green-600">
            {tickets.filter(t => t.status === 'Resolvido').length}
          </div>
          <div className="text-sm text-gray-600">Resolvidos</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={70} label>
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
