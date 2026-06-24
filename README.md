# BlogPage

A full-stack blog platform built with Laravel 13 and React (via Vite). Users can register, log in, create posts with optional image uploads, mark posts as private, and customize their profile with a picture and display name. Public posts are visible to all visitors; private posts stay visible only to their author.

## Features

- User registration and login (by username or email), with brute-force throttling and session regeneration on login/logout
- Create, edit, and delete your own posts
- Upload images with posts (up to 4MB); a post needs either a body or an image
- Mark posts as public or private, with a visual "Private" badge on your own feed
- Public feed and "Your Posts" shown as a tab toggle on the same page
- Relative post timestamps (e.g. "3 hours ago") and an "(edited)" indicator for posts updated after creation
- Profile picture upload (defaults to a shared placeholder avatar for every new user) and editable display name
- Optional password change from the profile page, gated behind current-password verification, with a check that the new password differs from the old one
- Full client- and server-side form validation: empty/invalid fields get a red outline and an inline error message, and previously entered values are preserved on failed submits

## Requirements

- PHP 8.3+
- Composer
- Node.js & npm
- MySQL 8+ (or SQLite for quick local testing)

## Setup

**1. Clone the repo and install dependencies:**

```bash
git clone <repo-url>
cd <repo-folder>
composer setup
```

This single command installs PHP and JS dependencies, copies `.env.example` to `.env`, generates an app key, runs migrations, and builds frontend assets.

**2. Create the storage symlink** (so uploaded avatars and post images are publicly served):

```bash
php artisan storage:link
```

**3. Start the development server:**

```bash
composer dev
```

This runs the PHP server, queue listener, log viewer, and Vite dev server together. Visit `http://localhost:8000`.

---

### Using MySQL instead of SQLite

Edit `.env` before running `composer setup` and set:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Create the database in MySQL first:

```sql
CREATE DATABASE your_database_name;
```

Then run the setup as normal.

## Project Structure

```
app/
  Http/Controllers/
    PostController.php   — create, edit, delete posts + image handling
    UserController.php   — register, login, logout, profile editing
  Models/
    Post.php
    User.php              — includes avatarUrl accessor with default fallback
resources/
  js/components/
    HomePage.jsx          — feed, tab toggle, post cards
    GuestPage.jsx         — login/register forms
    EditPostPage.jsx       — edit post form
    ProfilePage.jsx        — edit profile (avatar, name, password)
  views/
    home.blade.php         — main feed + create post form
    edit-post.blade.php    — edit post page shell
    profile.blade.php      — edit profile page shell
database/migrations/        — all table definitions
public/images/
  default-avatar.svg        — shared default profile picture
storage/app/public/
  post-images/               — uploaded post images (excluded from repo)
  avatars/                    — uploaded profile pictures (excluded from repo)
```

## Security notes

- Routes that create/edit/delete content or touch the authenticated user's profile require the `auth` middleware.
- `/login` and `/register` are rate-limited to 6 attempts per minute per IP.
- Passwords are hashed with bcrypt; sessions are regenerated on login/registration and invalidated on logout.
- User-submitted text is stripped of HTML tags server-side, and all post/profile content is rendered through React, which escapes output by default.
