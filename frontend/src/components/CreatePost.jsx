import { jwtDecode } from 'jwt-decode';

import { useState } from 'react';
import Button from '../components/Button';

import useAuth from '../hooks/useAuth';
import usePost from '../hooks/usePost';



const CreatePost = () => {
    const { user, picture } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    const { createNewPost, loading, error } = usePost();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');



    const handleSubmit = async e => {
        e.preventDefault();
        const formData = {
            title: title,
            content: content,
            author: jwtDecode(user).id
        }
        if (title.trim() === '' || content.trim() === '') {
            alert('Both fields are required');
            return;
        }
        await createNewPost(user, formData);
        setTitle('');
        setContent('');
        setIsOpen(false);
    }



    return (
        <div className="my-5 create-post">

            <div className="container d-flex bg-white align-items-center justify-content-center rounded" style={{ height: '100px' }}>
                <img
                    src={picture}
                    alt="User"
                    className="rounded-circle"
                    style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                />
                <Button
                    className="btn btn-light rounded-pill w-100 text-start mb-3 mx-3 p-2 text-muted"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-controls="collapseCreatePost"
                >
                    What's on your mind?
                </Button>
            </div>

            <div className={`collapse ${isOpen ? 'show' : ''}`} id="collapseCreatePost">
                <div className="card card-body">
                    <h5 className="card-title mb-4">Create a Post</h5>
                    <form onSubmit={handleSubmit} className="w-100">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                placeholder="What's on your mind?"
                                rows="3"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? 'Posting...' : 'Post'}
                        </Button>
                        {error && <p className="text-danger mt-2">{error}</p>}
                    </form>
                </div>
            </div>

        </div>
    );
};



export default CreatePost;
