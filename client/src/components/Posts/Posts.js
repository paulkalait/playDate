import React from 'react'
import Post from './Post/Post.js'
import { CircularProgress} from '@material-ui/core'
import { useSelector } from 'react-redux'
import './styles.css'

const Posts = ({ setCurrentId}) => {
      // get access to the global state in the reducers /posts.js file ..
  const { posts, isLoading }  = useSelector((state) =>  state.posts); // [] => { posts: []}
  if(!posts?.length && !isLoading) return 'No Posts'

  console.log({posts}) 
  return (
    <div className='postsContainer'>
    {isLoading ? <div className='circular-loading'><CircularProgress /> </div>: (
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