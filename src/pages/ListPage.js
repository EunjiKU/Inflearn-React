import BlogList from '../components/BlogList';

const AdminPage = () => {
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h1>Blog</h1>
      </div>
      <BlogList />
    </div>
  )
}

export default AdminPage;