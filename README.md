# LanguageKids - Interactive Language Learning Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black.svg)

An interactive, gamified language learning platform designed for students aged 1-18. Built with Next.js, TypeScript, and Firebase.

## 🌟 Features

### For Students
- **📚 Comprehensive Learning Modules**: 20+ modules across 6 age groups
- **🎯 Interactive Quizzes**: Test knowledge with engaging assessments
- **🏆 Gamification**: Earn badges, points, and maintain learning streaks
- **📊 Progress Tracking**: Visual dashboards showing learning achievements
- **🌍 Bilingual Support**: Learn in English and German
- **🎨 Beautiful UI**: Modern, responsive design with smooth animations

### For Teachers
- **👥 Class Management**: Create and manage multiple classes
- **📈 Analytics Dashboard**: Monitor student progress and performance
- **📝 Assignment Creation**: Assign modules and track completion
- **📊 Progress Reports**: Generate detailed student reports
- **🎯 Performance Insights**: Identify strengths and areas for improvement

### Learning Content
- **Ages 1-3**: Colors, numbers, body parts, basic words
- **Ages 3-5**: Alphabet, shapes, weather, emotions
- **Ages 5-8**: Days, seasons, community helpers, transportation
- **Ages 8-12**: Hobbies, geography, daily routines, environment
- **Ages 13-15**: Social media, current events, careers, culture
- **Ages 15-18**: Debate, literature, business, science

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account (for deployment)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd AnshLearning
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file:
```env
GOOGLE_GENAI_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

4. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:9003` to see the application.

## 📦 Project Structure

```
AnshLearning/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Main application page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # UI components (shadcn/ui)
│   │   ├── teacher-dashboard.tsx
│   │   ├── student-progress-dashboard.tsx
│   │   ├── quiz-component.tsx
│   │   └── ...
│   └── lib/                   # Utilities and data
│       ├── data.ts           # Core data structures
│       ├── modules.ts        # Learning modules
│       ├── expanded-modules.ts # Extended module library
│       ├── progress-tracking.ts # Progress system
│       └── vocabulary-data.ts  # Vocabulary database
├── public/                    # Static assets
├── docs/                      # Documentation
├── SCHOOL_DEPLOYMENT_GUIDE.md # School deployment guide
└── package.json              # Dependencies
```

## 🎓 For Schools

### Deployment Options

#### Option 1: Cloud Hosting (Recommended)
- Hosted on Firebase/Vercel
- No maintenance required
- Automatic updates
- Accessible from anywhere

#### Option 2: Self-Hosted
- Deploy on school servers
- Full data control
- Customizable
- See `SCHOOL_DEPLOYMENT_GUIDE.md` for details

### Pricing
- **Starter**: Up to 50 students - $299/year
- **Standard**: Up to 200 students - $799/year
- **Premium**: Up to 500 students - $1,499/year
- **Enterprise**: Unlimited - Custom pricing

### Trial Period
- 30-day free trial
- Full feature access
- No credit card required
- Contact: sales@languagekids.edu

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Backend**: Firebase
- **AI**: Google Generative AI (Gemini)
- **Deployment**: Firebase Hosting

## 📚 Documentation

- [School Deployment Guide](./SCHOOL_DEPLOYMENT_GUIDE.md)
- [API Documentation](./docs/API.md) (Coming soon)
- [Contributing Guide](./CONTRIBUTING.md) (Coming soon)

## 🧪 Testing

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Build for production
npm run build
```

## 🚢 Deployment

### Firebase Hosting

```bash
# Build the application
npm run build

# Deploy to Firebase
firebase deploy
```

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🆘 Support

- **Email**: support@languagekids.edu
- **Documentation**: [docs.languagekids.edu](https://docs.languagekids.edu)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Powered by [Firebase](https://firebase.google.com/)

## 📊 Roadmap

- [ ] Mobile app (iOS/Android)
- [ ] More language pairs (Spanish, French, etc.)
- [ ] Voice recognition for pronunciation
- [ ] Offline mode
- [ ] Parent portal
- [ ] Advanced analytics
- [ ] Custom content creation tools

---

**Made with ❤️ for young learners everywhere**

*Version 1.0.0 - January 2026*
