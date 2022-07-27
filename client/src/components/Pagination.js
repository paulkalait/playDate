import React, {useEffect} from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/posts'


const Paginate = ({ page}) => {
  const { numberOfPages } = useSelector((state) => state.posts)
  const dispatch = useDispatch();


  useEffect(() => {
    //fetch post anytime page changes 
  
    if(page){
      dispatch(getPosts(page))
    }
  }, [page, dispatch])
  return (
    <Pagination 

    count={numberOfPages}
    page={Number(page) || 1}
    variant="outlined"
    color='primary'
    renderItem={(item) =>  (
        //spread the item inside PagItem
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
    )}
    />
  )
}

export default Paginate