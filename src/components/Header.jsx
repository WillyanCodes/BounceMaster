export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Suporte IA Pro</h1>
        <div className="flex gap-2">
          <span className="bg-green-500 px-3 py-1 rounded-full text-sm">Online</span>
          <span className="text-sm">v2.1</span>
        </div>
      </div>
    </header>
  );
}
