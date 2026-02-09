import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserRequest } from "../redux/actions/userAction";

const CreateUserForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createUserRequest(formData, onClose));
  };
  return (
    <div className="modal">
      <div className="form-box">
        <h2>Create User</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
          
          <input
            type="string"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
          />

          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>     
    </div>
  );
};

export default CreateUserForm;
