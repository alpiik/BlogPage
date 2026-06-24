<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Models\Post;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $posts = [];
    $allPosts = Post::with('user')->where('is_private', false)->latest()->get();

    if (auth()->check()) {
        $posts = auth()->user()->userposts()->with('user')->latest()->get();
        //$posts = Post::where('user_id', auth()->id())->get();
    }

    return view('home', ['posts' => $posts, 'allPosts' => $allPosts]);
})->name('login'); // guests see the login/register form on this same page

// Throttled to 6 attempts per minute per IP to slow down brute-force/credential-stuffing attempts.
Route::post('/register', [UserController::class, 'register'])->middleware('throttle:6,1');
Route::post('/login', [UserController::class, 'login'])->middleware('throttle:6,1');

// Routes below require an authenticated user. If the session is missing or
// expired, Laravel redirects to '/' instead of letting the request crash
// in the controller (which previously leaked a raw SQL error).
Route::middleware('auth')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);

    Route::get('/profile', [UserController::class, 'editProfile']);
    Route::post('/profile', [UserController::class, 'updateProfile']);

    Route::post('/create-post', [PostController::class, 'createPost']);
    Route::get('/edit-post/{post}', [PostController::class, 'editPost']);
    Route::put('/edit-post/{post}', [PostController::class, 'updatePost']);
    Route::delete('/delete-post/{post}', [PostController::class, 'deletePost']);
});