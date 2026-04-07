# Maison Éditorial — Premium Full Stack Blogging Platform

A production-style MERN blogging platform designed with a luxury editorial aesthetic, role-based author workflows, category-led discovery, and polished reading experiences.

## Stage 1: Product Planning

### Product vision
Maison Éditorial is a multi-role publishing platform where admins/authors can craft, curate, and publish high-quality articles while readers enjoy category-based discovery and immersive reading.

### User roles
- **Admin**
  - Full content governance
  - Manage posts, categories, and comment approvals
  - Access dashboard analytics
- **Author**
  - Create/edit own posts
  - Save drafts and publish
  - Organize posts under categories
- **Reader**
  - Browse by categories
  - Explore featured/latest/trending-style sections
  - Read full articles and post comments

### Why categories matter
- Create editorial sections (Culture, Tech, Design, Business, etc.)
- Improve navigation and filtering
- Enable thematic recommendation (related posts by category)
- Support scalable information architecture for growth

### Major features
- JWT authentication for admin/author
- Rich post lifecycle: draft → published
- Category management
- SEO-friendly slugs
- Read time calculation
- Search across title/excerpt/content
- Related posts module
- Comment workflow (submit + approval)
- Dashboard metrics and post management table
- Premium responsive UI

---

## Stage 2: UI/UX Planning (Premium Editorial)

### Design language
- **Typography**: serif for narrative impact, sans-serif for legibility
- **Palette**: ivory, beige, charcoal, muted gray, soft gold accents
- **Layout**: spacious margins, large hero zones, clear visual hierarchy
- **Cards**: minimal surfaces with elegant hover elevation
- **Motion**: subtle transitions for links/cards/buttons
- **Responsiveness**: mobile-first scaling to tablet/desktop

### Core pages
1. **Home**
   - Sticky navbar
   - Hero featured article
   - Featured categories
   - Latest article grid
   - Newsletter CTA
   - Elegant footer

2. **Category page**
   - Banner and category context
   - Post grid for selected category
   - Supports category-based filtering and future sorting

3. **Single blog page**
   - Category tag, premium title, excerpt, meta (author/date/read-time)
   - Hero image
   - Long-form content area
   - Related posts

4. **Admin dashboard**
   - Sidebar
   - Stats cards
   - Recent posts table
   - Management workflow entry points

5. **Create/Edit post**
   - Structured editor form
   - Category and metadata fields
   - Draft and publish actions

---

## Stage 3: Database + Backend Architecture

### Schemas
- **User**: `name`, `email`, `password`, `role`, `avatar`, timestamps
- **Category**: `name`, `slug`, `description`, `coverImage`, timestamps
- **Post**:
  - `title`, `slug`, `excerpt`, `content`, `coverImage`
  - `categoryId`, `authorId`
  - `status` (`draft|published`), `readTime`, `publishedAt`, `tags`, timestamps
- **Comment (optional/implemented)**:
  - `postId`, `name`, `email`, `content`, `approved`, timestamps

### REST API design
- **Auth**
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/auth/me`
- **Categories**
  - `GET /api/categories`
  - `POST /api/categories`
  - `PUT /api/categories/:id`
  - `DELETE /api/categories/:id`
- **Posts**
  - `GET /api/posts?status=&category=&q=&sort=`
  - `GET /api/posts/:slug`
  - `POST /api/posts`
  - `PUT /api/posts/:id`
  - `DELETE /api/posts/:id`
- **Comments**
  - `GET /api/comments/post/:postId`
  - `POST /api/comments/post/:postId`
  - `PATCH /api/comments/:id/approve`

---

## Stage 4: Folder Structure

```txt
backend/
  src/
    app.js
    server.js
    config/db.js
    controllers/
    middleware/
    models/
    routes/
    utils/

frontend/
  src/
    api/client.js
    components/
      common/
      blog/
      admin/
      home/
    context/AuthContext.jsx
    pages/
    styles/index.css
    App.jsx
    main.jsx
```

---

## Stage 5: Build Order

1. Backend app bootstrap + environment config
2. MongoDB connection + base middleware
3. Mongoose models
4. Authentication + role middleware
5. Category/Post/Comment controllers and routes
6. Frontend setup (Vite + Tailwind)
7. Core layout components (navbar/footer/cards/loader)
8. Public pages (home/category/post)
9. Admin pages (login/dashboard/editor)
10. API integration with Axios + token flow
11. UX polish (hover, spacing, premium color and typography)

---

## Stage 6: Code Generation Status

Implemented in modular sections:
- Backend setup and DB config
- Models for users/categories/posts/comments
- Auth + role middleware
- RESTful controllers/routes
- Frontend React+Tailwind setup
- Reusable components and premium styling tokens
- Public and admin pages
- API integration + JWT token wiring

---

## Run Instructions

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL=http://localhost:5000/api` in `frontend/.env` if needed.
