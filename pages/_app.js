import '../src/index.css'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Simple test version to isolate the issue
  if (!mounted) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Pineapple AI...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pineapple AI</h1>
        <p className="text-gray-600 mb-8">Test Page - If you can see this, the app is working!</p>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
