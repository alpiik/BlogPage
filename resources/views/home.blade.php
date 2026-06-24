<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Posts</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body>
    @auth
    @php
        $allPostsData = $allPosts->map(fn($p) => [
            'id'           => $p->id,
            'title'        => $p->title,
            'body'         => $p->body,
            'image'        => $p->image ? asset('storage/' . $p->image) : null,
            'author'       => $p->user->name,
            'authorAvatar' => $p->user->avatar_url,
            'postedAt'     => $p->created_at->diffForHumans(),
            'edited'       => $p->updated_at->gt($p->created_at->addSecond()),
        ]);
        $myPostsData = $posts->map(fn($p) => [
            'id'           => $p->id,
            'title'        => $p->title,
            'body'         => $p->body,
            'image'        => $p->image ? asset('storage/' . $p->image) : null,
            'author'       => $p->user->name,
            'authorAvatar' => $p->user->avatar_url,
            'is_private'   => (bool) $p->is_private,
            'postedAt'     => $p->created_at->diffForHumans(),
            'edited'       => $p->updated_at->gt($p->created_at->addSecond()),
        ]);
        $authProps = json_encode([
            'username'   => auth()->user()->name,
            'avatarUrl'  => auth()->user()->avatar_url,
            'allPosts'   => $allPostsData,
            'myPosts'    => $myPostsData,
            'csrfToken'  => csrf_token(),
            'errors'    => [
                'title' => $errors->first('title'),
                'body'  => $errors->first('body'),
                'image' => $errors->first('image'),
            ],
            'old' => [
                'title' => old('title', ''),
                'body'  => old('body', ''),
            ],
        ], JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
    @endphp
    <script>
        window.__AUTH_PROPS__ = {!! $authProps !!};
    </script>
    <div id="app-auth"></div>
    @else
    @php
        $guestProps = json_encode([
            'csrfToken' => csrf_token(),
            'errors'    => [
                'loginname'     => $errors->first('loginname'),
                'loginpassword' => $errors->first('loginpassword'),
                'name'          => $errors->first('name'),
                'email'         => $errors->first('email'),
                'password'      => $errors->first('password'),
            ],
            'old' => [
                'loginname' => old('loginname', ''),
                'name'      => old('name', ''),
                'email'     => old('email', ''),
            ],
        ], JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
    @endphp
    <script>
        window.__GUEST_PROPS__ = {!! $guestProps !!};
    </script>
    <div id="app-guest"></div>
    @endauth
</body>
</html>
