import React, { useState } from 'react';

function PostCard({ post, isOwner, csrfToken }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-3">
            <div className="flex items-start gap-3">
                <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-8 h-8 rounded-full object-cover border border-gray-200 mt-0.5 shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800 break-words">{post.title}</h3>
                        {post.is_private && (
                            <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-2.5 h-2.5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 1.5a4.5 4.5 0 0 0-4.5 4.5v3H6.75a2.25 2.25 0 0 0-2.25 2.25v8.25A2.25 2.25 0 0 0 6.75 21.75h10.5A2.25 2.25 0 0 0 19.5 19.5V11.25A2.25 2.25 0 0 0 17.25 9H16.5V6A4.5 4.5 0 0 0 12 1.5Zm3 7.5V6a3 3 0 1 0-6 0v3h6Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Private
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 mb-2">
                        by {post.author} · {post.postedAt}
                        {post.edited && <span className="italic"> · (edited)</span>}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed break-words whitespace-pre-wrap">{post.body}</p>
                    {post.image && (
                        <img
                            src={post.image}
                            alt=""
                            className="mt-3 rounded-lg w-full max-h-[420px] object-contain bg-gray-50"
                        />
                    )}
                    {isOwner && (
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                            <a
                                href={`/edit-post/${post.id}`}
                                className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                            >
                                Edit
                            </a>
                            <form action={`/delete-post/${post.id}`} method="POST">
                                <input type="hidden" name="_token" value={csrfToken} />
                                <input type="hidden" name="_method" value="DELETE" />
                                <button
                                    type="submit"
                                    className="text-xs font-medium text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function HomePage({ username, avatarUrl, allPosts, myPosts, csrfToken, errors = {}, old = {} }) {
    const [activeTab, setActiveTab] = useState('public');

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Posts</span>
                    <div className="flex items-center gap-3">
                        <a href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <img
                                src={avatarUrl}
                                alt={username}
                                className="w-7 h-7 rounded-full object-cover border border-gray-200"
                            />
                            <span className="text-sm text-gray-500">{username}</span>
                        </a>
                        <form action="/logout" method="POST">
                            <input type="hidden" name="_token" value={csrfToken} />
                            <button
                                type="submit"
                                className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                            >
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-6 space-y-8">
                {/* Create post */}
                <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <h2 className="text-sm font-semibold text-gray-700 mb-4">New Post</h2>
                    <form action="/create-post" method="POST" encType="multipart/form-data" className="space-y-3">
                        <input type="hidden" name="_token" value={csrfToken} />
                        <div>
                            <input
                                name="title"
                                type="text"
                                placeholder="Title"
                                defaultValue={old.title || ''}
                                maxLength={100}
                                className={`w-full border rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent ${
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
                                placeholder="What's on your mind?"
                                rows={3}
                                defaultValue={old.body || ''}
                                maxLength={2000}
                                className={`w-full border rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent resize-none ${
                                    errors.body
                                        ? 'border-red-400 focus:ring-red-400'
                                        : 'border-gray-200 focus:ring-indigo-400'
                                }`}
                            />
                            {errors.body && (
                                <p className="text-xs text-red-500 mt-1">{errors.body}</p>
                            )}
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-1.5 text-sm text-gray-500 cursor-pointer select-none">
                                    <input type="checkbox" name="is_private" value="1" className="rounded border-gray-300" />
                                    Private
                                </label>
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
                            </div>
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </section>

                {/* Public / Your posts toggle */}
                <section>
                    <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-4 w-fit">
                        <button
                            type="button"
                            onClick={() => setActiveTab('public')}
                            className={`text-sm px-4 py-1.5 rounded-md font-medium transition-colors ${
                                activeTab === 'public'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Public Posts
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('mine')}
                            className={`text-sm px-4 py-1.5 rounded-md font-medium transition-colors ${
                                activeTab === 'mine'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Your Posts
                        </button>
                    </div>

                    {activeTab === 'public' ? (
                        allPosts.length === 0 ? (
                            <p className="text-sm text-gray-400">No public posts yet.</p>
                        ) : (
                            allPosts.map((post) => (
                                <PostCard key={post.id} post={post} isOwner={false} csrfToken={csrfToken} />
                            ))
                        )
                    ) : myPosts.length === 0 ? (
                        <p className="text-sm text-gray-400">You haven't posted anything yet.</p>
                    ) : (
                        myPosts.map((post) => (
                            <PostCard key={post.id} post={post} isOwner={true} csrfToken={csrfToken} />
                        ))
                    )}
                </section>
            </main>
        </div>
    );
}
