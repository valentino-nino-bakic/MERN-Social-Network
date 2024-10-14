import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';



const SearchResults = () => {
    const navigate = useNavigate();

    const { getUsersByUsername } = useAuth();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


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
        navigate(`/home/user/${username}`);
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
                    {results.map(user => (
                        <li key={user._id} className="my-4">
                            <img  className="rounded-circle" src={user.profileImageUrl} alt={user.username} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                            <button data-user-username={user.username} onClick={handleClick} className="btn btn-link">{user.username}</button>
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
