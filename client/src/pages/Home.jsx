import React, { useEffect, useState } from 'react'
import CreateUserForm from '../components/CreateUserForm';
import Table from '../components/Table';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRequest, setUserFilter } from "../redux/actions/userAction"
import { logoutRequest } from '../redux/actions/authAction';
import UpdateUser from '../components/UpdateUser';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../utils';

const Home = () => {
  
  const [loggedinUser, setLoggedinUser] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
const { filteredUsers, loading, error} = useSelector(state => state.user);

// get username
useEffect(() => {
  const name = localStorage.getItem("loggedinUser");
  setLoggedinUser(name);
}, []);

// fetch users
useEffect(() => {
  dispatch(fetchUsersRequest());
}, [dispatch]);

const handleLogout = () => {
  dispatch(logoutRequest(navigate));
};

const handleEditUser = (user) => {
  setEditingUser(user);
  setShowCreateModal(false);
};

const closeUpdateModal = () => {
  setEditingUser(null);
};


// if(error)
//    handleError(error);
  return (
    <div>

      <div className='home-header'>
        <h1>Welcome, {loggedinUser}!</h1>
        <input
          type="text"
          placeholder="Search by name or email..."
          onChange={(e) =>
            dispatch(setUserFilter(e.target.value))
          }
        />


        <button
          className="create-btn"
          onClick={() => {
            setShowCreateModal(true);
            setEditingUser(null);
          }}
          >
          + Create New User
        </button>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className='home-content'>

        {/* Update Modal */}
        {editingUser && (
          <UpdateUser
          user={editingUser}
          onClose={closeUpdateModal}
          />
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <CreateUserForm
          onClose={() => setShowCreateModal(false)}
          />
        )}

        {/* Table */}
        {/* {!loading && users.length > 0 && (
          <Table
          data={users}
          onEdit={handleEditUser}
          />
        )} */}
        {!loading && filteredUsers.length > 0 && (
          <Table data={filteredUsers} onEdit={handleEditUser} />
        )}

        {!loading && filteredUsers.length === 0 && (
          <p>No User Found...</p>
        )}
        
        <ToastContainer/>
      </div>
    </div>
  );
};

export default Home;
