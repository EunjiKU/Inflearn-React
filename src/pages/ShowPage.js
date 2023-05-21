import { useParams } from "react-router-dom";

const ShowPage = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>Show Page</div>
  )
}

export default ShowPage;