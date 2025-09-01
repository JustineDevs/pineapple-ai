import React, { useState } from 'react'
import Link from 'next/link'
import { Loader2, RefreshCw, Copy, Download, ArrowLeft } from 'lucide-react'

export default function LogoDesignGeneratorPage() {
  const [formData, setFormData] = useState({
    brand: '',
    tagline: '',
    values: '',
    style: 'Modern',
    colors: '',
    usage: 'Web and App'
  })
  const [useLocalLLM, setUseLocalLLM] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState('')

  const handleChange = (e) => { const { name, value } = e.target; setFormData(p => ({ ...p, [name]: value })) }

  const generate = async () => {
    setIsGenerating(true); setError(null); setResult('')
    try {
      const api = useLocalLLM ? '/api/generate-local' : '/api/generate'
      const prompt = `Create a professional logo design brief. Brand: ${formData.brand}. Tagline: ${formData.tagline}. Core values: ${formData.values}. Preferred style: ${formData.style}. Color preferences: ${formData.colors}. Primary usage: ${formData.usage}. Include: concept directions (3), typography suggestions, color palette (hex), usage notes, and negative space/monogram ideas.`
      const res = await fetch(api, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt, generatorType: 'logo-design' }) })
      const data = await res.json(); if (!res.ok) throw new Error(data.error || 'Generation failed'); setResult(data.text)
    } catch (e) { setError(e.message) } finally { setIsGenerating(false) }
  }

  const copy = async () => { try { await navigator.clipboard.writeText(result) } catch {} }
  const download = () => { const b=new Blob([result],{type:'text/plain'}); const u=URL.createObjectURL(b); const a=document.createElement('a'); a.href=u; a.download='logo-brief.txt'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(u) }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 py-4">
            <Link href="/generator-hub" className="text-gray-500 hover:text-gray-700"><ArrowLeft className="h-5 w-5" /></Link>
            <span className="text-gray-400">/</span>
            <Link href="/generator-hub" className="text-gray-500 hover:text-gray-700">Pineapple Hub</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Logo Design Generator</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={useLocalLLM} onChange={(e)=>setUseLocalLLM(e.target.checked)} />
              <span className="text-sm font-medium text-gray-700">Use Local LLM</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
            <input name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g., NovaPay" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tagline (optional)</label>
            <input name="tagline" value={formData.tagline} onChange={handleChange} placeholder="e.g., Payments, simplified." className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Core Values</label>
            <input name="values" value={formData.values} onChange={handleChange} placeholder="e.g., Trust, speed, innovation" className="input-field" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
              <select name="style" value={formData.style} onChange={handleChange} className="input-field">
                <option>Modern</option>
                <option>Minimal</option>
                <option>Playful</option>
                <option>Corporate</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color Preferences</label>
              <input name="colors" value={formData.colors} onChange={handleChange} placeholder="e.g., blues and greens" className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Usage</label>
            <input name="usage" value={formData.usage} onChange={handleChange} placeholder="e.g., Web and App" className="input-field" />
          </div>

          <button onClick={generate} disabled={isGenerating} className="btn-primary w-full flex items-center justify-center gap-2">{isGenerating ? (<><Loader2 className="h-5 w-5 animate-spin" />Generating...</>) : 'Generate Brief'}</button>
          {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo Brief</h3>
          {!result ? <p className="text-gray-500">No brief yet.</p> : (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <button onClick={copy} className="text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100 flex items-center gap-1"><Copy className="h-4 w-4" />Copy</button>
                <button onClick={download} className="text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100 flex items-center gap-1">Download</button>
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
