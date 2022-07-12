
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const EditBlog = () => {

    const { id } = useParams();
    const url = "http://localhost:8080/blogs/" + id;
    const {data:blog, isPending, error} = useFetch(url);
    const [ispending, setIsPending] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("Mohit Gevaria");
    
    const navigate = useNavigate();

    useEffect(() => {
        setTitle(blog.title);
        setAuthor(blog.author);
        setBody(blog.body);
    }, [blog])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author, id};
        setIsPending(true);

        fetch("http://localhost:8080/blogs", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        })
        .then(() => {
            setIsPending(false);
            navigate("/");
        })

    }

    return ( 
        
        <div className="create">
            {error && <div>{error}</div>}
            {
                !error && isPending && <div className="loader"><h2>Loading...</h2></div>
            }
            {   
                !error && !isPending &&
                <div>
                    <h2>Edit a Blog</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Blog title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                        <label >Body:</label>
                        <textarea name="" id="" cols="20" rows="10" value={body} onChange={(e) => setBody(e.target.value)} required ></textarea>
                        <label >Blog author:</label>
                        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                            <option value="Mohit Gevaria">Mohit Gevaria</option>
                            <option value="Malay Patel">Malay Patel</option>
                        </select>
                        { !ispending && <button>Add Blog</button>}
                        { ispending && <button disabled>Adding Blog...</button>}
                    </form>
                </div>
            }
        </div> 
    );
}
 
export default EditBlog;