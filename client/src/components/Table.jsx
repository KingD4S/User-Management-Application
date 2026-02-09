import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteUserRequest, fetchUsersRequest, updateUserRequest } from '../redux/actions/userAction';

const Table = ({ data, onEdit }) => {
    console.log(data);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
    dispatch(deleteUserRequest(id));
  };
  
  return (
    <div className='table-container'>
        <table className='user-table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Addres</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((user,index)  => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.address}</td>
                        <td>
                            <button className="action-btn edit-btn"
                                onClick={() => onEdit(user)}>Update
                            </button>
                            <button className="action-btn delete-btn"
                              onClick={() => handleDelete(user._id)}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Table