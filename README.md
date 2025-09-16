# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Dialectical Materialism - React Landing Page

A modern, responsive React landing page featuring smooth parallax scrolling effects and an engaging timeline presentation. Built with TypeScript, Vite, and react-scroll-parallax.

![Preview](https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## 🌟 Features

### ✨ Visual Design

- **Full-height Hero Section** with centered title and smooth parallax effects
- **Vertical Timeline** with 4 milestone components featuring alternating layouts
- **Smooth Scroll Effects** powered by react-scroll-parallax
- **Modern UI/UX** with gradient backgrounds and glassmorphism effects
- **Responsive Design** optimized for all screen sizes

### 🎭 Interactive Elements

- **Loading Screen** with animated progress indicator
- **Floating Navigation** with scroll position indicators
- **Back-to-Top Button** with parallax movement
- **Scroll-triggered Animations** for timeline items
- **Smooth Scrolling** between sections

### ♿ Accessibility & Performance

- **Reduced Motion Support** for users with motion sensitivity
- **Keyboard Navigation** with proper focus indicators
- **Semantic HTML** structure for screen readers
- **Lazy Loading** for images with fade-in effects
- **Performance Optimized** with minimal bundle size

## 🚀 Quick Start

### Prerequisites

- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd MLN-Dialectal-Materialism
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── HeroSection.tsx      # Main hero section
│   ├── TimelineSection.tsx  # Timeline container
│   ├── TimelineItem.tsx     # Individual timeline items
│   ├── LoadingScreen.tsx    # Initial loading animation
│   ├── FloatingNav.tsx      # Navigation elements
│   └── icons/               # SVG icon components
├── data/                 # Static data
│   └── timelineData.ts      # Timeline milestone content
├── hooks/                # Custom React hooks
│   └── useIntersectionObserver.ts
├── types/                # TypeScript definitions
│   └── index.ts
├── App.tsx               # Main application component
├── main.tsx              # Application entry point
└── index.css            # Global styles
```

## 🎨 Component Overview

### HeroSection

Full-height landing section with:

- Animated gradient background
- Parallax title animation
- Smooth scroll indicator
- Responsive typography

### TimelineSection

Vertical timeline featuring:

- 4 milestone components
- Alternating left/right layouts
- Scroll-triggered visibility animations
- Responsive grid system

### TimelineItem

Individual timeline milestones with:

- Parallax scrolling effects
- Image lazy loading
- Intersection Observer animations
- Accessible content structure

### LoadingScreen

Initial page load experience:

- Animated progress bar
- Logo animation
- Smooth transition to main content

### FloatingNav

Navigation enhancement:

- Scroll position indicators
- Section navigation dots
- Back-to-top functionality
- Mobile-optimized layout

## 🔧 Customization

### Timeline Content

Edit `src/data/timelineData.ts` to customize timeline milestones:

```typescript
export const timelineData: TimelineMilestone[] = [
  {
    id: "1",
    title: "Your Title",
    description: "Your description...",
    date: "2024",
    imageUrl: "https://your-image-url.com",
    imageAlt: "Image description",
    position: "left", // or 'right'
  },
  // Add more milestones...
];
```

### Styling

- Global styles: `src/index.css`
- Component styles: `src/components/*.css`
- CSS custom properties for easy theme customization

### Parallax Effects

Adjust parallax speeds in components:

```typescript
<Parallax speed={-10}>
  {" "}
  // Negative = slower, Positive = faster
  <YourContent />
</Parallax>
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🎯 Browser Support

- Chrome 88+
- Firefox 84+
- Safari 14+
- Edge 88+

## 📦 Dependencies

### Core

- **React 19.1.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 7.1.2** - Build tool

### Features

- **react-scroll-parallax 3.4.5** - Parallax scrolling effects
- **ESLint** - Code linting
- **CSS3** - Modern styling with custom properties

## 🔧 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## 🎭 Performance Optimizations

1. **Image Optimization**

   - Lazy loading with intersection observer
   - WebP format support
   - Responsive image sizing

2. **Code Splitting**

   - Component-based splitting
   - Dynamic imports for heavy components

3. **CSS Optimization**

   - CSS custom properties
   - Efficient selectors
   - Minimal specificity conflicts

4. **Bundle Optimization**
   - Tree shaking
   - Minification
   - Gzip compression

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliance**
- **Keyboard Navigation**
- **Screen Reader Support**
- **Focus Management**
- **Reduced Motion Preferences**
- **Color Contrast Optimization**

## 🐛 Troubleshooting

### Common Issues

1. **Parallax not working**

   - Ensure ParallaxProvider wraps your app
   - Check for CSS overflow hidden on parent elements

2. **Images not loading**

   - Verify image URLs are accessible
   - Check network connectivity
   - Enable browser dev tools for error messages

3. **Animations not smooth**
   - Check for heavy DOM manipulations
   - Verify hardware acceleration is enabled
   - Consider reducing parallax speeds

### Performance Issues

- Use browser dev tools Performance tab
- Check for memory leaks in animations
- Optimize image sizes and formats

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues:

- Open an issue on GitHub
- Check the documentation
- Review existing issues for solutions

---

**Built with ❤️ using React, TypeScript, and modern web technologies**

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
