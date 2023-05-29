import { useParams } from "react-router";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from "../components/LoadingSpinner";
import { useSelector } from 'react-redux';

const ShowPage = () => {
  const [post, setPost] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const getPosts = (id) => {
    axios.get(`http://localhost:3001/posts/${id}`)
      .then((response) => {
        console.log(response.data);
        setPost(response.data)
        setLoading(false);
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("쇼페이지 setInterval");
      setTimer(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    console.log('hello');
    getPosts(id);
  }, [id])

  const printData = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  }

  if(loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className="d-flex">
        <h1 className="flex-grow-1">{post.title} ({timer}초)</h1>
        {isLoggedIn && <div>
          <Link
            className="btn btn-primary"
            to={`/blogs/${id}/edit`}
          >Edit</Link>
        </div>}
      </div>
      <small className="text-muted">
        Created At : {printData(post.createdAt)}
      </small>
      <hr />
      <p>{post.body}</p>
    </div>
  )
}

export default ShowPage;