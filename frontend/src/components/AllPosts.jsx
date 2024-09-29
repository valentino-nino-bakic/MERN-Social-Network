

const AllPosts = ({ posts }) => {
    return (
        <ul>
            {posts.map(post => (
                <div className="container" key={post._id}>
                    <li>{post.title}</li>
                    <p>{post.content}</p>
                </div>
            ))}
        </ul>
    )
}

export default AllPosts;
