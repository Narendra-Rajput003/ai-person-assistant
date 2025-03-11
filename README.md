# AI Personal Assistant Platform 🤖

![AI Personal Assistant Logo](public/logo.svg)

A powerful AI assistant platform that connects users with specialized AI agents for various tasks - from fitness coaching to code writing. Built with Next.js 13, TypeScript, and integrated with multiple AI models through Eden AI.

## 🌟 Features

- **Multiple AI Assistants**: Specialized AI agents for different domains:
  - Fitness Coach (Jack) 💪
  - Grammar Fixer (Emma) ✍️
  - Email Writer (Olivia) 📩
  - YouTube Script Writer (Liam) 🎬
  - Code Writer (Harry) 💻

- **AI Model Integration**: Support for multiple AI models:
  - Google Gemini 2.0
  - OpenAI GPT-3.5 Turbo
  - Mistral Large
  - Anthropic Claude

- **User Features**:
  - Google Authentication
  - Token-based credit system
  - Premium subscription support
  - Real-time chat interface
  - Theme customization

## 🚀 Tech Stack

- **Frontend**:
  - Next.js 15.2
  - React 19
  - TypeScript
  - Tailwind CSS
  - Radix UI Components
  - Lucide Icons

- **Backend**:
  - Convex Database
  - Eden AI API Integration
  - Google OAuth

- **State Management**:
  - React Context
  - Convex Real-time Subscriptions

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-personal-assistant.git
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
EDEN_AI_API_KEY=your_eden_ai_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

## 📝 Environment Variables

- `NEXT_PUBLIC_CONVEX_URL`: Convex database URL
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Google OAuth client ID
- `EDEN_AI_API_KEY`: Eden AI API key for AI model integration

## 🎯 Usage

1. Sign in with Google account
2. Select an AI assistant based on your needs
3. Start chatting and get AI-powered responses
4. Monitor token usage in your profile
5. Upgrade to premium for additional features

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
