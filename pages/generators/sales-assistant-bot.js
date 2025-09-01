import React, { useState } from 'react'
import Link from 'next/link'
import { Loader2, RefreshCw, Copy, Download, Share2, ArrowLeft } from 'lucide-react'

export default function SalesAssistantBotPage() {
  const [formData, setFormData] = useState({
    product: '',
    customerProfile: '',
    objection: '',
    tone: 'Consultative',
    language: 'English',
    length: 'Medium'
  })
  const [useLocalLLM, setUseLocalLLM] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const generate = async () => {
    setIsGenerating(true)
    setError(null)
    setResult('')
    try {
      const api = useLocalLLM ? '/api/generate-local' : '/api/generate'
      const prompt = `Act as a SaaS sales assistant. Craft a ${formData.length} response in ${formData.language} using a ${formData.tone} tone. Product: ${formData.product}. Customer profile: ${formData.customerProfile}. Handle objection: ${formData.objection}. Include one probing question and one CTA to schedule a demo.`
      const res = await fetch(api, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt, generatorType: 'sales-assistant' }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')
      setResult(data.text)
    } catch (e) { setError(e.message) } finally { setIsGenerating(false) }
  }

  const copy = async () => { try { await navigator.clipboard.writeText(result) } catch {} }
  const download = () => { const b=new Blob([result],{type:'text/plain'}); const u=URL.createObjectURL(b); const a=document.createElement('a'); a.href=u; a.download='sales-response.txt'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(u) }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 py-4">
            <Link href="/generator-hub" className="text-gray-500 hover:text-gray-700"><ArrowLeft className="h-5 w-5" /></Link>
            <span className="text-gray-400">/</span>
            <Link href="/generator-hub" className="text-gray-500 hover:text-gray-700">Pineapple Hub</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Sales Assistant Bot</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 space-y-4">
            <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Sales Assistant Bot</h2>
            <p className="text-sm sm:text-base text-gray-600">Generate persuasive, value-driven sales replies.</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={useLocalLLM} onChange={(e)=>setUseLocalLLM(e.target.checked)} />
              <span className="text-sm font-medium text-gray-700">Use Local LLM</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
            <input name="product" value={formData.product} onChange={handleChange} placeholder="e.g., AI helpdesk platform" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Profile</label>
            <input name="customerProfile" value={formData.customerProfile} onChange={handleChange} placeholder="e.g., SMB support manager" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Objection</label>
            <input name="objection" value={formData.objection} onChange={handleChange} placeholder="e.g., pricing too high" className="input-field" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
              <select name="tone" value={formData.tone} onChange={handleChange} className="input-field">
                <option>Consultative</option>
                <option>Friendly</option>
                <option>Confident</option>
                <option>Formal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select name="language" value={formData.language} onChange={handleChange} className="input-field">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Response Length</label>
            <select name="length" value={formData.length} onChange={handleChange} className="input-field">
              <option>Short</option>
              <option>Medium</option>
              <option>Long</option>
            </select>
          </div>
          <button onClick={generate} disabled={isGenerating} className="btn-primary w-full flex items-center justify-center gap-2">{isGenerating ? (<><Loader2 className="h-5 w-5 animate-spin" />Generating...</>) : 'Generate Reply'}</button>
          {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Reply</h3>
          {!result ? <p className="text-gray-500">No reply yet.</p> : (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <button onClick={copy} className="text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100 flex items-center gap-1"><Copy className="h-4 w-4" />Copy</button>
                <button onClick={download} className="text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100 flex items-center gap-1"><Download className="h-4 w-4" />Download</button>
                <button onClick={generate} disabled={isGenerating} title="Regenerate" className="text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100"><RefreshCw className="h-4 w-4" /></button>
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
