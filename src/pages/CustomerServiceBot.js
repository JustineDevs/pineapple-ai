import React, { useState } from 'react'
import { ArrowLeft, Copy, Download, Share2, RefreshCw, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

const CustomerServiceBot = () => {
  const [formData, setFormData] = useState({
    businessType: '',
    industry: '',
    tone: '',
    language: 'English',
    responseLength: 'Medium',
    specificScenario: '',
    customerQuery: ''
  })
  
  const [generatedResponses, setGeneratedResponses] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [useLocalLLM, setUseLocalLLM] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const generateResponse = async () => {
    setIsGenerating(true)
    setError(null)
    
    try {
      const apiEndpoint = useLocalLLM ? '/api/generate-local' : '/api/generate'
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Generate a professional customer service response',
          generatorType: 'customer-service',
          ...formData
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate response')
      }

      if (result.success) {
        const newResponse = {
          id: Date.now(),
          text: result.text,
          timestamp: new Date().toISOString(),
          model: result.model || 'AI Model',
          formData: { ...formData }
        }
        
        setGeneratedResponses(prev => [newResponse, ...prev])
      } else {
        throw new Error('Generation failed')
      }
    } catch (err) {
      setError(err.message)
      console.error('Generation error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const regenerateResponse = async (responseId) => {
    const responseToRegenerate = generatedResponses.find(r => r.id === responseId)
    if (!responseToRegenerate) return

    setIsGenerating(true)
    setError(null)
    
    try {
      const apiEndpoint = useLocalLLM ? '/api/generate-local' : '/api/generate'
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Generate a professional customer service response',
          generatorType: 'customer-service',
          ...responseToRegenerate.formData
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to regenerate response')
      }

      if (result.success) {
        const newResponse = {
          id: Date.now(),
          text: result.text,
          timestamp: new Date().toISOString(),
          model: result.model || 'AI Model',
          formData: { ...responseToRegenerate.formData }
        }
        
        setGeneratedResponses(prev => prev.map(r => 
          r.id === responseId ? newResponse : r
        ))
      }
    } catch (err) {
      setError(err.message)
      console.error('Regeneration error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadResponse = (response) => {
    const blob = new Blob([response.text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `customer-service-response-${response.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareResponse = async (response) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Customer Service Response',
          text: response.text,
          url: window.location.href
        })
      } catch (err) {
        console.error('Share failed:', err)
      }
    } else {
      // Fallback to copying URL
      copyToClipboard(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 py-4">
            <Link href="/generator-hub" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/generator-hub" className="text-gray-500 hover:text-gray-700">
              Pineapple Hub
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Customer Service Bot</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Customer Service Response Generator</h2>
              <p className="text-sm sm:text-base text-gray-600">Generate professional customer service responses tailored to your business needs.</p>
            </div>

            {/* LLM Selection */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useLocalLLM}
                  onChange={(e) => setUseLocalLLM(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Use Local LLM (GPT-OSS120b) instead of OpenAI API
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                {useLocalLLM ? 'Using local model for cost-free generation' : 'Using OpenAI API for high-quality responses'}
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                  <input
                    type="text"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    placeholder="e.g., E-commerce, SaaS, Restaurant"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    placeholder="e.g., Technology, Food, Healthcare"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Select tone</option>
                    <option value="Professional">Professional</option>
                    <option value="Friendly">Friendly</option>
                    <option value="Empathetic">Empathetic</option>
                    <option value="Formal">Formal</option>
                    <option value="Casual">Casual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Chinese">Chinese</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Response Length</label>
                <select
                  name="responseLength"
                  value={formData.responseLength}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="Short">Short (1-2 sentences)</option>
                  <option value="Medium">Medium (3-4 sentences)</option>
                  <option value="Long">Long (5+ sentences)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specific Scenario</label>
                <textarea
                  name="specificScenario"
                  value={formData.specificScenario}
                  onChange={handleInputChange}
                  placeholder="Describe the specific customer service scenario..."
                  rows="3"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Query</label>
                <textarea
                  name="customerQuery"
                  value={formData.customerQuery}
                  onChange={handleInputChange}
                  placeholder="Enter the customer's question or concern..."
                  rows="3"
                  className="input-field"
                />
              </div>

              <button
                type="button"
                onClick={generateResponse}
                disabled={isGenerating}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Response</span>
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            )}
          </div>

          {/* Generated Responses */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Generated Responses</h3>
              {generatedResponses.length > 0 && (
                <button
                  onClick={() => setGeneratedResponses([])}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear All
                </button>
              )}
            </div>

            {generatedResponses.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-gray-500">No responses generated yet. Fill out the form and click "Generate Response" to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {generatedResponses.map((response) => (
                  <div key={response.id} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {response.model}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(response.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={() => regenerateResponse(response.id)}
                        disabled={isGenerating}
                        className="text-gray-400 hover:text-gray-600 p-1"
                        title="Regenerate"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="prose max-w-none mb-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{response.text}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => copyToClipboard(response.text)}
                        className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100"
                      >
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </button>
                      <button
                        onClick={() => downloadResponse(response)}
                        className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                      <button
                        onClick={() => shareResponse(response)}
                        className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SEO Content Sections */}
        <div className="mt-16 space-y-12">
          {/* Examples Section */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Example Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h4 className="font-semibold text-gray-900 mb-2">E-commerce Returns</h4>
                <p className="text-gray-600 text-sm">Handle customer return requests professionally and empathetically.</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Technical Support</h4>
                <p className="text-gray-600 text-sm">Provide clear, step-by-step solutions to technical issues.</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Billing Inquiries</h4>
                <p className="text-gray-600 text-sm">Address billing concerns with transparency and helpfulness.</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h4 className="font-semibold text-gray-900 mb-2">How accurate are the generated responses?</h4>
                <p className="text-gray-600">Our AI generates responses based on best practices in customer service. However, you should always review and customize responses to match your specific business policies and tone.</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Can I use these responses directly with customers?</h4>
                <p className="text-gray-600">While the responses are professional, we recommend personalizing them to ensure they align with your brand voice and specific customer situation.</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h4 className="font-semibold text-gray-900 mb-2">What languages are supported?</h4>
                <p className="text-gray-600">Currently, we support English, Spanish, French, German, and Chinese. More languages will be added based on user demand.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CustomerServiceBot
