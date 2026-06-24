<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller {

    public function deletePost(Post $post) {

        if (auth()->user()->id === $post->user_id) {
                $post->delete();
        }

        return redirect('/');
    }

    public function updatePost(Request $request, Post $post) {

        if (auth()->user()->id !== $post->user_id) {
                return redirect('/');
        }

        $incomingFields = $request->validate([
            'title' => 'required',
            'body' => 'required',
            'image' => 'nullable|image|max:4096'
        ]);

        $incomingFields['title'] = strip_tags($incomingFields['title']);
        $incomingFields['body'] = strip_tags($incomingFields['body']);
        $incomingFields['is_private'] = $request->boolean('is_private');

        if ($request->hasFile('image')) {
            if ($post->image) {
                \Storage::disk('public')->delete($post->image);
            }
            $incomingFields['image'] = $request->file('image')->store('post-images', 'public');
        } elseif ($request->boolean('remove_image') && $post->image) {
            \Storage::disk('public')->delete($post->image);
            $incomingFields['image'] = null;
        }

        $post->update($incomingFields);
        return redirect('/'); 
    }

    public function editPost(Post $post) {

        if (auth()->user()->id !== $post->user_id) {
            return redirect('/');
        }

        return view('edit-post', ['post' => $post]);
    }

    public function createPost(Request $request) {
        $incomingFields = $request->validate([
            'title' => 'required',
            'body' => 'required',
            'image' => 'nullable|image|max:4096'
        ]);

        $incomingFields['title'] = strip_tags($incomingFields['title']);
        $incomingFields['body'] = strip_tags($incomingFields['body']);
        $incomingFields['user_id'] = auth()->id();
        $incomingFields['is_private'] = $request->boolean('is_private');

        if ($request->hasFile('image')) {
            $incomingFields['image'] = $request->file('image')->store('post-images', 'public');
        }

        Post::create($incomingFields);
        return redirect('/'); // Redirect to the home page or another appropriate page
    }
}
