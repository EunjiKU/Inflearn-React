import { useParams } from "react-router";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from "../components/LoadingSpinner";

const ShowPage = () => {
  const [post, setPost] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

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
        <h1 className="flex-grow-1">{post.title}</h1>
        <div>
          <Link
            className="btn btn-primary"
            to={`/blogs/${id}/edit`}
          >Edit</Link>
        </div>
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