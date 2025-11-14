import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-200 font-sans text-gray-800">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: 'linear-gradient(to right, #a855f7, #3b82f6)',
            color: '#fff',
            boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.39)',
          },
        }}
      />
      <main>
        <HomePage />
      </main>
    </div>
  );
}

export default App;