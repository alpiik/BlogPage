# Laravel Blog App

A simple full-stack blog application built with Laravel 13. Users can register, log in, create posts with optional image uploads, mark posts as private, and edit or delete their own posts. Public posts are visible to all visitors.

## Features

- User registration and login (by username or email)
- Create, edit, and delete posts
- Upload images with posts (up to 4MB)
- Mark posts as private (only visible to you)
- Public feed visible to all visitors

## Requirements

- PHP 8.3+
- Composer
- Node.js & npm
- SQLite (default, no setup needed) **or** MySQL 8+

## Setup

**1. Clone the repo and install dependencies:**

```bash
git clone <repo-url>
cd <repo-folder>
composer setup
```

This single command installs PHP and JS dependencies, copies `.env.example` to `.env`, generates an app key, runs migrations, and builds frontend assets.

**2. Create the storage symlink** (so uploaded images are publicly served):

```bash
php artisan storage:link
```

**3. Start the development server:**

```bash
composer dev
```

Visit `http://localhost:8000`.

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
    UserController.php   — register, login, logout
  Models/
    Post.php
    User.php
resources/views/
  home.blade.php         — main feed + create post form
  edit-post.blade.php    — edit post form
database/migrations/     — all table definitions
storage/app/public/post-images/  — uploaded images (excluded from repo)
```
