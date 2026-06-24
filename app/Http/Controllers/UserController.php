<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    

    public function logout(Request $request) {
            auth()->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return redirect('/');
    }

    public function login(Request $request) {
        $incomingFields = $request->validate([
            'loginname' => 'required',
            'loginpassword' => 'required'
        ], [
            'loginname.required' => 'Please enter your name or email.',
            'loginpassword.required' => 'Please enter your password.',
        ]);

        $field = filter_var($incomingFields['loginname'], FILTER_VALIDATE_EMAIL) ? 'email' : 'name';

        $user = \App\Models\User::whereRaw("LOWER($field) = ?", [strtolower($incomingFields['loginname'])])->first();

        if ($user && \Illuminate\Support\Facades\Hash::check($incomingFields['loginpassword'], $user->password)) {
            auth()->login($user);
            $request->session()->regenerate();
            return redirect('/');
        }

        return back()
            ->withErrors(['loginpassword' => 'Username or password is incorrect.'])
            ->withInput($request->only('loginname'));
    }

    public function register(Request $request) {
        $incomingFields = $request->validate([
            'name' => ['required', 'min:3', 'max:255', Rule::unique('users', 'name')],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')],
            'password' => ['required', 'min:8', 'max:255'],
        ]);

        $incomingFields['password'] = bcrypt($incomingFields['password']);

        try {
            $user = User::create($incomingFields);
        } catch (UniqueConstraintViolationException $e) {
            // Safety net for a race condition: two submits (e.g. a double-click)
            // can both pass the validation check above before either insert
            // completes, so the duplicate only shows up as a DB constraint error.
            $field = str_contains($e->getMessage(), 'email') ? 'email' : 'name';

            return back()
                ->withErrors([$field => 'That ' . $field . ' is already taken.'])
                ->withInput($request->except('password'));
        }

        auth()->login($user);
        $request->session()->regenerate();
        return redirect('/');
    }

    public function editProfile() {
        return view('profile', ['user' => auth()->user()]);
    }

    public function updateProfile(Request $request) {
        $user = auth()->user();

        // If a file was sent but PHP itself rejected/lost it (bad tmp dir,
        // disk full, permissions, etc.), the validation rule below fails
        // with a generic, misleading message. Catch that here and report
        // PHP's real reason instead.
        if ($request->hasFile('avatar') && !$request->file('avatar')->isValid()) {
            return back()
                ->withErrors(['avatar' => 'Upload failed (PHP error): ' . $request->file('avatar')->getErrorMessage()])
                ->withInput($request->only('name'));
        }

        $incomingFields = $request->validate([
            'name' => ['required', 'min:3', 'max:255', Rule::unique('users', 'name')->ignore($user->id)],
            // Laravel's "image" rule doesn't recognize AVIF (a format some
            // browsers/tools save under a .jpg name), so we list mime types
            // explicitly instead, with avif included.
            'avatar' => 'nullable|file|mimes:jpg,jpeg,png,bmp,gif,svg,webp,avif|max:4096',
            'current_password' => ['nullable', 'required_with:new_password'],
            'new_password' => ['nullable', 'min:8', 'max:255'],
        ], [
            'current_password.required_with' => 'Enter your current password to set a new one.',
            'avatar.mimes' => 'The avatar must be a jpg, png, gif, webp, or avif image.',
        ]);

        $user->name = strip_tags($incomingFields['name']);

        if ($request->hasFile('avatar')) {
            if ($user->avatar) {
                \Storage::disk('public')->delete($user->avatar);
            }
            $user->avatar = $request->file('avatar')->store('avatars', 'public');
        } elseif ($request->input('remove_avatar') === '1' && $user->avatar) {
            // No new file was uploaded, but the user asked to clear their
            // existing custom avatar and fall back to the shared default.
            \Storage::disk('public')->delete($user->avatar);
            $user->avatar = null;
        }

        if (!empty($incomingFields['new_password'])) {
            if (!\Illuminate\Support\Facades\Hash::check($incomingFields['current_password'], $user->password)) {
                return back()
                    ->withErrors(['current_password' => 'Current password is incorrect.'])
                    ->withInput($request->only('name'));
            }

            if (\Illuminate\Support\Facades\Hash::check($incomingFields['new_password'], $user->password)) {
                return back()
                    ->withErrors(['new_password' => 'New password must be different from your current password.'])
                    ->withInput($request->only('name'));
            }

            $user->password = bcrypt($incomingFields['new_password']);
        }

        $user->save();

        return redirect('/profile')->with('message', 'Profile updated.');
    }
}
