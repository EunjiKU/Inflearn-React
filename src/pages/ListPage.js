import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from "../components/Card";
import { Link, useHistory } from 'react-router-dom';
import LoadingSpinner from "../components/LoadingSpinner";
// import { useHistory } from 'react-router';

const ListPage = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = () => {
    axios.get("http://localhost:3001/posts")
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

  const renderBlogList = () => {
    // ☀️ loading이 true면... spinner!!!
    if(loading) {
      return  (
        <LoadingSpinner />
      )
    }
    // ☀️ posts가 0이면... 없음 문자!!!
    if(posts.length === 0) {
      return (<div>"No Blog Posts Found!!!";</div>);
    }
    // ☀️ 위에 상황이 아니면... list!!!
    return (
      posts.map((post) => {
        return (
          <Card
            key={post.id}
            title={post.title}
            onclickss={() => {history.push('/blogs/edit')}}
          >
            <div>
              <button
                className='btn btn-danger btn-sm'
                onClick={(e) => {deleteBlog(e, post.id)}}
              >Delete</button>
            </div>
          </Card>
        )
      })
    )
  }


  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h1>Blogs</h1>
        <div>
          <Link to="/blogs/create" className="btn btn-success">Create New</Link>
        </div>
      </div>
      {renderBlogList()}
    </div>
  )
}

export default ListPage;