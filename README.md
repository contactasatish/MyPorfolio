# Satish's Portfolio - Professional IT Analyst & Product Manager

A modern, responsive portfolio website showcasing 15+ years of experience in SaaS, ML, and Digital Transformation.

## 🌐 Live Demo

- GitHub Pages: https://contactasatish.github.io/MyPorfolio/
- Full-Stack Version: [Emergent Deployment]

## 🏗️ Architecture

### Frontend (React)
- **Framework**: React 19.0.0 with Create React App
- **Styling**: TailwindCSS + Shadcn UI components
- **Build Tool**: CRACO for custom configurations
- **Features**: 
  - Responsive design with Photo Hero layout
  - Scroll-triggered animations
  - Dynamic content loading
  - Mobile-first approach

### Backend (FastAPI) - Full-Stack Version Only
- **Framework**: FastAPI with Python
- **Database**: MongoDB with Motor (async)
- **Features**:
  - Portfolio data management
  - Contact form handling
  - Analytics tracking
  - Admin panel with JWT authentication
  - PDF resume generation

## 🚀 Deployment Options

### Option 1: GitHub Pages (Static Version)
- **URL**: https://contactasatish.github.io/MyPorfolio/
- **Features**: Full portfolio display with static data
- **Limitations**: No backend features (resume download, contact form, admin panel)

### Option 2: Full-Stack Deployment
- **Platform**: Emergent deployment with managed infrastructure
- **Features**: Complete functionality including backend APIs
- **URL**: Custom domain available

## 📋 Featured Projects

1. **Travel/Airline Solutions Implementation**
   - 38 live NDC airline integrations
   - 30M+ incremental bookings facilitated
   - 5-20% airfare savings achieved

2. **GenAI OCR Model Implementation**
   - 260+ man-hours saved through automation
   - Advanced machine learning and OCR technologies

3. **SaaS Procurement to Production Transformation**
   - $5M+ efficiency improvements delivered
   - Enterprise-scale digital transformation

4. **Compliance Automation System**
   - 99% regulatory standards adherence
   - Automated compliance monitoring

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- Yarn package manager
- Python 3.8+ (for full-stack version)
- MongoDB (for full-stack version)

### Frontend Development
```bash
cd frontend
yarn install
yarn start
```

### Full-Stack Development
```bash
# Backend
cd backend
pip install -r requirements.txt
python server.py

# Frontend (separate terminal)
cd frontend
yarn install
yarn start
```

## 📦 Build Process

### Manual Build
```bash
cd frontend
yarn install
yarn build
```

### Automated Deployment (GitHub Actions)
The repository includes a GitHub Actions workflow that:
1. Automatically builds the React app on push to main branch
2. Deploys to GitHub Pages using the built files
3. Updates the live site at https://contactasatish.github.io/MyPorfolio/

## 🎨 Design Features

- **Photo Hero Layout**: Professional headshot with modern design
- **Aviation Technology**: Special showcase for Travel/Airline solutions
- **Interactive Elements**: Hover effects, scroll animations, responsive grid
- **Professional Metrics**: Project impact statistics and achievements
- **Government Expertise**: Detailed industry experience section

## 📧 Contact Information

- **Email**: contactasatish@gmail.com
- **Phone**: 347-341-7341
- **LinkedIn**: [linkedin.com/in/asatishkr](https://linkedin.com/in/asatishkr)
- **Location**: Dallas–Fort Worth, TX (Remote/Hybrid, open to 25% travel)

## 🔧 Technical Configuration

### Environment Variables
- **Development**: Uses backend API for dynamic data
- **Production (GitHub Pages)**: Uses static data embedded in app
- **Backend URL**: Configurable via REACT_APP_BACKEND_URL

### Build Optimizations
- Homepage configured for GitHub Pages deployment
- Static data fallback for offline functionality
- Optimized images and assets
- Progressive loading for better performance

---

**Built with ❤️ by Satish** | *IT Analyst • Product Manager • Digital Transformation Leader*
