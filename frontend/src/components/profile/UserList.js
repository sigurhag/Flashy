import React, { useState, useEffect } from 'react';
import MakeAdmin from './MakeAdmin';
import Searchbar from '../Searchbar';
import { users } from './Users';

const UserList = ({users}) => {
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchQuery]);

    return (
        <div className='flex flex-column justify-center items-center'>
            <div>
            <Searchbar text="Find user" onSearch={setSearchQuery} />
        </div>
            {filteredUsers.map((user, index) => (
                <MakeAdmin key={index} username={user.username} email={user.email} />
            ))}
        </div>
    );
};

export default UserList;
