import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./UseFetch";



const CategoryDetails = () => {

    const { id } = useParams();
    const categoryUrl = "http://localhost:8080/categories/" + id;
    const {data:category, isPending, error} = useFetch(categoryUrl);

    return ( 
        <div className="blog-details">
            { isPending && <div className="loader"> Loading... </div>}
            { error && <div className="error">{error}</div> }
            { category &&
                <div>
                    <article>
                        <h2>{category.title}</h2>  
                        <div>About: {category.description}</div>
                    </article> 
                </div>
            }
        </div>
    );
}
 
export default CategoryDetails;