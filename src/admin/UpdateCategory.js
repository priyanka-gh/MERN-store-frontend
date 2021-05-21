import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getCategories,
  getCategory,
  updateCategory
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [name, setName] = useState("");
  const [error,setError]=useState(false);
  const [success,setSuccess]=useState(false);

  const preload = categoryId => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };


  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    updateCategory(match.params.categoryId, user._id, token, name).then(
      data => {
        console.log("name  ",data);
        if (error) {
          setError(true)
        } else {
          setError(false);
          setSuccess(true);
          setName("");
        }
        setTimeout(function(){
            window.location.href = '/admin/categories';
         }, 2000);
      }
    );
  };

  const handleChange = event => {
      setError("");
    setName(event.target.value);
  };


const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to create category</h4>;
    }
  };

  const createCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {warningMessage()}
          {successMessage()}
          {createCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
