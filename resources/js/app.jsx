import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './components/HomePage';
import GuestPage from './components/GuestPage';
import EditPostPage from './components/EditPostPage';
import ProfilePage from './components/ProfilePage';

const authRoot = document.getElementById('app-auth');
if (authRoot) {
    ReactDOM.createRoot(authRoot).render(
        <React.StrictMode>
            <HomePage {...window.__AUTH_PROPS__} />
        </React.StrictMode>
    );
}

const guestRoot = document.getElementById('app-guest');
if (guestRoot) {
    ReactDOM.createRoot(guestRoot).render(
        <React.StrictMode>
            <GuestPage {...window.__GUEST_PROPS__} />
        </React.StrictMode>
    );
}

const editRoot = document.getElementById('app-edit');
if (editRoot) {
    ReactDOM.createRoot(editRoot).render(
        <React.StrictMode>
            <EditPostPage {...window.__EDIT_PROPS__} />
        </React.StrictMode>
    );
}

const profileRoot = document.getElementById('app-profile');
if (profileRoot) {
    ReactDOM.createRoot(profileRoot).render(
        <React.StrictMode>
            <ProfilePage {...window.__PROFILE_PROPS__} />
        </React.StrictMode>
    );
}
