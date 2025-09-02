import React, { useState } from 'react'
import Link from 'next/link'
import { Loader2, RefreshCw, Copy, Download, Share2, ArrowLeft } from 'lucide-react'
import { generateContent } from '../../src/utils/apiClient'

export default function EmailCampaignGeneratorPage() {
  const [formData, setFormData] = useState({
    campaignType: 'Promotional',
    goal: '',
    audience: '',
    product: '',
    tone: 'Friendly',
    language: 'English'
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState('')

  const handleChange = (e) => { const { name, value } = e.target; setFormData(p => ({ ...p, [name]: value })) }

  const generate = async () => {
    setIsGenerating(true); setError(null); setResult('')
    try {
      const prompt = `Write a ${formData.campaignType} email in ${formData.language} with a ${formData.tone} tone. Goal: ${formData.goal}. Audience: ${formData.audience}. Product/Offer: ${formData.product}. Include a compelling subject line and a clear CTA button copy.`
      const data = await generateContent(prompt, { generatorType: 'email-campaign' })
      if (data.success) {
        setResult(data.text)
      } else {
        throw new Error(data.error || 'Generation failed')
      }
    } catch (e) { setError(e.message) } finally { setIsGenerating(false) }
  }

  const copy = async () => { try { await navigator.clipboard.writeText(result) } catch {} }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 py-4">
            <Link href="/generator-hub" className="text-gray-500 hover:text-gray-700"><ArrowLeft className="h-5 w-5" /></Link>
            <span className="text-gray-400">/</span>
            <Link href="/generator-hub" className="text-gray-500 hover:text-gray-700">Pineapple Hub</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Email Campaign Generator</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
              <select name="campaignType" value={formData.campaignType} onChange={handleChange} className="input-field">
                <option>Promotional</option>
                <option>Onboarding</option>
                <option>Re-engagement</option>
                <option>Newsletter</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
              <select name="tone" value={formData.tone} onChange={handleChange} className="input-field">
                <option>Friendly</option>
                <option>Professional</option>
                <option>Casual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Goal</label>
            <input name="goal" value={formData.goal} onChange={handleChange} placeholder="e.g., drive signups, announce launch" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
            <input name="audience" value={formData.audience} onChange={handleChange} placeholder="e.g., new trial users" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product/Offer</label>
            <input name="product" value={formData.product} onChange={handleChange} placeholder="e.g., 20% off Pro plan" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select name="language" value={formData.language} onChange={handleChange} className="input-field">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>

          <button onClick={generate} disabled={isGenerating} className="btn-primary w-full flex items-center justify-center gap-2">{isGenerating ? (<><Loader2 className="h-5 w-5 animate-spin" />Generating...</>) : 'Generate Email'}</button>
          {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Email</h3>
          {!result ? <p className="text-gray-500">No email yet.</p> : (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <button onClick={copy} className="text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100 flex items-center gap-1"><Copy className="h-4 w-4" />Copy</button>
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
