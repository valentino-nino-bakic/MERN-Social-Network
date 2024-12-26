import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import JoinUs from './pages/JoinUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

import Home from './pages/Home';
import HomeLayout from './components/HomeLayout';
import Profile from './pages/Profile';

import ProtectedRoute from './components/ProtectedRoute';

import SearchResults from './pages/SearchResults';

import Chat from './pages/Chat';
import Friends from './pages/Friends';

import OtherUserProfile from './pages/OtherUserProfile';

import { SocketProvider } from './contexts/SocketContext';




const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<JoinUs />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/home" element={<ProtectedRoute><SocketProvider><HomeLayout /></SocketProvider></ProtectedRoute>}>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="user/:username" element={<OtherUserProfile />} />
                    <Route path="search-results" element={<SearchResults />} />
                    <Route path="chat" element={<Chat />} />
                    <Route path="friends" element={<Friends />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}



export default App;
