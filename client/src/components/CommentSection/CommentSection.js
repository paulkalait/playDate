import React, {useState, useRef} from "react";
import { useDispatch } from "react-redux";
import './styles.css'


const CommentSection = ({ post}) => {

    const [comments, setComments] = useState([1, 2 ,3, 4])
    const [comment, setComment] = useState('')

    const handleClick = () => {

    }

    console.log(post)
    return(
       <div>
        <div className="comments-container">
            <div className="comments-content">
                <h3>Comments</h3>
                {comments.map((c, i) => (
                    <h4 key={i}>Comment{i}</h4>
                ))}
            </div>

                {/* comments input */}
            <div className="write-comment-div">
                <h3>Write a comment</h3>
                <textarea placeholder="Write a comment" value={comment} onChange={(e) => setComment(e.target.value)}/>
                <button disabled={!comment} onClick={handleClick}>Add Comment</button>
            </div>
        </div>

       </div>
    )
}


export default CommentSection