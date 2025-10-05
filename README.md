
Install dependencies:
npm install


Run development server:
npm run dev

The app will be available at http://localhost:5173 (Or higher)


Build for production:
npm run build

Creates optimized production files in the dist/ folder


Preview production build:
npm run preview

Serves the production build locally to test before deployment


Type checking:
npm run typecheck

Checks TypeScript types without building


Linting:
npm run lint

Checks code quality and style


Deploy:
The build output (dist/ folder) can be deployed to any static hosting service:

Netlify: Drag & drop the dist folder or connect your Git repo
Vercel: vercel command or connect via GitHub
GitHub Pages: Push dist folder to gh-pages branch
Cloudflare Pages: Connect repo or upload dist folder
Any static host: Upload contents of dist/ folder
No backend or server required since the app uses LocalStorage for data persistence.