<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>

    @auth
    <p>Welcome {{ auth()->user()->name }}</p>
    <form action="/logout" method="POST">
        @csrf
        <button>Logout</button>
    </form>

    <div style="border: 3px solid black;">
        <h2>Create Post</h2>
        <form action="/create-post" method="POST" enctype="multipart/form-data">
            @csrf
            <input name="title" type="text" placeholder="Title">
            <textarea name="body" placeholder="Body"></textarea>
                <label>
                    <input type="checkbox" name="is_private" value="1">
                    Private
                </label>
                <input type="file" name="image" accept="image/*">
            <button>Submit</button>
        </form>
        
    </div>

    <div style="border: 3px solid black;">
        <h2>Public posts</h2>
        @foreach ($allPosts as $post)
            <div style="background-color: lightgray; padding : 10px; margin: 10px;">
                <h3>{{ $post->title }} by {{ $post->user->name }}</h3>
                <p>{{ $post->body }}</p>
                @if ($post->image)
                    <img src="{{ asset('storage/' . $post->image) }}" style="max-width:150px; max-height:150px;">
                @endif
            </div>
        @endforeach
    </div>

    <div style="border: 3px solid black;">
        <h2>Your posts</h2>
        @foreach ($posts as $post)
            <div style="background-color: lightgray; padding : 10px; margin: 10px;">
                <h3>{{ $post->title }} by {{ $post->user->name }}</h3>
                <p>{{ $post->body }}</p>
                @if ($post->image)
                    <img src="{{ asset('storage/' . $post->image) }}" style="max-width:150px; max-height:150px;">
                @endif
                <p><a href="/edit-post/{{ $post->id }}">Edit</a></p>
                <form action="/delete-post/{{ $post->id }}" method="POST">
                    @csrf
                    @method('DELETE')
                    <button>Delete</button>
                </form>
            </div>
        @endforeach
    </div>
    
    @else
    <div style="border: 1px solid black;">
        <h2>Registration</h2>
        <form action="/register" method="POST">
            @csrf
            <input name="name" type="text" placeholder="Name">
            <input name="email" type="text" placeholder="Email">
            <input name="password" type="password" placeholder="Password">
            <button>Register</button>
        </form>
    </div>
    <div style="border: 1px solid black;">
        <h2>Login</h2>
        <form action="/login" method="POST">
            @csrf
            <input name="loginname" type="text" placeholder="Name or Email">
            <input name="loginpassword" type="password" placeholder="Password">
            <button>Login</button>
        </form>
    </div>     
    @endauth
</body>
</html>