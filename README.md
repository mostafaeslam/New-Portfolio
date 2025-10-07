# Mostafa Eslam - AI Engineer Portfolio


A modern, responsive portfolio website showcasing AI/ML projects and skills. Built with pure HTML, CSS, and JavaScript for optimal performance.

## 🌟 Features

- **Responsive Design** - Works perfectly on all devices
- **Smooth Animations** - Engaging user experience with CSS animations
- **Interactive Navbar** - Transparent on home, solid white shadowed on other sections
- **Project Showcase** - Highlighting AI/ML projects with detailed descriptions
- **Skills Grid** - Comprehensive display of technical skills
- **Contact Form** - Working contact form with backend API
- **Modern UI/UX** - Clean, professional design

## 🚀 Live Demo

- **Frontend**: [https://mostafaeslam.github.io/New-Portfolio]

## 📁 Project Structure

```
Portfolic/
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── index.js        # Main server file
│   │   ├── routes/
│   │   │   └── contact.js  # Contact form routes
│   │   └── services/
│   │       └── mailer.js   # Email service
│   └── package.json        # Backend dependencies
├── Photos/                 # All project images
├── index.html             # Main HTML file
├── script.js              # All JavaScript functionality
├── styles.css             # All CSS styles
├── requirements.txt       # Project dependencies
└── README.md             # This file
```

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons
- **Google Fonts** - Typography

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Express Rate Limit** - Rate limiting
- **Morgan** - HTTP request logger

## 🚀 Quick Start


!(Photos/About.png)


### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mostafaeslam/New-Portfolio.git
cd portfolio
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Set up environment variables**
```bash
# Create .env file in backend directory
cp .env.example .env
# Edit .env with your email configuration
```

4. **Start the backend server**
```bash
cd backend
npm run dev
```

5. **Open the frontend**
```bash
# Open index.html in your browser or serve with a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

## 🌐 Deployment

### Frontend Deployment (Vercel - Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Deploy automatically

3. **Configure Custom Domain**
- Add your domain in Vercel dashboard
- Update DNS records as instructed

### Backend Deployment (Railway - Recommended)

1. **Deploy to Railway**
- Go to [railway.app](https://railway.app)
- Connect your GitHub repository
- Deploy the backend folder
- Configure environment variables

2. **Update Frontend**
- Update the API URL in your frontend code

## 📧 Contact Form Setup

The contact form requires backend configuration:

1. **Email Service** (Choose one):
   - **Gmail**: Use your Gmail credentials
   - **SendGrid**: Professional email service
   - **Mailgun**: Developer-friendly email API

2. **Environment Variables**:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_SERVICE=gmail
```

## 🎨 Customization

### Colors
- Primary: `#9d174d` (Pink)
- Background: `#f8fafc` (Light Gray)
- Text: `#333` (Dark Gray)

### Typography
- Font Family: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700

### Images
- Replace images in `Photos/` directory
- Maintain aspect ratios for best results
- Use WebP format for better performance

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🔧 Development

### Adding New Projects
1. Add project image to `Photos/` directory
2. Update the projects section in `index.html`
3. Add project details and technologies used

### Adding New Skills
1. Update the skills grid in `index.html`
2. Add appropriate Font Awesome icons
3. Organize by category

### Styling Changes
- Main styles: `styles.css`
- Component-specific styles are organized by sections
- Use CSS custom properties for consistent theming

## 📊 Performance

- **Lighthouse Score**: 95+ on all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Security

- **Helmet.js** for security headers
- **Rate limiting** on API endpoints
- **Input validation** on contact form
- **CORS** configuration for cross-origin requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Mostafa Eslam Elsayed**
- GitHub: [@mostafaeslam](https://github.com/mostafaeslam)
- LinkedIn: [mostafaeslam](https://www.linkedin.com/in/mostafaeslam)
- Email: mostafaeslam1220@gmail.com

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Unsplash for placeholder images
- All the open-source libraries used

---

⭐ **Star this repository if you found it helpful!**