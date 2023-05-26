import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import Card from "../components/Card";
import { useHistory, useLocation } from 'react-router-dom';
import LoadingSpinner from "../components/LoadingSpinner";
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import Toast from './Toast';
import useToast from '../hooks/toast';
import { useSelector } from 'react-redux';

const BlogList = ({ isAdmin }) => {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageParams = params.get('page');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPost, setNumberOfPost] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [searchText, setSearchText] = useState();
  const toasts1 = useSelector((state) => {
    return state.toast.toasts
  });
  console.log(toasts1);

  const [toasts, addToast, deleteToast] = useToast();
  const limit = 5;

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfPost/limit));
  }, [numberOfPost]);

  const onClickPageButton = (page) => {
    history.push(`${location.pathname}?page=${page}`)
    setCurrentPage(page);
    getPosts(page);
  }
  
  const getPosts = useCallback((page) => {
    let params = {
      _page: page,
      _limit: limit,
      _sort: "id",
      _order: "desc",
      title_like: searchText
    }

    if(!isAdmin) {
      params = { ...params, publish: true }
    }

    axios.get(`http://localhost:3001/posts`, {
      params: params
    })
      .then((response) => {
        setNumberOfPost(response.headers['x-total-count']);
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {console.log(error);})
  }, [isAdmin, searchText]);

  useEffect(() => {
    setCurrentPage(parseInt(pageParams) || 1);
    getPosts(parseInt(pageParams) || 1)
  }, []);

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${id}`)
      .then(() => {
        setPosts(prevState => prevState.filter(post => post.id !== id));
        addToast({
          text: 'Successfully',
          type: 'success'
        });
      })
      .catch(error => {console.log(error);})
  }

  if(loading) {
    return  (
      <LoadingSpinner />
    )
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

  const onSearch = (e) => {
    if(e.key === 'Enter') {
      history.push(`${location.pathname}?page=1`)
      setCurrentPage(1);
      getPosts(1);
    }
  }

  return (
    <div>
      <Toast
        toasts={toasts}
        deleteToast={deleteToast}
      />
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyUp={onSearch}
        placeholder='Search...'
        className='form-control'/>
      <hr/>
      {posts.length === 0
        ? <div>"No Blog Posts Found!!!"</div>
        :<>
          {renderBlogList()}
          {numberOfPages > 1 && <Pagination
            currentPage={currentPage}
            numberOfPage={numberOfPages}
            onClickEmit={onClickPageButton}
          />}
        </> }
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