import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import useAuth from '../hooks/useAuth';



const SearchResults = () => {
    const navigate = useNavigate();

    const { getUsersByUsername, user } = useAuth();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const decodedUser = user ? jwtDecode(user) : null;



    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                setLoading(true);
                setError(null);
                try {
                    const data = await getUsersByUsername(query);
                    setResults(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
                setLoading(false);
            }
        };

        fetchData();
    }, [query, getUsersByUsername]);



    const handleClick = e => {
        const username = e.target.getAttribute('data-user-username');
        if (decodedUser && username === decodedUser.username) {
            navigate('/home/profile');
        } else {
            navigate(`/home/user/${username}`);
        }
    }



    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p className="text-danger">{error}</p>
    }

    return (
        <div className="container p-5 vh-100">
            <h1 className="mb-5">Search results for: {query}</h1>
            {results.length > 0 ? (
                <ul>
                    {results.map(result => (
                        <li key={result._id} className="my-4">
                            <img className="rounded-circle" src={result.profileImageUrl} alt={result.username} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                            <button data-user-username={result.username} onClick={handleClick} className="btn btn-link">{result.username}</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};




export default SearchResults;
