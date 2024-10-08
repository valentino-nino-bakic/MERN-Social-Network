import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import JoinUs from './pages/JoinUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

import Home from './pages/Home';
import HomeLayout from './components/HomeLayout';

import ProtectedRoute from './components/ProtectedRoute';


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
                <Route path="/home" element={<ProtectedRoute><HomeLayout /></ProtectedRoute>}>
                    <Route index element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
