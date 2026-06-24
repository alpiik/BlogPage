<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    

    public function logout() {
            auth()->logout();
            return redirect('/');
    }

    public function login(Request $request) {
        $incomingFields = $request->validate([
            'loginname' => 'required',
            'loginpassword' => 'required'
        ]);

        $field = filter_var($incomingFields['loginname'], FILTER_VALIDATE_EMAIL) ? 'email' : 'name';

        $user = \App\Models\User::whereRaw("LOWER($field) = ?", [strtolower($incomingFields['loginname'])])->first();

        if ($user && \Illuminate\Support\Facades\Hash::check($incomingFields['loginpassword'], $user->password)) {
            auth()->login($user);
            $request->session()->regenerate();
        }

        return redirect('/')->with('message', 'Invalid credentials');
    }

    public function register(Request $request) {
        $incomingFields = $request->validate([
            'name' => ['required', 'min:3', 'max:255', Rule::unique('users', 'name')],
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'min:8', 'max:255'],
        ]);

        $incomingFields['password'] = bcrypt($incomingFields['password']);
        $user = User::create($incomingFields);
        auth()->login($user);
        return redirect('/');
    }
}
