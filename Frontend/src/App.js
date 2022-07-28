import NavBar from './NavBar';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import EditBlog from './EditBlog';
import CategoryDetails from './CategoryDetails';
import Categories from './Categories';
import CategoryBlogList from './CategoryBlogList';
import SelectDrop from './SelectDrop';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak"
import PrivateRoute from './PrivateRoute';

import React from 'react';
import Login from './Login';


function App() {
  return (
    
      <ReactKeycloakProvider authClient={keycloak}>
        <Router>
          <div className="App">
            <NavBar />
            <div className="content">
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path="/create" element={<Create />}></Route>
                <Route path="/blogs/:id" element={<BlogDetails />}></Route>
                <Route path="/blogs/edit/:id" element={<EditBlog />}></Route>
                <Route path="/category/:id" element={<CategoryDetails />}></Route>
                <Route path="/category" element={<Categories />}></Route>
                <Route path="/category/blogs/:id" element={<CategoryBlogList />}></Route>
                <Route path="*" element={<NotFound />}></Route>
                
              </Routes>
            </div>
            
          </div>
        </Router>
      </ReactKeycloakProvider>
    
  );
}

export default App;
