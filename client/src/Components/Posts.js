import React from 'react'
import Post from "./Post"

const Posts = ({ post, comments }) => {
    return (
        <div>
            {
                post.map((post, i) => (
                    <Post post={post} comments={comments} />
                ))
            }
        </div>
    )
}

export default Posts