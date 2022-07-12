
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
    
    const { data: blogs, isPending, error } = useFetch("http://localhost:8080/blogs")
    

    

    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div className="loader"><h2>Loading....</h2></div>}
            {blogs && <BlogList blogs={blogs}/>}
        </div>
    );
}
 
export default Home;