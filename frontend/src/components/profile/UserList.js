import React, { useState, useEffect } from 'react';
import MakeAdmin from './MakeAdmin';
import Searchbar from '../Searchbar';
import axios from 'axios';

const UserList = ({isDarkMode}) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Userresponse = await axios.get("http://localhost:3500/flash/allUsers");
        if (Userresponse.data) {
          const userInfo = Userresponse.data.map((user) => ({
            username: user.username,
            password: user.password,
            email: user.email,
            userID: user.userID
          }));
          setUsers(userInfo);
          setFilteredUsers(userInfo);
        } else {
          console.log('Error fetching users');
        }
      } catch (error) {
        console.error('Unexpected error occurred: ', error);
      }
    };
    fetchData();

    const filtered = users.filter(
      (user) =>
        (user.username || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchQuery]);

  return (
    <div className="flex flex-column justify-center items-center">
      <div>
        <Searchbar text="Find user" onSearch={setSearchQuery} isDarkMode={isDarkMode} />
      </div>
      {filteredUsers.map((user, index) => (
        <MakeAdmin key={index} username={user.username} email={user.email} password={user.password} isDarkMode={isDarkMode} />
      ))}
    </div>
  );
};

export default UserList;
