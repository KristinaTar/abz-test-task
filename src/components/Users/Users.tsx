import React, {useState, useEffect} from 'react';
import './Users.scss';
import {getUsers} from '../../api/api';
import {Form} from '../Form/Form';
import {Loader} from '../Loader/Loader';

export const Users: React.FC<User> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersCount, setUsersCount] = useState(6);
  const [fetching, setFetching] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);


  const loadUsers = () => {
    getUsers(usersCount).then((res) => {
      if (res.success) {
        setTotalUsers(res.total_users);
        setUsers(res.users);
      } else {
        setTotalUsers(usersCount);
      }
      setFetching(false);
    }).catch(() => {
      setFetching(false)
    });
  };


  useEffect(loadUsers, [usersCount]);

  return (
    <div className="main-content">
      <span className='text-header'>Working with GET request</span>
      <div className='users__container'>
        {fetching ? <Loader/> :
          (users.length > 0 ? (users.map(user => (
            <div key={user.phone + '-' + user.email} className='users__card'>
              <div><img className='users__photo' src={user.photo} alt='user pic'/></div>
              <div>{user.name}</div>
              <div>
                <div>{user.selectedPosition}</div>
                <div>{user.email}</div>
                <div>{user.phone}</div>
              </div>
            </div>
          ))) : <h1 className="error-message">Users were not found</h1>)}
      </div>
      <button
        className="top_magrin_50"
        onClick={() => setUsersCount(usersCount + 6)}
        disabled={usersCount + 6 > totalUsers}
      >
        Show more
      </button>
      <Form reloadUsers={() => {
        if (usersCount === 6) {
          loadUsers();
        } else {
          setUsersCount(6);
        }
      }}/>
    </div>
  );
}

export default Users;


