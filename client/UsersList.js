import React from 'react';
import styles from './css/UsersList.css';

const UsersList = props => (
  <div className={styles.Users}>
    <div className={styles.UsersOnline}>
      {props.users.length} people online
    </div>
    <ul className={styles.UsersList}>
      {
        props.users.map((user) => {
          return (
            <li key={user.id} className={styles.UserItem}>
              <img src={`/img/${user.status}.png`} className={styles.StatusImg}/>{user.name}
            </li>
          );
        })
      }
    </ul>
  </div>
);

export default UsersList;