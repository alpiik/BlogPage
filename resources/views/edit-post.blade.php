<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Post</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body>
    @php
        $editProps = json_encode([
            'post' => [
                'id'         => $post->id,
                'title'      => old('title', $post->title),
                'body'       => old('body', $post->body),
                'image'      => $post->image ? asset('storage/' . $post->image) : null,
                'is_private' => (bool) $post->is_private,
            ],
            'csrfToken' => csrf_token(),
            'errors'    => [
                'title' => $errors->first('title'),
                'body'  => $errors->first('body'),
                'image' => $errors->first('image'),
            ],
        ], JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
    @endphp
    <script>
        window.__EDIT_PROPS__ = {!! $editProps !!};
    </script>
    <div id="app-edit"></div>
</body>
</html>
