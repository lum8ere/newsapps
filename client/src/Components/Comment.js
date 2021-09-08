import React from 'react'

const commentStyle = {
  border: "2px solid black",
  margin: "3px"
}

const Comment = ({comment}) =>{
  return (
    <div style={commentStyle}>
      Name: {comment.name}<br/>
      Email: {comment.email}<br/>
      Text: {comment.body}


    </div>
  )
}

export default Comment