import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from "../components/Card";
import { Link, useHistory } from 'react-router-dom';
import LoadingSpinner from "../components/LoadingSpinner";
import PropTypes from 'prop-types';
import Pagination from './Pagination';

const BlogList = ({ isAdmin }) => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = (page = 1) => {
    let params = {
      _page: page,
      _limit: 5,
      _sort: "id",
      _order: "desc",
      // publish: true,
    }

    if(!isAdmin) {
      params = { ...params, publish: true }
    }

    axios.get(`http://localhost:3001/posts`, {
      params: params
    })
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {console.log(error);})
  }

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${id}`)
      .then(() => {
        setPosts(prevState => prevState.filter(post => post.id !== id))
      })
      .catch(error => {console.log(error);})
  }

  useEffect(() => {
    getPosts();
  }, []);

  if(loading) {
    return  (
      <LoadingSpinner />
    )
  }
  if(posts.length === 0) {
    return (<div>"No Blog Posts Found!!!";</div>);
  }

  const renderBlogList = () => {
    return posts.map((post) => {
      return (
        <Card
          key={post.id}
          title={post.title}
          onclickss={() => {history.push(`/blogs/${post.id}`)}}
        >
          {isAdmin ? <div>
            <button
              className='btn btn-danger btn-sm'
              onClick={(e) => {deleteBlog(e, post.id)}}
            >Delete</button>
          </div> : null}
        </Card>
      )
    })
  }

  return (
    <div>
      {renderBlogList()}
      <Pagination currentPage={3} numberOfPage={5} />
    </div>
  )
}

BlogList.propTypes = {
  isAdmin: PropTypes.bool,
}

BlogList.defaultProps = {
  isAdmin: false
}

export default BlogList;