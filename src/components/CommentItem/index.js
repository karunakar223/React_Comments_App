// Write your code here

import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails, isCommentLiked, onDeleteComment} = props
  const {id, name, comment, isLiked, ClassName, date} = commentDetails
  const firstLetter = name ? name[0].toUpperCase() : ''
  const btnClassName = isLiked ? 'btn active' : 'btn'
  const getLikeImg = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const commentCreatedTime = formatDistanceToNow(date)

  const onClickLikeBtn = () => {
    isCommentLiked(id)
  }

  const onClickDeleteBtn = () => {
    onDeleteComment(id)
  }

  return (
    <li className="li-con">
      <div className="main-container">
        <div className={ClassName}>
          <p className="letter">{firstLetter}</p>
        </div>
        <div>
          <div className="comment-details-container">
            <p className="name">{name}</p>
            <p className="time">{commentCreatedTime}</p>
          </div>
          <p className="content">{comment}</p>
        </div>
      </div>
      <div className="like-container">
        <div className="btn-con">
          <img src={getLikeImg} alt="like" className="like-img" />
          <button
            className={btnClassName}
            type="button"
            onClick={onClickLikeBtn}
          >
            Like
          </button>
        </div>
        <button
          className="button"
          type="button"
          onClick={onClickDeleteBtn}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
