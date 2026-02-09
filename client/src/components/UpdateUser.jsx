import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateUserRequest } from '../redux/actions/userAction';


const UpdateUser = ({user, onClose}) => {
    const [formData, setFormData] = useState({
        name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
             id: user._id,
      });
      const dispatch = useDispatch();
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
        // console.log(formData)
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateUserRequest(formData));
        onClose()
      };
  return (
    <div className="modal">
      <div className="form-box">
        <h2>Update User</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          
          <input
            type="string"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser