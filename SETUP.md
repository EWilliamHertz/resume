# Resume Website Setup Guide

## Overview
This is a modern, full-featured resume/portfolio website built with Next.js 16, featuring:
- 🎨 Responsive design with mobile hamburger nav
- 📝 Blog system with database backend
- 🎵 Music player for streaming your tracks
- 📚 Book information with multi-store links
- 🎯 Project portfolio with live demos
- ✨ 3D scroll animations
- 🔐 Admin panel for content management

## Prerequisites
- Node.js 18+ and npm
- NeonDB PostgreSQL database (free tier available)
- Vercel account (for deployment, optional)

## Installation Steps

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/resume.git
cd resume
npm install
```

### 2. Database Setup

#### Get your NeonDB connection string:
1. Go to https://console.neon.tech
2. Create a new project or use existing
3. Copy your connection string (looks like: `postgresql://user:password@host/database`)

#### Create .env.local file:
```bash
cp .env.example .env.local
```

Then edit `.env.local` and add:
```
DATABASE_URL="your-neondb-connection-string"
ADMIN_KEY="create-a-strong-secret-key"
```

#### Initialize database:
```bash
npx prisma migrate dev --name init
```

This will:
- Create database tables for blog posts, music, and bookstores
- Generate Prisma client

### 3. Development Server
```bash
npm run dev
```
Visit http://localhost:3000

### 4. Configure Your Content

#### Add Blog Posts:
1. Visit http://localhost:3000/admin
2. Use the admin panel to create posts
3. Check "Publish immediately" to make visible on homepage

#### Add Music:
1. Place your MP3 files in `/public/music/`
2. Update `/app/music/page.tsx` with your track information
3. Add your Spotify artist URL

#### Update Book Information:
- Edit `/app/book/page.tsx` to match your book details
- Bookstore links are pre-configured (18 platforms)

#### Update Projects:
- Edit `/data/projects.ts` with your project information
- Add project screenshots to `/public/images/projects/`

### 5. Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| DATABASE_URL | PostgreSQL connection | ✅ Yes |
| ADMIN_KEY | Admin panel security | ✅ Yes |
| NEXT_PUBLIC_SPOTIFY_ARTIST_ID | Spotify artist ID | ❌ No |

## API Routes

### Blog Posts
- **GET** `/api/blog` - Fetch all published posts
- **POST** `/api/blog` - Create new post (requires admin key)

### Database Schema
```prisma
model BlogPost {
  id        String     @id @default(cuid())
  title     String
  content   String     @db.Text
  excerpt   String?
  published Boolean    @default(false)
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables in project settings
5. Deploy!

### Other Platforms
Works with any Node.js hosting:
- Netlify
- Railway
- Render
- AWS Amplify

## Navigation Structure

```
/ (Home)
├── Blog feed
├── CTA to projects, music, book

/projects
├── Project showcase grid
├── Live demo & GitHub links

/music
├── Spotify integration
├── Music player component
├── MP3 player

/book
├── Book information
├── 18+ bookstore links (expandable)
├── Author bio

/admin
├── Blog post creation
├── Post management

/about
/contact
/hire
/visions
```

## Customization

### Change Colors
Edit Tailwind classes in component files:
- Primary: `cyan-400` → change to your color
- Secondary: `green-400`, `purple-400`, etc.

### Update Navbar
Edit `/components/Navbar.tsx`:
- Change nav items
- Adjust styling

### Add Sections
1. Create page in `/app/your-section/page.tsx`
2. Add to Navbar navItems array
3. Create components as needed

### 3D Animations
The scroll animations are in `/components/ScrollAnimation.tsx`:
- Uses Canvas API with particle system
- Customize particle count, colors, and behavior

## Troubleshooting

### Database Connection Error
- Check DATABASE_URL is correct
- Verify NeonDB project is active
- Run `npx prisma db push` to sync schema

### Blog Posts Not Loading
- Ensure posts are marked as "published"
- Check ADMIN_KEY matches in requests
- Verify database migration completed

### Images Not Showing
- Add images to `/public/images/`
- Use correct relative paths in code
- Clear `.next` build cache if needed

## Support

For issues:
1. Check error messages in browser console
2. Review server logs: `npm run dev` output
3. Check Prisma documentation: https://www.prisma.io/docs/
4. NeonDB docs: https://neon.tech/docs/

## License
MIT - Feel free to use as template
