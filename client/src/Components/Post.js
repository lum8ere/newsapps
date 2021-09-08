import React, { useState } from 'react';
import Modal from "./Modal";
import Comments from "./Comments";

const Post = ({ post, comments }) => {
    const [modalActive, setModalActive] = useState(false);
    const currentComments = comments.filter((c) => {
        return c.postId == post.id
    })

    const lastCommentId = currentComments.length - 1

    return (
        <div className="posts" id={post.id}>
            <div className="postgroup">
                <h4 className="open-btn" onClick={() => setModalActive(true)}>
                    {post.title}
                    <p>Колличество комментариев: {currentComments.length}</p>
                </h4>
                {
                    !(lastCommentId < 0) &&
                    <p>
                        <b>Последний комментарий:</b><br />
                        Name: {currentComments[lastCommentId].name}<br />
                        Email: {currentComments[lastCommentId].email}<br />
                        Text: {currentComments[lastCommentId].body}
                    </p>

                }

            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <p>
                    {post.title}
                    <hr />
                    {post.body}
                </p>
                <hr />
                <b>Комментарии:</b>
                <Comments comments={currentComments}></Comments>
            </Modal>
        </div>
    )
}

export default Post;