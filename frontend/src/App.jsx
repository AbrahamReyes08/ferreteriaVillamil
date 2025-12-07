import { Card } from 'antd';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-64 h-64 flex items-center justify-center shadow-xl bg-gradient-to-br from-blue-500 to-purple-600">
        <p className="text-white text-2xl font-bold text-center">
          Tailwind y Ant funcionan
        </p>
      </Card>
    </div>
  );
}

export default App;