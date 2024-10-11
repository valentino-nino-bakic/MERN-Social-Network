
import { useState } from 'react';
import Button from '../components/Button';

import useAuth from '../hooks/useAuth';


const CreatePost = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { picture } = useAuth();

    return (
        <div className="my-5 create-post">

            <div className="container d-flex bg-white align-items-center justify-content-center" style={{height: '100px'}}>
                <img
                    src={picture}
                    alt="User"
                    className="rounded-circle"
                    style={{ width: '50px' }}
                />
                <Button
                    className="btn btn-light w-100 text-start mb-3 p-2 text-muted"
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
                    <form className="w-100">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Title"
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                placeholder="What's on your mind?"
                                rows="3"
                            />
                        </div>
                        <Button type="submit" className="btn btn-primary w-100">
                            Post
                        </Button>
                    </form>
                </div>
            </div>

        </div>
    );
};



export default CreatePost;
