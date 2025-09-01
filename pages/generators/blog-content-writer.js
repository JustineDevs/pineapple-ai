import React, { useState } from 'react'
import Link from 'next/link'
import { Loader2, RefreshCw, Copy, Download, Share2, ArrowLeft } from 'lucide-react'

export default function BlogContentWriterPage() {
  const [formData, setFormData] = useState({
    topic: '',
    audience: '',
    tone: 'Professional',
    language: 'English',
    outline: '',
    length: 'Medium'
  })
  const [useLocalLLM, setUseLocalLLM] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const callGenerate = async () => {
    setIsGenerating(true)
    setError(null)
    setResult('')
    try {
      const apiEndpoint = useLocalLLM ? '/api/generate-local' : '/api/generate'
      const prompt = `Write a blog post about "${formData.topic}" for an audience of ${formData.audience || 'general readers'}. Use a ${formData.tone} tone in ${formData.language}. Target length: ${formData.length}. ${formData.outline ? 'Follow this outline: ' + formData.outline : ''}`
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, generatorType: 'blog-writer' })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')
      setResult(data.text)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try { await navigator.clipboard.writeText(result) } catch {}
  }

  const downloadResult = () => {
    const blob = new Blob([result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'blog-post.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareResult = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Blog Post', text: result, url: window.location.href }) } catch {}
    } else {
      copyToClipboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 py-4">
            <Link href="/generator-hub" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/generator-hub" className="text-gray-500 hover:text-gray-700">Pineapple Hub</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Blog Content Writer</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Blog Content Writer</h2>
            <p className="text-sm sm:text-base text-gray-600">Generate blog posts with topic, tone, audience, and outline.</p>
          </div>

          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={useLocalLLM} onChange={(e) => setUseLocalLLM(e.target.checked)} />
              <span className="text-sm font-medium text-gray-700">Use Local LLM</span>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
              <input name="topic" value={formData.topic} onChange={handleInputChange} placeholder="e.g., AI in customer support" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
              <input name="audience" value={formData.audience} onChange={handleInputChange} placeholder="e.g., founders, support managers" className="input-field" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                <select name="tone" value={formData.tone} onChange={handleInputChange} className="input-field">
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Conversational</option>
                  <option>Technical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select name="language" value={formData.language} onChange={handleInputChange} className="input-field">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Outline (optional)</label>
              <textarea name="outline" value={formData.outline} onChange={handleInputChange} rows="3" className="input-field" placeholder="Intro, Benefits, Best Practices, Conclusion" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
              <select name="length" value={formData.length} onChange={handleInputChange} className="input-field">
                <option>Short</option>
                <option>Medium</option>
                <option>Long</option>
              </select>
            </div>
            <button type="button" onClick={callGenerate} disabled={isGenerating} className="btn-primary w-full flex items-center justify-center space-x-2">
              {isGenerating ? (<><Loader2 className="h-5 w-5 animate-spin" /><span>Generating...</span></>) : 'Generate Article'}
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Article</h3>
          {!result ? (
            <p className="text-gray-500">No article yet. Fill the form and generate.</p>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <button onClick={copyToClipboard} className="text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100 flex items-center gap-1"><Copy className="h-4 w-4" />Copy</button>
                <button onClick={downloadResult} className="text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100 flex items-center gap-1"><Download className="h-4 w-4" />Download</button>
                <button onClick={shareResult} className="text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100 flex items-center gap-1"><Share2 className="h-4 w-4" />Share</button>
                <button onClick={callGenerate} disabled={isGenerating} title="Regenerate" className="text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100"><RefreshCw className="h-4 w-4" /></button>
              </div>
              <div className="prose max-w-none whitespace-pre-wrap text-gray-800">{result}</div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}
