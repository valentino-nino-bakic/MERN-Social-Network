import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/js/bootstrap.bundle.min';

import './custom.scss';
import App from './App';

import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';
import { CommentProvider } from './contexts/CommentContext';
import { LikeProvider } from './contexts/LikeContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AdminProvider } from './contexts/AdminContext';
import { ModalProvider } from './contexts/ModalContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <ThemeProvider>
            <ModalProvider>
                <AuthProvider>
                    <PostProvider>
                        <CommentProvider>
                            <LikeProvider>
                                <AdminProvider>
                                    <App />
                                </AdminProvider>
                            </LikeProvider>
                        </CommentProvider>
                    </PostProvider>
                </AuthProvider>
            </ModalProvider>
        </ThemeProvider>
    // </React.StrictMode>
);
