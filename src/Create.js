import { useState } from "react";
import { useNavigate } from "react-router-dom"

const Create = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState("Mohit Gevaria");
    const [ispending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author, id:Date.now()};
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
            <h2>Add a new Blog</h2>
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
        
    );
}
 
export default Create;