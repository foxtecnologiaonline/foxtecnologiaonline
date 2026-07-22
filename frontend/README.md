# mycollect - Audits & Deployment

## 🚀 Live Deployment & Repository
- **Production URL (Custom Domain):** [https://foxtecnologia.online/mycollect](https://foxtecnologia.online/mycollect)
- **Vercel URL:** [https://mycollect-ten.vercel.app](https://mycollect-ten.vercel.app)
- **GitHub Repository:** [https://github.com/foxtecnologiaonline/mycollect.git](https://github.com/foxtecnologiaonline/mycollect.git)
- **Vercel Dashboard:** [View Project](https://vercel.com/foxtecnologiaonlines-projects/mycollect/8oqTyWPvYbXXF4ucZ2QBmGJMtJZp)

---

## 1. Security Audit & Vulnerability Assessment
*Current State:* The application is a frontend-only Single Page Application (SPA) using `localStorage` for data persistence and authentication mocking.

**10 Suggestions for Security Improvements:**
1. **Implement Real Authentication:** Replace the mocked `localStorage` login with a secure backend authentication system (e.g., JWT, OAuth2 via Firebase Auth, Auth0, or NextAuth).
2. **Secure API Keys:** The `process.env.API_KEY` for Gemini is currently exposed in the frontend bundle. This must be moved to a backend proxy server or serverless function to prevent quota theft and abuse.
3. **Data Encryption:** Sensitive user data stored in `localStorage` is in plain text. If offline capabilities are needed, use encrypted IndexedDB or secure cookies for session tokens.
4. **Input Sanitization:** Ensure all user inputs (collection names, descriptions) are sanitized on the backend to prevent Stored Cross-Site Scripting (XSS). React escapes HTML by default, but backend validation is still required.
5. **File Upload Security:** The current image upload accepts base64 strings. A backend must validate file types (MIME sniffing), enforce strict size limits (e.g., max 5MB), and scan for malware before storing in a bucket (like AWS S3).
6. **Rate Limiting:** Implement rate limiting on the API endpoints (especially the Gemini AI calls) to prevent Denial of Service (DoS) attacks and unexpected billing spikes.
7. **CORS Configuration:** When a backend is introduced, configure strict Cross-Origin Resource Sharing (CORS) policies to only allow requests from your specific frontend domains (`foxtecnologia.online` and `mycollect-ten.vercel.app`).
8. **Content Security Policy (CSP):** Add a strict CSP header in `index.html` to restrict where scripts, images, and styles can be loaded from, mitigating XSS risks.
9. **CSRF Protection:** If using cookie-based authentication in the future, implement Anti-CSRF tokens for all state-changing requests.
10. **Dependency Management:** Regularly audit and update the `importmap` dependencies to patch known vulnerabilities in React, React Router, or the Gemini SDK.

---

## 2. SEO, Ranking & Marketing Audit
*Current State:* The app is a client-side rendered SPA using HashRouter, which is generally poor for SEO. *Note: Canonical and Open Graph tags have been added for `foxtecnologia.online/mycollect`.*

**10 Suggestions for SEO & Marketing Improvements:**
1. **Migrate to Server-Side Rendering (SSR):** Move the application to a framework like Next.js or Remix. Search engine crawlers struggle with SPAs that require JavaScript to render content.
2. **Remove HashRouter:** Change `HashRouter` (`/#/collections`) to `BrowserRouter` (`/collections`). Hash URLs are not indexed properly by Google.
3. **Dynamic Meta Tags:** Implement a library like `react-helmet` to dynamically update the `<title>`, `<meta name="description">`, and Open Graph tags for each specific collection and item page.
4. **Semantic HTML:** Improve the HTML structure by using more semantic tags (`<article>`, `<section>`, `<nav>`, `<main>`) instead of generic `<div>` elements.
5. **Image Optimization & Alt Text:** Ensure all uploaded images are compressed (WebP/AVIF) and have descriptive `alt` attributes. Currently, the alt text uses the item name, which is good, but could be expanded.
6. **Schema Markup (JSON-LD):** Add structured data (Product or Collectible schema) to item detail pages so Google can display rich snippets (price, condition, image) in search results.
7. **Sitemap & Robots.txt:** Generate an XML sitemap and a `robots.txt` file to guide search engine crawlers through the public pages of the site.
8. **Public Showcases:** Create a feature allowing users to make specific collections "Public". This generates shareable, indexable pages that drive organic traffic to the platform.
9. **Performance (Core Web Vitals):** Optimize the initial load time. Move the Tailwind CDN script to a build-step (PostCSS) to reduce render-blocking resources and improve the LCP (Largest Contentful Paint) score.
10. **Localization URLs:** Since the app supports 3 languages, implement URL-based routing for languages (e.g., `/en/`, `/pt/`, `/es/`) and use `hreflang` tags so Google serves the correct language version to users based on their region.

---

## 3. How to Publish and Update the Site

The site is currently successfully deployed on **Vercel** and mapped to the custom domain **foxtecnologia.online/mycollect** and **mycollect-ten.vercel.app**.

### Pushing Updates to GitHub
To update your live site, you need to push your local code changes to your connected GitHub repository. Vercel will automatically detect the push and trigger a new deployment.

Run the following commands in your terminal at the root of your project:

```bash
# Initialize git if you haven't already
git init

# Add the remote repository (if not already added)
git remote add origin https://github.com/foxtecnologiaonline/mycollect.git

# Stage your changes
git add .

# Commit your changes
git commit -m "Update application features and translations"

# Push to the main branch
git push -u origin main
```

### Vercel Configuration Checklist
If setting up from scratch or verifying the connection:
1. Go to [Vercel](https://vercel.com) and import the `foxtecnologiaonline/mycollect` repository.
2. **Framework Preset:** Select `Other`.
3. **Build Command:** Leave empty (override default).
4. **Output Directory:** Leave empty or set to `.` (override default).
5. **Environment Variables:** Ensure `API_KEY` is added with your Google Gemini API key.

### Future Architecture Note:
To implement the security and SEO suggestions above, you will eventually need to migrate this codebase to a full-stack framework like **Next.js**. Once migrated, Vercel remains the best hosting option, as it natively supports Next.js serverless functions (to hide your API key) and Server-Side Rendering (for SEO).
