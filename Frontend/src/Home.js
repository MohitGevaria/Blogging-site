
import BlogList from "./BlogList";
import useFetch from "./UseFetch";

const Home = () => {
    
    const { data: blogs, isPending, error } = useFetch("https://blogging-site-mohit.herokuapp.com/blogs")
    

    

    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div className="loader"><h2>Loading....</h2></div>}
            {blogs.length === 0 ? (!isPending && <h2 className="loader">No Blogs found.</h2>) : (blogs && <BlogList blogs={blogs}/>)}
        </div>
    );
}
 
export default Home;