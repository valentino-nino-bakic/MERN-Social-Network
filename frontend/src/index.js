import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './style.css';
import App from './App';

import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';
import { CommentProvider } from './contexts/CommentContext';
import { LikeProvider } from './contexts/LikeContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SocketProvider } from './contexts/SocketContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <SocketProvider>
                <AuthProvider>
                    <PostProvider>
                        <CommentProvider>
                            <LikeProvider>
                                <App />
                            </LikeProvider>
                        </CommentProvider>
                    </PostProvider>
                </AuthProvider>
            </SocketProvider>
        </ThemeProvider>
    </React.StrictMode>
);
