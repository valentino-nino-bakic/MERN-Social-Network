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

import Messages from './pages/Messages';
import Chat from './components/Chat';
import Friends from './pages/Friends';

import OtherUserProfile from './pages/OtherUserProfile';

import { SocketProvider } from './contexts/SocketContext';
import MyPosts from './components/MyPosts';

import Admin from './pages/admin/Admin';
import AllUsers from './components/admin/AllUsers';
import AdminPanelUserProfile from './pages/admin/AdminPanelUserProfile';
import AdminProfile from './pages/admin/AdminProfile';



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
                    <Route path="profile" element={<Profile />}>
                        <Route index element={<MyPosts />} />
                        <Route path="friends" element={<Friends />} />
                    </Route>
                    <Route path="user/:username" element={<OtherUserProfile />} />
                    <Route path="search-results" element={<SearchResults />} />
                    <Route path="messages" element={<Messages />}>
                        <Route path=":username" element={<Chat />} /> 
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>}>
                    <Route index element={<AllUsers />} />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="users/:id" element={<AdminPanelUserProfile />} /> 
                </Route>
            </Routes>
        </BrowserRouter>
    )
}



export default App;
