import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const url = "http://localhost:8080/blogs/" + id;
    const {data:blog, isPending, error} = useFetch(url);

    const handleDelete = () => {
        fetch(url, {
            method: "DELETE"
        })
        .then(() => {
            navigate("/");
        })
    }

    const handleEdit = () => {
        navigate("/blogs/edit/" + blog.id);
    }

    return ( <div className="blog-details">
        { isPending && <div className="loader"> Loading... </div>}
        { error && <div className="error">{error}</div> }
        { blog &&
            <article>
                <h2>{blog.title}</h2>
                <p>Written by {blog.author}</p>
                <div>{blog.body}</div>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleEdit}>Edit</button>
            </article> 
        }
    </div>  );
}
 
export default BlogDetails;