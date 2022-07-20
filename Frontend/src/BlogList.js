import { Link } from "react-router-dom";

const BlogList = ({blogs}) => {
    // const blogs = props.blogs;
    return ( 
        <div className="blog-list">
            {blogs.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <Link to={ `/blogs/${blog.id}` }>
                        <h2>{ blog.title }</h2>
                        <p>Written by { blog.author }</p>
                        {blog.metadata && <small>{blog.metadata.date_uploaded}</small>}
                    </Link>
                    
                </div>
            ))}
            {!blogs && <h2>No Blogs Found.</h2>}
        </div>
    );
}
 
export default BlogList;