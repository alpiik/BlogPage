<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Profile</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body>
    @php
        $profileProps = json_encode([
            'user' => [
                'name'      => old('name', $user->name),
                'email'     => $user->email,
                'avatarUrl' => $user->avatar_url,
            ],
            'csrfToken' => csrf_token(),
            'message'   => session('message'),
            'errors'    => [
                'name'             => $errors->first('name'),
                'avatar'           => $errors->first('avatar'),
                'current_password' => $errors->first('current_password'),
                'new_password'     => $errors->first('new_password'),
            ],
        ], JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
    @endphp
    <script>
        window.__PROFILE_PROPS__ = {!! $profileProps !!};
    </script>
    <div id="app-profile"></div>
</body>
</html>
