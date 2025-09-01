import Dashboard from '../src/pages/Dashboard'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Pineapple AI</h1>
      <p className="text-gray-600 mb-8">Welcome to the AI Generator Hub</p>
      <Dashboard />
    </div>
  )
}
