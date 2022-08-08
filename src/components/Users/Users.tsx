import React, { useState, useEffect } from 'react';
import './Users.scss';
import { getUsers } from '../../api/api';
import { Form } from '../Form/Form';
import { Loader } from '../Loader/Loader';

export const Users: React.FC<User> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersCount, setUsersCount] = useState(6);
  const [fetching, setFetching] = useState(true);

  const loadUsers = () => {
    getUsers(usersCount).then((res) => {
      setUsers(res.users);
      setFetching(false);
    }).catch(() => setFetching(false));
  };

  useEffect(loadUsers, [usersCount]);

  return (
    <div className="main-content">
      <span className='text-header'>Working with GET request</span>
      <div className='users__container'>
        {fetching ? <Loader /> :
          (users.length > 0 ? (users.map(user => (
            <div key={user.phone+'-'+user.email} className='users__card'>
              <div > <img className='users__photo' src={user.photo} alt='user pic' /></div>
              <div>{user.name}</div>
              <div>
                <div>{user.position}</div>
                <div>{user.email}</div>
                <div>{user.phone}</div>
              </div>
            </div>
          ))) : <h1 className="error-message">Users were not found</h1>)}
      </div>
      <button className="top_magrin_50" onClick={() => setUsersCount(usersCount + 6)}>
        Show more
      </button>
      <Form reloadUsers={() => {
        setUsersCount(6);
        loadUsers();
      }} />
    </div>
  );
}

export default Users;


