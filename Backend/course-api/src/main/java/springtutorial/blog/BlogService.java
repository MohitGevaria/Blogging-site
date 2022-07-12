package springtutorial.blog;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;

    public List<Blog> getAllBlogs(){
        List<Blog> blogs = new ArrayList<>();
        blogRepository.findAll().forEach(blogs::add);
        return blogs;
    }

    public Blog getBlog(String id){
        Optional<Blog> blog;
        blog = blogRepository.findById(id);
        return blog.get();
    }

    public void addBlog(Blog topic) {
        blogRepository.save(topic);
    }

    public void updateBlog(Blog topic, String id)
    {
        blogRepository.save(topic);
    }

    public void deleteBlog(String id){
        blogRepository.deleteById(id);
    }
}
