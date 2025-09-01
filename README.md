# 🍍 Pineapple AI - AI Generator Hub

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14.2.32-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai)](https://openai.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

![Pineapple AI](https://img.shields.io/badge/Pineapple_AI-AI_Generator_Hub-blue?style=for-the-badge&logo=robot)
![Status](https://img.shields.io/badge/Status-Production_Ready-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

</div>

A modern, AI-powered platform for generating professional customer service responses and chatbot content. Built with Next.js, React, and Tailwind CSS, featuring seamless integration with OpenAI API and local LLM options.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd pineapple-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Core Features

| Feature | Description | Status |
|---------|-------------|---------|
| 🤖 **AI Generation** | OpenAI GPT-4o-mini & Local LLM support | ✅ Ready |
| 📱 **Responsive Design** | Mobile-first, tablet & desktop optimized | ✅ Ready |
| 🔄 **Real-time Generation** | Instant AI response generation | ✅ Ready |
| 🎨 **Multiple Generators** | 6 specialized AI generators | ✅ Ready |
| 🔒 **Secure API** | Environment-based API key management | ✅ Ready |
| 📊 **Dashboard Analytics** | Project management & insights | ✅ Ready |

## 🧪 Example Prompts for Demo

### 1. Customer Service Bot
```
Business Type: E-commerce
Industry: Online Retail
Customer Issue: "My order hasn't arrived after 2 weeks"
Tone: Professional
Language: English
Response Length: Medium
```

### 2. Sales Assistant Bot
```
Product: AI-powered CRM platform
Customer Profile: Small business owner
Objection: "It's too expensive for my budget"
Tone: Consultative
Language: English
Response Length: Long
```

### 3. Blog Content Writer
```
Topic: "10 Ways to Improve Customer Retention"
Industry: SaaS
Target Audience: Business owners
Tone: Educational
Language: English
Content Type: Blog post
```

### 4. Email Campaign Generator
```
Campaign Type: Onboarding
Goal: Welcome new users and guide them through setup
Audience: New trial users
Product: Project management tool
Tone: Friendly
Language: English
```

### 5. Logo Design Generator
```
Brand Name: TechFlow
Tagline: "Streamline your workflow"
Core Values: Innovation, efficiency, collaboration
Style: Modern
Color Preferences: Blues and greens
Primary Usage: Web and mobile apps
```

### 6. Code Generator
```
Language: JavaScript
Task: Create a function to validate email addresses
Constraints: No external libraries, must handle edge cases
Include: Inline comments explaining key steps
```

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy with Vercel**
   - Connect your GitHub repo to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy automatically on every push

## 🧪 Testing

### Development Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### API Testing

Test the AI generation endpoints:

```bash
# Test OpenAI integration
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Generate a customer service response","businessType":"E-commerce"}'

# Test local LLM integration
curl -X POST http://localhost:3000/api/generate-local \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Generate a customer service response","businessType":"E-commerce"}'
```

## 📚 Documentation

| Document | Description | Link |
|----------|-------------|------|
| 📖 **Configuration** | Environment setup & AI model configuration | [config.md](public/markdown/config.md) |
| 🚀 **Deployment** | Complete deployment guide with Vercel | [DEPLOYMENT.md](public/markdown/DEPLOYMENT.md) |
| 🏗️ **Project** | Architecture & technical details | [project.md](public/markdown/project.md) |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

### Documentation

- **Deployment Guide**: See [DEPLOYMENT.md](public/markdown/DEPLOYMENT.md) for detailed deployment instructions
- **API Reference**: Check `pages/api/` for API endpoint documentation
- **Component Library**: Browse `src/components/` for reusable components

### Getting Help

- **Issues**: Create GitHub issues for bugs or feature requests
- **Discussions**: Use GitHub discussions for questions and ideas
- **Documentation**: Check the comprehensive deployment guide

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">

**Built with ❤️ using Next.js, React, and Tailwind CSS**

[![Made with Love](https://img.shields.io/badge/Made_with-Love-red?style=for-the-badge)](https://github.com/your-username/ai-generator-hub)

</div>
