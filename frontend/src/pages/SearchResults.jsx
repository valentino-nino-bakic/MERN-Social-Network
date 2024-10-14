import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import useAuth from '../hooks/useAuth';



const SearchResults = () => {
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
                            <img src={user.profileImageUrl} alt={user.username} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                            <span>{user.username}</span>
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
