
import useFetch from "./UseFetch";

import { Link } from "react-router-dom";


const Categories = () => {
    
    const { data: categories } = useFetch("https://blogging-site-mohit.herokuapp.com/categories")

    

    return (
        
         
        <div className="blog-list">
            
            {categories.map((category) => (
                <div className="blog-preview" key={category.id}>
                    <Link to={ `/category/blogs/${category.id}` }>
                        <h2>{ category.title }</h2>
                        <p>{category.description }</p>
                    </Link>
                    
                </div>
            ))}
        </div>
    );
}
 
export default Categories;