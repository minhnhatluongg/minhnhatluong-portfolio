# 🚀 Personal Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. This project is designed for learning React.js fundamentals through practical implementation.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-6.0.5-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-cyan)

## ✨ Features

- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design (mobile-first)
- 🎭 Smooth scroll animations
- 🔄 Reveal on scroll effects
- 💫 Beautiful hover effects and transitions
- 🧩 Component-based architecture
- 📚 Well-documented code for learning
- 🔗 GitHub project links integration
- 🎯 Clean and maintainable code structure

## 🛠️ Tech Stack

- **React** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Programming language

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── sections/        # Page sections (Home, About, Projects)
│   │   ├── NavBar.jsx
│   │   ├── MobileMenu.jsx
│   │   ├── LoadingScreen.jsx
│   │   └── RevealOnScroll.jsx
│   ├── App.jsx              # Main app component
│   ├── index.css            # Global styles & animations
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── COMPONENT_GUIDE.md       # Detailed component documentation (Vietnamese)
└── README.md
```

## 📚 Learning Resources

**New to this project?** Check out [`COMPONENT_GUIDE.md`](./COMPONENT_GUIDE.md) for:
- Detailed explanation of each component
- Step-by-step learning path
- Code examples and best practices
- Tips for customization
- Vietnamese language support

## 🎯 Components Overview

### Reusable UI Components
- **Button** - Versatile button with variants
- **Card** - Container with glass morphism effect
- **SkillBadge** - Skill tag component
- **SectionTitle** - Gradient section titles
- **ProjectCard** - Project showcase card
- **SkillsGroup** - Grouped skills display
- **InfoCard** - Information card with icon

### Section Components
- **Home** - Hero/landing section
- **About** - About me, skills, education, work experience
- **Projects** - Project showcase with GitHub links

## 🎨 Customization

### Change Theme Colors
Find and replace these Tailwind classes:
- `blue-500` → your primary color
- `cyan-400` → your accent color

### Add New Project
Edit `src/components/sections/Project.jsx`:

```jsx
const projectsData = [
  {
    title: "Your Project",
    description: "Project description",
    technologies: ["React", "Node.js"],
    githubLink: "https://github.com/username/repo",
    liveLink: "https://demo.com" // optional
  }
];
```

### Modify Skills
Edit `src/components/sections/About.jsx`:

```jsx
const frontEndSkills = ["React", "JavaScript", "HTML", "CSS"];
const backEndSkills = ["Node.js", ".NET", "MongoDB"];
```

## 🚀 Deployment

Build the project for production:

```bash
npm run build
```

The build output will be in the `dist/` directory. You can deploy it to:
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)
- Any static hosting service

## 📝 License

This project is open source and available for learning purposes.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📧 Contact

Luong Minh Nhat - Software Engineer

---

**Built with ❤️ using React and Tailwind CSS**
