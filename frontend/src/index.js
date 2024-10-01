import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './style.css';
import App from './App';

import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
        <PostProvider>
            <App />
        </PostProvider>
        </AuthProvider>
    </React.StrictMode>
);
