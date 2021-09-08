import React from 'react'
import Comment from "./Comment"

const Comments = ({comments}) => {
    return (
        <div>
            {
            comments.map((comment, i) => (
                <Comment comment={comment}/>
            ))
            }

        </div>
      
    )
}

export default Comments