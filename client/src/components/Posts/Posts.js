import React from 'react'
import Post from './Post/Post.js'
import { useSelector } from 'react-redux'
import './styles.css'

const Posts = () => {
      // get access to the global state in the reducers /posts.js file ..
  const posts = useSelector((state) =>  state.posts)

  console.log(posts)
  return (
    <div className='postsContainer'>
    <h1>Posts</h1>
    <Post />
    </div>

  )
}

export default Posts