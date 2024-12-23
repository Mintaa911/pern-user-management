import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  const { first_name, last_name, email, phone, password } = formData;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users`);
      setUsers(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/users`, formData);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: ''
      });
      getUsers();
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/users/${id}`);
      setUsers(users.filter(user => user.user_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="App">
      <h1>PERN User Management</h1>
      
      <div className="form-container">
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            value={first_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={last_name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          <button type="submit">Add User</button>
        </form>
      </div>

      <div className="users-container">
        <h2>Users List</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users
              .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
              .map(user => (
              <tr key={user.user_id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => deleteUser(user.user_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {Math.ceil(users.length / usersPerPage)}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(users.length / usersPerPage)))}
            disabled={currentPage >= Math.ceil(users.length / usersPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
