
````markdown
# 🚀 EstimateScopeAI

**EstimateScopeAI** is a web platform that helps Project Managers and Developers automatically estimate project costs, timelines, and project scope using **Google Gemini AI**.

---

## 🛠️ Tech Stack

* **Frontend:** Angular 19 with Standalone Components + Tailwind CSS  
* **Backend:** .NET 8 Web API  
* **AI Engine:** Google Gemini Pro API  
* **Infrastructure & Deployment:** Docker & Nginx, deployed on Railway  

---

## 🏗️ Project Structure

The repository follows a **Monorepo** layout:

```text
EstimateScopeAI/
├── EstimateScope.Client/   # Angular frontend
│   ├── Dockerfile          # Nginx production build
│   └── src/                # Source code
├── EstimateScope.API/      # .NET backend
│   ├── Dockerfile          # .NET runtime build
│   └── Controllers/        # API endpoints
└── README.md
````

---

## 📝 Frontend Details

* **Navbar Component:** Standalone Angular component with:

  * Responsive hamburger menu using Angular **Signals** (`isMenuOpen = signal(false)`)
  * Mobile menu toggled via `toggleMenu()` / `closeMenu()` methods
  * Logo references `/assets/favicon.ico` for consistent branding
  * Language switcher using `LangService` for dynamic translation
* **Tailwind CSS:** Used for layout, hover animations, responsive visibility (`md:hidden`, `md:flex`)
* **Favicon:** Handled separately in `<link rel="icon">` for browser tab

**Example: Mobile menu signal usage**

```ts
isMenuOpen = signal(false);

toggleMenu() {
  this.isMenuOpen.set(!this.isMenuOpen());
}

closeMenu() {
  this.isMenuOpen.set(false);
}
```

**Template binding**

```html
<div *ngIf="isMenuOpen()">
  <!-- mobile menu content -->
</div>
```

* **Navbar Logo Example:**

```html
<img src="/assets/favicon.ico" alt="Logo" class="w-8 h-8 rounded-lg shadow-lg transition-transform group-hover:scale-110">
```

---

## 📝 Backend Details

* **.NET 8 Web API:** Provides endpoints for project estimation and AI integration
* **Gemini API Integration:** Handles requests to Google Gemini Pro for cost and scope predictions
* **CORS Configuration:** Ensures frontend domain can access backend endpoints

---

## 🐳 Docker & Production Notes

* **Frontend:** Nginx serves Angular SPA with fallback routing (`try_files $uri $uri/ /index.html`)
* **Backend:** .NET runtime exposes API endpoints, environment variables manage API keys and URLs
* Both services are containerized for deployment on Railway

---

## ⚡ Key Technical Highlights

1. Angular **Signals** used for reactive state management in standalone components
2. Responsive design fully handled with Tailwind classes
3. Mobile menu with smooth toggle logic and z-index control to avoid overlay issues
4. Navbar logo and favicon handled separately to avoid 404 errors
5. Monorepo structure separates client and API concerns cleanly

---

**Developed with ❤️ by Khairannoor**


```
