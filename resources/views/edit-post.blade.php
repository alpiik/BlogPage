<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Edit Post</title>
</head>
<body>
    <h1>Edit Post</h1>
    <form action="/edit-post/{{ $post->id }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <input name="title" type="text" value="{{ $post->title }}">
        <textarea name="body">{{ $post->body }}</textarea>
            <label>
                <input type="checkbox" name="is_private" value="1" {{ $post->is_private ? 'checked' : '' }}>
                Private
            </label>
            @if ($post->image)
                <img src="{{ asset('storage/' . $post->image) }}" width="150">
                <label><input type="checkbox" name="remove_image" value="1"> Remove image</label>
            @endif
            <input type="file" name="image" accept="image/*">
        <button>Update</button>
    </form>
</body>
</html>