# 🔧 Configuration Guide

<div align="center">

[![Configuration](https://img.shields.io/badge/Configuration-Environment_Setup-blue?style=for-the-badge&logo=gear)]
[![AI Models](https://img.shields.io/badge/AI_Models-OpenAI_%26_Local_LLM-green?style=for-the-badge&logo=robot)]
[![Security](https://img.shields.io/badge/Security-API_Keys_Protected-red?style=for-the-badge&logo=shield)]

</div>

## 🌍 Environment Variables

Create a `.env.local` file with the following variables:

```bash
# OpenAI API (Recommended for production)
OPENAI_API_KEY=sk-your_openai_api_key_here

# Local LLM (Optional, for cost-free development)
LOCAL_LLM_API_URL=http://localhost:8000/generate
LOCAL_LLM_API_KEY=your_local_llm_api_key_here
LOCAL_LLM_MODEL=gpt-oss120b

# Application Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🤖 AI Model Selection

The application allows users to choose between:

| Model | Pros | Cons | Cost |
|-------|------|------|------|
| **OpenAI API** (Default) | High-quality responses, Consistent performance | Requires API key, Usage costs | ~$0.0025 per 1K tokens |
| **Local LLM** (GPT-OSS120b) | Cost-free generation, Full control over model | Requires local server setup, Hardware intensive | Free |

### OpenAI API Integration
- **Model**: GPT-4o-mini
- **Quality**: High-quality, consistent responses
- **Setup**: Just add your API key to environment variables
- **Rate Limits**: 3,500 requests/minute

### Local LLM Integration
- **Model**: GPT-OSS120b
- **Quality**: Good quality, customizable
- **Setup**: Requires local server deployment
- **Hardware**: 8GB+ VRAM, 16GB+ RAM recommended

## 🌐 Environment Variables for Production

In Vercel Dashboard → Project Settings → Environment Variables:

```bash
OPENAI_API_KEY=sk-your_production_openai_key
LOCAL_LLM_API_URL=https://your-llm-server.com/generate
LOCAL_LLM_API_KEY=your_production_llm_key
NODE_ENV=production
```

## 🖥️ Local LLM Server Setup

For cost-free AI generation, deploy a local LLM server:

### Option 1: Docker (Recommended)

```bash
# Using Docker (Recommended)
docker run -d \
  --name gpt-oss120b \
  -p 8000:8000 \
  -e MODEL_NAME=gpt-oss120b \
  gpt-oss120b:latest

# Or use Hugging Face Transformers
docker run -d \
  --name transformers-server \
  -p 8000:8000 \
  -v $(pwd)/models:/models \
  huggingface/transformers:latest
```

### Option 2: Python FastAPI Server

```python
# requirements.txt
fastapi==0.104.1
uvicorn==0.24.0
transformers==4.35.0
torch==2.1.0

# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

app = FastAPI()

class GenerateRequest(BaseModel):
    prompt: str
    max_tokens: int = 500
    temperature: float = 0.7

@app.post("/generate")
async def generate_text(request: GenerateRequest):
    try:
        # Your LLM generation logic here
        response = "Generated response from local LLM"
        return {"text": response, "success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## 🔒 Security Best Practices

| Practice | Description | Implementation |
|----------|-------------|----------------|
| **API Key Security** | Never commit API keys to Git | Use `.env.local` and environment variables |
| **Key Rotation** | Regularly update API keys | Set reminders for quarterly updates |
| **Access Control** | Limit API key permissions | Use least privilege principle |
| **Monitoring** | Track API usage and costs | Implement usage alerts |

## 📊 Configuration Validation

Test your configuration with these commands:

```bash
# Validate environment variables
npm run build

# Test API endpoints
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Test prompt"}'

# Check local LLM connection
curl http://localhost:8000/health
```

## 🚀 Performance Tuning

| Setting | Development | Production | Description |
|---------|-------------|------------|-------------|
| **Caching** | Disabled | Enabled | Redis-based response caching |
| **Rate Limiting** | Basic | Advanced | User-based quotas |
| **Monitoring** | Console logs | Analytics dashboard | Usage tracking |
| **Error Handling** | Detailed | Sanitized | Security-focused |

---

<div align="center">

**Configuration complete! 🎉**

[![Ready](https://img.shields.io/badge/Ready_to_Deploy-Success-green?style=for-the-badge&logo=check-circle)]

</div>