import React from 'react'
import Post from './Post/Post.js'
import { CircularProgress} from '@material-ui/core'
import { useSelector } from 'react-redux'
import './styles.css'

const Posts = ({ setCurrentId}) => {
      // get access to the global state in the reducers /posts.js file ..
  const posts = useSelector((state) =>  state.posts);

  console.log(posts)
  return (
    <div className='postsContainer'>
    {!posts.length ? <CircularProgress /> : (
        <div className='posts-body'>
        { 
          posts.map((post) => (
            <div key={post._id} className="each-post">
              <Post post={post} setCurrentId={setCurrentId} />
            </div>
          ))
        }
        </div>
    )}
   
    </div>

  )
}

export default Posts