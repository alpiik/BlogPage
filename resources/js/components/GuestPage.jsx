import React from 'react';

function FormInput({ name, type = 'text', placeholder, defaultValue, error }) {
    return (
        <div>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue || ''}
                className={`w-full border rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent ${
                    error ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-indigo-400'
                }`}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}

// Prevents double-clicks/double-taps from firing the form twice while the
// page navigates away. Since these are normal full-page form posts (not
// AJAX), disabling the button is enough — no React state needed.
function preventDoubleSubmit(e) {
    const button = e.currentTarget.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
}

export default function GuestPage({ csrfToken, errors = {}, old = {} }) {
    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-4">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Blog page</h1>
                    <p className="text-sm text-gray-500 mt-1">Sign in or create an account to get started</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <h2 className="text-sm font-semibold text-gray-700 mb-4">Create an account</h2>
                    <form action="/register" method="POST" className="space-y-3" onSubmit={preventDoubleSubmit}>
                        <input type="hidden" name="_token" value={csrfToken} />
                        <FormInput name="name" placeholder="Name" defaultValue={old.name} error={errors.name} />
                        <FormInput name="email" placeholder="Email" defaultValue={old.email} error={errors.email} />
                        <FormInput name="password" type="password" placeholder="Password" error={errors.password} />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded-lg font-medium transition-colors"
                        >
                            Register
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <h2 className="text-sm font-semibold text-gray-700 mb-4">Sign in</h2>
                    <form action="/login" method="POST" className="space-y-3" onSubmit={preventDoubleSubmit}>
                        <input type="hidden" name="_token" value={csrfToken} />
                        <FormInput
                            name="loginname"
                            placeholder="Name or Email"
                            defaultValue={old.loginname}
                            error={errors.loginname}
                        />
                        <FormInput
                            name="loginpassword"
                            type="password"
                            placeholder="Password"
                            error={errors.loginpassword}
                        />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded-lg font-medium transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
