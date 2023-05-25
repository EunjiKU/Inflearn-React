import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';


const BlogForm = ({ editing }) => {
  const history = useHistory();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [originTitle, setOriginTitle] = useState('');
  const [body, setBody] = useState('');
  const [originBody, setOriginBody] = useState('');
  const [publish, setPublish] = useState(false);
  const [originPublish, setOriginPublish] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  useEffect(() => {
    if(editing) {
      axios.get(`http://localhost:3001/posts/${id}`)
        .then((response) => {
          setTitle(response.data.title);
          setOriginTitle(response.data.title);
          setBody(response.data.body);
          setOriginBody(response.data.body);
          setPublish(response.data.publish)
          setOriginPublish(response.data.publish)
        })
        .catch(error => console.log(error))
    }
  }, [id, editing]);

  const idEdited = () => {
    return title !== originTitle || body !== originBody || publish !== originPublish;
  }

  const goBack = () => {
    if(editing) {
      history.push(`/blogs/${id}`);
    } else {
      history.push("/blogs");
    }
    
  }

  const validateForm = () => {
    let validated = true;

    if(title === '') {
      setTitleError(true);
      validated = false;
    }

    if(body === '') {
      setBodyError(true);
      validated = false;
    }

    return validated;
  }

  const onSubmit = () => {
    setTitleError(false);
    setBodyError(false);
    if(validateForm()) {
      if(editing) {
        axios.patch(`http://localhost:3001/posts/${id}`, {
          title: title,
          body: body,
          publish: publish
        })
        .then((response) => {
            history.push(`/blogs/${id}`);
          })
          .catch(error => console.log(error));
      } else {
        axios.post("http://localhost:3001/posts", {
          title: title,
          body: body,
          createdAt: Date.now(),
          publish: publish
        })
          .then(() => {
            history.push("/admin");
          })
          .catch(error => console.log(error));
      }
    }
  }

  const onChangePublish = (e) => {
    console.log(e.target.checked);
    setPublish(e.target.checked)
  }

  return (
    <div>
      <h1>{editing ? 'Edit' : 'Create'} a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className={`form-control ${titleError ? 'border-danger' : ''}`}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {titleError && <div className='text-danger'>
          Title is required.
        </div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className={`form-control ${bodyError ? 'border-danger' : ''}`}
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        {bodyError && <div className='text-danger'>
          Body is required.
        </div>}
      </div>
      <div className='form-check mb-3'>
        <input
          className='form-check-input'
          type='checkbox'
          checked={publish}
          onChange={onChangePublish}
        />
        <label className='form-check-label'>Publish</label>
      </div>
      <button
        className='btn btn-primary'
        onClick={onSubmit}
        disabled={editing && !idEdited()}
      >{editing ? 'Edit' : 'Post'}</button>
      <button
        className='btn btn-danger ms-2'
        onClick={goBack}
      >Cancel</button>
    </div>
  )
}

BlogForm.propTypes  = {
  editing: PropTypes.bool
}
BlogForm.defaultProps   = {
  editing: false
}

export default BlogForm;