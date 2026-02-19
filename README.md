# Portfolio

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![React: 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite: 7.3.1](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite&logoColor=white)
![TypeScript: 5.9](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)

A modern, multilingual personal portfolio built with React, Vite, and Lucide React. This project features a sleek Bento-style layout for showcasing projects and a responsive design.

## 📑 Table of Contents

- [🎯 Features](#-features)
- [💻 Installation](#-installation)
- [🔧 Environment Configuration](#-environment-configuration)
- [📂 Project Structure](#️-project-structure)
- [🪄 Customization Guide](#-customization-guide-for-cloning-or-adapting)
- [🚢 Deployment](#-deployment)
- [🚦 Continuous Integration](#-continuous-integration)
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

## 🔧 Environment Configuration

The portfolio is built with Vite, so all variables must be prefixed with `VITE_` to be exposed to the frontend. Create a `.env` file at the root of the project with the following:

| Variable                  | Requirement         | Description                                                               |
|:--------------------------|:--------------------|:--------------------------------------------------------------------------|
| `VITE_MAYLEO_ENABLED`     | `true` \| `false`   | Master toggle to enable or disable the Mayleo integration.                |
| `VITE_MAYLEO_API_KEY`     | `UUID`              | The unique identification key assigned to this portfolio.                 |
| `VITE_MAYLEO_HMAC_SECRET` | `String (32 chars)` | The secret key used to compute the HMAC-SHA256 request signature.         |
| `VITE_MAYLEO_URL`         | `URL`               | The base URL of your hosted Mayleo Email Gateway instance.                |
| `VITE_SITE_URL`           | `URL`               | Public URL used for SEO metadata.                                         |

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
| `/public/og-image.png`        | Image for SEO (Open Graph)                                         |
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

### 🖼️ Image Optimization

For maximum performance, this portfolio supports next-gen image formats (**WebP** and **AVIF**). 

### How to use
When using the `Image` component, simply add the `autoOptimize` prop:
```tsx
<Image src="/my-photo.jpg" autoOptimize={true} alt="Profile" />
```
This will automatically attempt to load `/my-photo.avif` or `/my-photo.webp` before falling back to the original JPG/PNG.

### Generating optimized assets
The optimization process is now automated! Every time you run `npm run build`, a script (`scripts/optimize-images.mjs`) scans your `public/assets` folder and generates the corresponding WebP and AVIF files.

You can also run it manually:
```bash
npm run optimize-images
```

This script is intelligent: it only generates files if they don't exist or if the source image is newer than the optimized version.

## 🚢 Deployment

This project is optimized for static deployment.  
You can preview or host it using Vercel, Netlify, or any static hosting provider.

## 🚦 Continuous Integration

To ensure high quality, this project integrates **Lighthouse CI**.
Every Pull Request triggers an automated audit checking:
- **Performance** (Core Web Vitals)
- **Accessibility**
- **Best Practices**
- **SEO**

Detailed reports are generated and linked in the PR status.

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
- **Sharp** — High-performance image processing
- **Lighthouse CI** — Automated performance monitoring

## 🗺️ Roadmap & Future Evolutions

- [x] **CSS Refactoring**:
  - [x] Standardize CSS usage (Move away from "home-made" utility classes in `index.css`).
  - [x] Consolidate global styles to avoid conflicts.
- [x] **Assets & Optimization**:
  - [x] Support next-gen image formats (WebP/AVIF fallbacks).
  - [x] Implement a default OG image for SEO.
  - [x] Automate image conversion (scripts for WebP/AVIF).
- [x] **Accessibility (A11y)**:
  - [x] Implement focus trapping and keyboard navigation in mobile menu.
  - [x] Add descriptive ARIA labels to interactive elements.
- [ ] **Code Quality**:
  - [x] Reach 0 lint errors and 100% unit test coverage.
  - [ ] Add End-to-End (E2E) tests for the contact form flow.
- [ ] **Content & Features**:
  - [ ] Add more detailed project case studies.
  - [ ] Implement an "Estimated reading time" for project details.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
