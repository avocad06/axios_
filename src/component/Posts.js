function Posts({ resource }) {
    const posts = resource.posts.read();

    return (
        <div className="Posts">
            <p>{posts}</p>
        </div>
    );
}

export default Posts;