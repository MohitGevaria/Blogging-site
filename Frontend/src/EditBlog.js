
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./UseFetch";
import SelectDrop from "./SelectDrop";

const EditBlog = () => {

    const { id } = useParams();
    const url = "http://localhost:8080/blogs/" + id;
    const {data:blog, isPending, error} = useFetch(url);
    const [ispending, setIsPending] = useState(false);
    const [title, setTitle] = useState("");
    const [blogId, setBlogId] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("Mohit Gevaria");
    const [category, setCategory] = useState([]);
    const [description, setDescription] = useState("");
    const { data:categories, isCatPending } = useFetch("http://localhost:8080/categories/");
    const {data: publishers } = useFetch("http://localhost:8080/publishers/");
    let selectedPublishers = [];
    
    const navigate = useNavigate();

    useEffect(() => {
        setTitle(blog.title);
        setAuthor(blog.author);
        setBody(blog.body);
        setBlogId(blog.id);
    }, [blog])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const categ = categories.filter((each) => category.includes(each.title));
        const metadata = {name : title, description: description}
        const blog = {title, body, author, categories: categ, metadata, publisher: selectedPublishers, id:blogId};
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

    const handleChange = (value) => {
        publishers.forEach((each) => delete (each.blog));
        selectedPublishers = publishers.filter(({user_name}) => value.includes(user_name));
    };

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
                        <label>Descritption:</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                        <label>Categories:</label>
                        {isCatPending && <div className="loader"><h2>Loading....</h2></div>}
                        { categories && 
                            <select name="selection" value={category} multiple onChange={(e) => setCategory([e.target.value, ...category])}>
                                {
                                    categories.map((category) => (
                                        <option value={category.title} key={categories.id}>{category.title}</option>
                                    ))
                                    
                                }
                            </select>
                        }
                        <label>Publishers:</label>
                        <SelectDrop handleChange={handleChange} publishers={publishers}></SelectDrop>
                        { !ispending && <button>Add Blog</button>}
                        { ispending && <button disabled>Adding Blog...</button>}
                    </form>
                </div>
            }
        </div> 
    );
}
 
export default EditBlog;