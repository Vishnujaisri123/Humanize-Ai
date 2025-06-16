# Humanizer AI - 3D Futuristic Text Processor

A cutting-edge web application that transforms robotic, machine-generated text into natural, human-sounding language using OpenAI's GPT-4 API. Features a stunning 3D animated interface with holographic panels, particle effects, and immersive sci-fi aesthetics.

## 🚀 Features

- **Real AI Processing**: Powered by OpenAI GPT-4 for authentic text humanization
- **Multiple Tone Styles**: Professional, Friendly, Conversational, Poetic, Simplified
- **3D Animated Interface**: Futuristic UI with particle effects and holographic elements
- **File Processing**: Upload and process .txt and .md files
- **Advanced Controls**: Adjustable AI parameters (temperature, top-p, max tokens)
- **Export Options**: Download results as .txt or .md files
- **Real-time Processing**: Live progress tracking with animated stages

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure OpenAI API
1. Get your OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys)
2. Create a `.env` file in the project root:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

### 3. Start the Application
```bash
npm run dev
```

This will start both the backend server (port 3001) and frontend development server (port 5173).

## 🎯 How to Use

1. **Input Text**: Paste or type your machine-generated text in the input pod
2. **Select Tone**: Choose your desired tone style from the 3D wheel selector
3. **Adjust Settings**: Fine-tune AI parameters using the settings panel
4. **Process**: Click "Humanize" or press Ctrl+Enter to transform your text
5. **Export**: Copy or download your humanized text in various formats

### File Processing
- Drag and drop .txt or .md files into the upload zone
- Click the lightning bolt icon on any uploaded file to process it directly
- Files are automatically loaded into the input field for editing before processing

## 🎨 Design Features

- **Neon Color Palette**: Electric blues, plasma greens, and chrome accents
- **3D Animations**: Floating elements, particle trails, and holographic effects
- **Responsive Design**: Optimized for desktop and mobile devices
- **Accessibility**: Keyboard shortcuts and screen reader support

## 🔧 Technical Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, OpenAI API
- **Icons**: Lucide React
- **Fonts**: Orbitron, JetBrains Mono

## 📊 API Endpoints

- `POST /api/humanize` - Process text with AI humanization
- `GET /api/health` - Check server and API key status

## 🚨 Troubleshooting

### "OpenAI API key not configured" Error
1. Ensure your `.env` file exists in the project root
2. Verify your API key is correct and has sufficient credits
3. Restart the development server after adding the API key

### Backend Connection Issues
- Check that port 3001 is available
- Ensure both frontend and backend servers are running
- Verify CORS settings if accessing from different domains

## 🌟 Future Enhancements

- [ ] Multiple AI model support (Claude, Gemini)
- [ ] Batch file processing
- [ ] Custom tone creation
- [ ] Usage analytics dashboard
- [ ] Team collaboration features

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

Built with ❤️ for the future of AI-powered writing tools.