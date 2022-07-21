import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./UseFetch";
import { Link } from "react-router-dom";

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const blogUrl = "https://blogging-site-mohit.herokuapp.com/blogs/" + id;
    const commentUrl = "https://blogging-site-mohit.herokuapp.com/blogs/" + id + "/comments";
    const {data:blog, isPending, error} = useFetch(blogUrl);
    const {data:comments} = useFetch(commentUrl);
    const [showComments, setShowComments] = useState(false);
    const [commenter, setCommenter] = useState("");
    const [commentBody, setCommentBody] = useState("");
    const [deleteComment, setDeleteComment] = useState(false);

    const handleDelete = () => {
        fetch(blogUrl, {
            method: "DELETE"
        })
        .then(() => {
            navigate("/");
        }) 
    }

    const handleEdit = () => {
        navigate("/blogs/edit/" + blog.id);
    }

    const handleShowComments = () => {
        setShowComments(!showComments);
    }

    const handleAddComments = (e) => {
        e.preventDefault();
        const comment = {userName:commenter, body:commentBody};
        
        fetch(commentUrl, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment)
        })
        .then(() => {
            navigate("/blogs/"+ id);
            window.location.reload(false);
        })


    }

    const handleDeleteComments = ( commentId, e) => {
        e.preventDefault();
        fetch(commentUrl + "/" + commentId, {
            method: 'DELETE',
        })
        .then(() => {
            navigate("/blogs/"+ id);
            setDeleteComment(!deleteComment);
            window.location.reload(false);

        })
    }

    useEffect(() => {

    }, [comments])

    return ( <div className="blog-details">
        { isPending && <div className="loader"> Loading... </div>}
        { error && <div className="error">{error}</div> }
        { blog &&
            <div>
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    {blog.metadata && <small>{blog.metadata.date_uploaded} - {blog.metadata.description}</small>}
                    <div>{blog.body}</div>
                    
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleShowComments}>Comments</button>
                </article> 
                <article className="category">
                    <label htmlFor="">Categories:</label>
                    {blog.categories && blog.categories.map((element) => {
                        return (
                            <Link to={ `/category/${element.id}` }>
                                <p className="category-tag">{element.title}</p>
                            </Link>
                        )
                    })}
                </article>
            </div>
        }
        { showComments && comments &&
            <div className="blog-preview">
                {comments.map((comment, number) => (
                    <div key={comment.id}>
                        <p>{number+1}. {comment.body} ~ {comment.userName}</p>
                        <button onClick={(e) => {
                            handleDeleteComments(comment.id, e)
                        }}>Delete</button>
                    </div>
                    
                ))}
                <div className="create">
                    <form onSubmit={handleAddComments}>
                        <label htmlFor="">Name:</label>
                        <input type="text" value={commenter} onChange={(e) => setCommenter(e.target.value)} required/>
                        <label htmlFor="">Comment:</label>
                        <input type="text" value={commentBody} onChange={(e) => setCommentBody(e.target.value)} required/>
                        <button>Add comment</button>
                    </form>
                </div>
            </div>
        }
    </div>  );
}
 
export default BlogDetails;