# Sivasri Portfolio

A modern, responsive developer portfolio built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Live Demo & Deployment

### 1. Deploy on Vercel (Recommended)
Vercel provides seamless zero-configuration hosting for Vite React applications with global CDN performance and automatic SSL.

#### Option A: Quick Import via Vercel Dashboard (1-Click)
1. Go to [Vercel New Project](https://vercel.com/new).
2. Connect your **GitHub** account and select the **`sivasri-portfolio`** repository.
3. Vercel will automatically detect **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Your portfolio will be live in ~30 seconds!

---

### 2. GitHub Pages Deployment
A GitHub Actions workflow is included in `.github/workflows/deploy.yml`. 

To enable GitHub Pages:
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Push any commit to the `main` branch to trigger an automatic build and deployment.

---

## 🛠️ Local Setup & Development

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sivasri-developer/sivasri-portfolio.git
   cd sivasri-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🧰 Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Icons:** Lucide React
- **Animations:** Motion
