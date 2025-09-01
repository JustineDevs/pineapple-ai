import '../src/index.css'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Sidebar from '../src/components/Sidebar'
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
    <>
      <div className="flex h-screen bg-gray-50">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-white p-2 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50"
          >
            {sidebarOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto lg:ml-0">
          <div className="lg:hidden h-16"></div> {/* Spacer for mobile menu button */}
          <Component {...pageProps} />
        </main>
      </div>
      <Analytics />
    </>
  )
}

export default MyApp
