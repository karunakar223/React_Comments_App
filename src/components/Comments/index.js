import {Component} from 'react'

import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    nameInput: '',
    contentInput: '',
    commentsList: [],
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeContentInput = event => {
    this.setState({contentInput: event.target.value})
  }

  isCommentLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isLiked: !eachItem.isLiked}
        }
        return eachItem
      }),
    }))
  }

  onDeleteComment = id => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(eachComment => eachComment.id !== id),
    })
  }

  getCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        isCommentLiked={this.isCommentLiked}
        onDeleteComment={this.onDeleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, contentInput} = this.state
    const initialBackgroundColorClassNames = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: contentInput,
      date: new Date(),
      isLiked: false,
      ClassName: initialBackgroundColorClassNames,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      contentInput: '',
    }))
  }

  render() {
    const {commentsList, nameInput, contentInput} = this.state

    return (
      <>
        <div className="bg-container">
          <div className="card-container">
            <h1 className="main-heading">Comments</h1>
            <p className="description">Say something about 4.0 Technologies</p>
            <form className="form" onSubmit={this.onAddComment}>
              <input
                type="text"
                className="text"
                onChange={this.onChangeNameInput}
                placeholder="Your Name"
                value={nameInput}
              />
              <br />
              <textarea
                className="textarea"
                rows="8"
                cols="60"
                onChange={this.onChangeContentInput}
                placeholder="Your Comment"
                value={contentInput}
              />
              <br />
              <button type="submit" className="submit">
                Add Comment
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comment"
          />
        </div>
        <hr className="hr" />
        <div className="count-container">
          <p className="count">{commentsList.length}</p>
          <p className="length">Comments</p>
        </div>
        <ul className="ul-list">{this.getCommentsList()}</ul>
      </>
    )
  }
}

export default Comments
