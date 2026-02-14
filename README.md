# Portfolio

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![React: 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite: 7.3.1](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite&logoColor=white)
![TypeScript: 5.9](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)

A modern, multilingual personal portfolio built with React, Vite, and Lucide React. This project features a sleek Bento-style layout for showcasing projects and a responsive design.

## 📑 Table of Contents

- [🎯 Features](#-features)
- [💻 Installation](#-installation)
- [📂 Project Structure](#️-project-structure)
- [🪄 Customization Guide](#-customization-guide)
- [🚢 Deployment](#-deployment)
- [🧱 Tech Stack](#-tech-stack)
- [🗺️ Roadmap & Future Evolutions](#️-roadmap--future-evolutions)
- [📜 License](#-license)

## 🎯 Features

- **Bento Layout**: A modern way to showcase projects and skills.
- **Multilingual Support**: Fully localized using `i18next` and `react-i18next`.
- **Responsive Design**: Optimized for all screen sizes.
- **Modern Tech Stack**: Built with React 19 and Vite 7.
- **Iconography**: Beautiful icons provided by Lucide React.

## 💻 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/florentdeborde/portfolio.git
   cd portfolio
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run application:**
   ```bash
   npm run dev
   ```
The site will be available at http://localhost:5173

## 📂 Project Structure

```text
src/
├── components/   # Reusable UI components (BentoHomeCard, BentoCard)
├── config/       # Configuration files (parameters, etc.)
├── locales/      # Translation files (JSON)
├── pages/        # Main application pages (Home, About, Projects)
├── services/     # Service files (email, etc.)
├── i18n.ts       # Internationalization configuration
├── App.tsx       # Main application component
└── main.tsx      # Entry point
```

## 🪄 Customization Guide (for cloning or adapting)

When duplicating this project for another developer, you’ll mainly need to update:

| File / Folder                 | What to update                                                     |
| ----------------------------- | ------------------------------------------------------------------ |
| `/public/p-logo.svg`          | Site logo/favicon                                                  |
| `/public/locales/`            | Translation JSON files                                             |
| `/public/sitemap.xml`         | Update URLs for the new domain                                     |
| `/src/assets/`                | Project images and assets                                          |
| `/src/config/routes.ts`       | Application routing and paths                                      |
| `/src/config/parameters.ts`   | Project data, links, and contact information                       |
| `/src/pages/`                 | Page components and layouts                                        |
| `/src/pages/Home.tsx`         | Name Surname & Latest Project                                      |
| `/src/App.tsx`                | Main application component and route definitions                   |
| `/index.html`                 | Site title and base HTML structure                                 |
| `/package.json`               | Project name, version, and dependencies                            |
| `/README.md`                  | Update project description and headers                             |
| `/vercel.json`                | Deployment configuration (if using Vercel)                         |

## 🚢 Deployment

This project is optimized for static deployment.  
You can preview or host it using Vercel, Netlify, or any static hosting provider.

## 🧱 Tech Stack

- **React 19** (`react`, `react-dom`) — Core framework
- **React Router 7** (`react-router-dom`) — Routing
- **Vite 7** — Next-generation frontend build tool & dev server
- **TypeScript** — Static typing
- **i18next** — Internationalization
- **Lucide React** — Icon library
- **React Helmet Async** — SEO & Meta tags
- **Vitest** — Unit Testing
- **Playwright** — End-to-End Testing

## 🗺️ Roadmap & Future Evolutions

- [x] **CSS Refactoring**:
  - [x] Standardize CSS usage (Move away from "home-made" utility classes in `index.css`).
  - [x] Consolidate global styles to avoid conflicts.
- [ ] **Assets & Optimization**:
  - [ ] Automate image optimization (WebP/AVIF generation).
  - [ ] Implement a default OG image for SEO.
- [ ] **Accessibility (A11y)**:
  - [ ] Audit keyboard navigation focus states.
  - [ ] Ensure all interactive elements have proper ARIA labels.
- [ ] **Code Quality**:
  - [ ] Resolve remaining "silenced" linting warnings.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
