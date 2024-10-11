
import Button from '../components/Button';



const CreatePost = () => {
    return (
        <div className="card my-5">
            <div className="card-body">
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
    );
};



export default CreatePost;
