import React, { useState } from 'react';

export default function ProfilePage({ user, isGuest = false, csrfToken, message, errors = {} }) {
    const [preview, setPreview] = useState(user.avatarUrl);
    const [hasCustomAvatar, setHasCustomAvatar] = useState(user.hasCustomAvatar);
    const [removeAvatar, setRemoveAvatar] = useState(false);

    function handleAvatarChange(e) {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setRemoveAvatar(false);
        }
    }

    function handleRemoveAvatar() {
        setPreview('/images/default-avatar.svg');
        setHasCustomAvatar(false);
        setRemoveAvatar(true);
    }

    if (isGuest) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans">
                <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
                        <a href="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                            ← Back
                        </a>
                        <span className="text-gray-300">/</span>
                        <span className="text-sm font-semibold text-gray-800">Profile</span>
                    </div>
                </header>
                <main className="max-w-lg mx-auto px-4 py-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center gap-4">
                        <img
                            src={user.avatarUrl}
                            alt="Guest"
                            className="w-16 h-16 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                            <p className="font-semibold text-gray-800">Guest</p>
                            <p className="text-sm text-gray-400 mt-1">You're browsing as a guest.</p>
                        </div>
                        <a
                            href="/"
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                            Register for an account to post and customise your profile →
                        </a>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
                    <a href="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                        ← Back
                    </a>
                    <span className="text-gray-300">/</span>
                    <span className="text-sm font-semibold text-gray-800">Edit Profile</span>
                </div>
            </header>

            <main className="max-w-lg mx-auto px-4 py-6">
                {message && (
                    <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-2 mb-4">
                        {message}
                    </div>
                )}

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <form
                        action="/profile"
                        method="POST"
                        encType="multipart/form-data"
                        className="space-y-5"
                    >
                        <input type="hidden" name="_token" value={csrfToken} />
                        <input type="hidden" name="remove_avatar" value={removeAvatar ? '1' : '0'} />

                        {/* Avatar */}
                        <div className="flex items-center gap-4">
                            <img
                                src={preview}
                                alt="Profile picture"
                                className="w-16 h-16 rounded-full object-cover border border-gray-200"
                            />
                            <div>
                                <div className="flex items-center gap-3">
                                    <label className="text-xs font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer">
                                        Change picture
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            className="hidden"
                                        />
                                    </label>
                                    {hasCustomAvatar && (
                                        <button
                                            type="button"
                                            onClick={handleRemoveAvatar}
                                            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer"
                                        >
                                            Remove picture
                                        </button>
                                    )}
                                </div>
                                {errors.avatar && (
                                    <p className="text-xs text-red-500 mt-1">{errors.avatar}</p>
                                )}
                            </div>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                            <input
                                name="name"
                                type="text"
                                defaultValue={user.name}
                                maxLength={255}
                                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
                                    errors.name
                                        ? 'border-red-400 focus:ring-red-400'
                                        : 'border-gray-200 focus:ring-indigo-400'
                                }`}
                            />
                            {errors.name && (
                                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Email (read-only) */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                            <p className="text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                                {user.email}
                            </p>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Password change (optional) */}
                        <div className="space-y-3">
                            <p className="text-xs font-medium text-gray-500">
                                Change password
                            </p>
                            <div>
                                <input
                                    name="current_password"
                                    type="password"
                                    placeholder="Current password"
                                    className={`w-full border rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent ${
                                        errors.current_password
                                            ? 'border-red-400 focus:ring-red-400'
                                            : 'border-gray-200 focus:ring-indigo-400'
                                    }`}
                                />
                                {errors.current_password && (
                                    <p className="text-xs text-red-500 mt-1">{errors.current_password}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    name="new_password"
                                    type="password"
                                    placeholder="New password"
                                    className={`w-full border rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent ${
                                        errors.new_password
                                            ? 'border-red-400 focus:ring-red-400'
                                            : 'border-gray-200 focus:ring-indigo-400'
                                    }`}
                                />
                                {errors.new_password && (
                                    <p className="text-xs text-red-500 mt-1">{errors.new_password}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
