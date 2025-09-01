export default async function handler(req, res) {
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
      customerQuery 
    } = req.body

    // Build the complete prompt for the local LLM
    let fullPrompt = `Generate a professional customer service response for a ${businessType} business in the ${industry} industry.`
    
    if (tone) fullPrompt += ` Use a ${tone} tone.`
    if (language) fullPrompt += ` Respond in ${language}.`
    if (responseLength) fullPrompt += ` Keep the response ${responseLength}.`
    if (specificScenario) fullPrompt += ` Scenario: ${specificScenario}`
    if (customerQuery) fullPrompt += ` Customer query: ${customerQuery}`
    
    fullPrompt += `\n\n${prompt}`

    // Call local LLM API (replace with your local endpoint)
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
      })
    })

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

  } catch (error) {
    console.error('Local LLM Generation Error:', error)
    
    res.status(500).json({ 
      error: 'Local AI generation failed. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      code: 'LOCAL_LLM_ERROR'
    })
  }
}
