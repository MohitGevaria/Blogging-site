import { useParams } from "react-router-dom";
import BlogList from "./BlogList";
import useFetch from "./UseFetch";

const CategoryBlogList = () => {
    const { id } = useParams();
    const url = "http://localhost:8080/blogs/category/" + id;
    const { data: blogs, isPending, error } = useFetch(url)
    

    

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div className="loader"><h2>Loading....</h2></div>}
            {blogs.length === 0 ? (!isPending && <h2 className="loader">No Blogs found.</h2>) : (blogs && <BlogList blogs={blogs}/>)}
        </div>
    );
}
 
export default CategoryBlogList;