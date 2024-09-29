

const AllPosts = ({ posts }) => {
    return (
        <ul>
            {posts.map(post => (
                <div className="container">
                    <li key={post._id}>{post.title}</li>
                    <p>{post.content}</p>
                </div>
            ))}
        </ul>
    )
}

export default AllPosts;
