import Dashboard from '../src/pages/Dashboard'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🍍 Pineapple AI</h1>
        <p className="text-xl text-gray-600 mb-8">AI Generator Hub</p>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-700">Welcome to Pineapple AI!</p>
          <p className="text-sm text-gray-500 mt-2">If you can see this, the app is working correctly.</p>
        </div>
      </div>
    </div>
  )
}
