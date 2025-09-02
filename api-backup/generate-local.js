export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { 
      prompt, 
      businessType, 
      industry, 
      tone, 
      language, 
      responseLength,
      specificScenario,
      customerQuery,
      generatorType 
    } = req.body

    // Input validation
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'Prompt is required and must be a non-empty string' })
    }

    if (prompt.length > 2000) {
      return res.status(400).json({ error: 'Prompt is too long. Maximum 2000 characters allowed.' })
    }

    // Validate generator type
    const validGeneratorTypes = ['customer-service', 'sales-assistant', 'blog-writer', 'email-campaign', 'logo-design', 'code-generator']
    if (generatorType && !validGeneratorTypes.includes(generatorType)) {
      return res.status(400).json({ error: 'Invalid generator type' })
    }

    // Build the complete prompt for the local LLM
    let fullPrompt = `Generate a professional customer service response for a ${businessType} business in the ${industry} industry.`
    
    if (tone) fullPrompt += ` Use a ${tone} tone.`
    if (language) fullPrompt += ` Respond in ${language}.`
    if (responseLength) fullPrompt += ` Keep the response ${responseLength}.`
    if (specificScenario) fullPrompt += ` Scenario: ${specificScenario}`
    if (customerQuery) fullPrompt += ` Customer query: ${customerQuery}`
    
    fullPrompt += `\n\n${prompt}`

    // Call local LLM API with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    try {
      const localLLMResponse = await fetch(process.env.LOCAL_LLM_API_URL || 'http://localhost:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.LOCAL_LLM_API_KEY || ''}`
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          max_tokens: 500,
          temperature: 0.7,
          model: process.env.LOCAL_LLM_MODEL || 'gpt-oss120b'
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!localLLMResponse.ok) {
        throw new Error(`Local LLM API responded with status: ${localLLMResponse.status}`)
      }

      const result = await localLLMResponse.json()
      const generatedText = result.text || result.response || result.content

      // Return the generated response
      res.status(200).json({ 
        success: true,
        text: generatedText,
        model: process.env.LOCAL_LLM_MODEL || 'local-llm',
        source: 'local'
      })

    } catch (apiError) {
      clearTimeout(timeoutId)
      if (apiError.name === 'AbortError') {
        return res.status(408).json({ 
          error: 'Request timeout. Please try again.',
          code: 'TIMEOUT'
        })
      }
      throw apiError
    }

  } catch (error) {
    console.error('Local LLM Generation Error:', error)
    
    res.status(500).json({ 
      error: 'Local AI generation failed. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      code: 'LOCAL_LLM_ERROR'
    })
  }
}
