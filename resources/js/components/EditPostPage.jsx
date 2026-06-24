import React from 'react';

export default function EditPostPage({ post, csrfToken, errors = {} }) {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
                    <a href="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                        ← Back
                    </a>
                    <span className="text-gray-300">/</span>
                    <span className="text-sm font-semibold text-gray-800">Edit Post</span>
                </div>
            </header>

            <main className="max-w-lg mx-auto px-4 py-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <form
                        action={`/edit-post/${post.id}`}
                        method="POST"
                        encType="multipart/form-data"
                        className="space-y-3"
                    >
                        <input type="hidden" name="_token" value={csrfToken} />
                        <input type="hidden" name="_method" value="PUT" />

                        <div>
                            <input
                                name="title"
                                type="text"
                                defaultValue={post.title}
                                maxLength={100}
                                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
                                    errors.title
                                        ? 'border-red-400 focus:ring-red-400'
                                        : 'border-gray-200 focus:ring-indigo-400'
                                }`}
                            />
                            {errors.title && (
                                <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                            )}
                        </div>
                        <div>
                            <textarea
                                name="body"
                                rows={5}
                                defaultValue={post.body}
                                maxLength={2000}
                                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent resize-none ${
                                    errors.body
                                        ? 'border-red-400 focus:ring-red-400'
                                        : 'border-gray-200 focus:ring-indigo-400'
                                }`}
                            />
                            {errors.body && (
                                <p className="text-xs text-red-500 mt-1">{errors.body}</p>
                            )}
                        </div>

                        <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                name="is_private"
                                value="1"
                                defaultChecked={post.is_private}
                                className="rounded border-gray-300"
                            />
                            Private
                        </label>

                        {post.image && (
                            <div className="space-y-2">
                                <img
                                    src={post.image}
                                    alt=""
                                    className="rounded-lg max-w-[160px] max-h-[160px] object-cover"
                                />
                                <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        name="remove_image"
                                        value="1"
                                        className="rounded border-gray-300"
                                    />
                                    Remove image
                                </label>
                            </div>
                        )}

                        <div>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className={`text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-gray-100 file:text-gray-600 hover:file:bg-gray-200 ${
                                    errors.image ? 'border border-red-400 rounded' : ''
                                }`}
                            />
                            {errors.image && (
                                <p className="text-xs text-red-500 mt-1">{errors.image}</p>
                            )}
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Update Post
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
